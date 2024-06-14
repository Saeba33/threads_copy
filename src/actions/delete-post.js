"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { MongoClient, ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

export const deletePost = async (postId) => {
  const session = await getServerSession(authOptions);
  const client = await MongoClient.connect(process.env.MONGODB_CLIENT);
  const db = client.db(process.env.MONGODB_DATABASE);

  let post = await db
    .collection("posts")
    .find({ _id: new ObjectId(postId) })
    .limit(1)
    .toArray();

  if (post.length === 0) {
    await client.close();
    throw new Error("Ce post n'existe pas");
  }

  if (post[0].pseudo !== session.user.pseudo) {
    await client.close();
    throw new Error("Vous n'êtes pas autorisé à supprimer ce post");
  }

  try {
    await db.collection("posts").deleteOne({ _id: new ObjectId(postId) });
  } catch (error) {
    await client.close();
    throw new Error(error.message);
  }

  await client.close();
  revalidatePath("/", "/[pseudo]");
};
