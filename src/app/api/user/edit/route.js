import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

export async function POST(request) {
  const data = await request.json();
  const pseudo = data.pseudo;
  const picture = data.picture;
  let bio = data.bio;
  const url = data.url;

  if (!bio) {
    bio = "-";
  }

  let client;
  try {
    const client = await MongoClient.connect(process.env.MONGODB_CLIENT);
    const db = client.db(process.env.MONGODB_DATABASE);

    let user = await db.collection("users").find({ pseudo }).limit(1).toArray();

    if (user.length === 0) {
      await client.close();
      return NextResponse.json(
        { error: "Utilisateur non trouvé" },
        { status: 404 }
      );
    }

    await db.collection("users").updateOne(
      { pseudo },
      {
        $set: { picture, bio, url },
      }
    );
    await client.close();
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    await client.close();
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
