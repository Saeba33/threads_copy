import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

export async function POST(request) {
  const data = await request.json();
  const { pseudo } = data;
  let client;

  try {
    client = await MongoClient.connect(process.env.MONGODB_CLIENT);
    const db = client.db(process.env.MONGODB_DATABASE);
    let user = await db.collection("users").find({ pseudo }).limit(1).toArray();

    if (!user) {
      await client.close();
      throw new Error("Utilisateur non trouvé");
    }
    user = user.map((user) => ({
      _id: user._id.toString(),
      username: user.username,
      pseudo: user.pseudo,
      email: user.email,
      picture: user.picture,
    }))[0];
    let posts = await db
      .collection("posts")
      .find({ pseudo })
      .sort({ creation: -1 })
      .toArray();

    posts = posts.map((post) => ({
      _id: post._id.toString(),
      pseudo: post.pseudo,
      content: post.content,
      picture: post.picture,
      creation: post.creation,
    }));

    await client.close();
    return NextResponse.json({ user, posts }, { status: 200 });
  } catch (error) {
    await client.close();
    throw new Error(error.message);
  }
}
