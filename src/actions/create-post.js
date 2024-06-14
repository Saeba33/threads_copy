"use server";

import { MongoClient } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { revalidatePath } from "next/cache";

export const createPost = async (formData) => {
  const session = await getServerSession(authOptions);
  if (!session.user) {
    throw new Error("Vous devez être connecté pour publier un thread");
  }

  let client;
  try {
   client = await MongoClient.connect(process.env.MONGODB_CLIENT);

    const db = client.db(process.env.MONGODB_DATABASE);

    await db.collection("posts").insertOne({
      pseudo: session.user.pseudo,
      content: formData.get("content"),
      picture: session.user.picture,
      creation: new Date(),
    });
  } catch (error) {
    await client.close();
    throw new Error(error.message);
  }

  await client.close();
  revalidatePath("/");
};
