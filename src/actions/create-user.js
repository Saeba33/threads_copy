"use server";
import { MongoClient } from "mongodb";
import bcrypt from "bcrypt";
import { checkEmail } from "@/utils/check-emailsyntax";

export const createUser = async (username, pseudo, email, password) => {
  if (!username || !pseudo || !email || !password) {
    toast.error("Veuillez remplir tous les champs");
  }
  if (!checkEmail(email)) {
    return toast.error("Veuillez renseigner un email valide");
  }

  const client = await MongoClient.connect(process.env.MONGODB_CLIENT);

  const db = client.db(process.env.MONGODB_DATABASE);

  try {
    let user = await db
      .collection("users")
      .find({ email: email })
      .limit(1)
      .toArray();
      if(user.length !== 0) {
        await client.close();
        throw new Error("Cet email est déjà utilisé");
      }
     user = await db
        .collection("users")
        .find({ pseudo: pseudo })
        .limit(1)
        .toArray();
        if(user.length !== 0) {
          await client.close();
          throw new Error("Ce pseudo est déjà utilisé");
        }
 const encryptedPassword = await bcrypt.hash(password, 10);
    await db.collection("users").insertOne({
      username: username,
      pseudo: pseudo,
      email: email,
      password: encryptedPassword,
      picture:"/picture.png",
      bio: "-",
      url: "",
      creation: new Date()
    });


  } catch (error) {
    await client.close();
    throw new Error(error);
  }
  await client.close();
};
