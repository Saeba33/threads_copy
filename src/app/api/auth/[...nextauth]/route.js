import bcrypt from "bcrypt";
import { MongoClient } from "mongodb";
import NextAuth from "next-auth/next";
import Credentials from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {},

      async authorize(credentials) {
        const { email, password } = credentials;

        try {
          const client = await MongoClient.connect(process.env.MONGODB_CLIENT);
          const db = client.db(process.env.MONGODB_DATABASE);
          let user = await db
            .collection("users")
            .find({ email })
            .limit(1)
            .toArray();
          if (user.length === 0) {
            await client.close();
            throw new Error("Utilisateur non trouvé");
          }
          const isPasswordValid = await bcrypt.compare(
            password,
            user[0].password
          );
          if (!isPasswordValid) {
            await client.close();
            throw new Error("Mot de passe incorrect");
          }

          user = user.map((user) => ({
            _id: user._id.toString(),
            username: user.username,
            pseudo: user.pseudo,
            email: user.email,
            picture: user.picture,
          }))[0];
          await client.close();
          return user;
        } catch (error) {
          throw new Error(error.message);
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login/signin",
  },
  callbacks: {},
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
