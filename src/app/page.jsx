import ConnectedLayout from "@/components/ConnectedLayout/ConnectedLayout";
import NewPostForm from "@/components/NewPostForm/NewPostForm";
import Post from "@/components/Post/Post";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { MongoClient } from "mongodb";

export default async function Index() {
  const session = await getServerSession(authOptions);

  let posts, client;
  try {
    client = await MongoClient.connect(process.env.MONGODB_CLIENT);

    const db = client.db(process.env.MONGODB_DATABASE);

    posts = await db
      .collection("posts")
      .find()
      .sort({ creation: -1 })
      .toArray();

      posts = posts.map((post) => ({
        _id: post._id.toString(),
        pseudo: post.pseudo,
        content: post.content,
        picture: post.picture,
        creation: post.creation,
      }));

  }
  catch (error) {
    await client.close();
      throw new Error(error.message);
  }

  await client.close();

  return (
    <ConnectedLayout>
      <div className="md:w-[700px] w-full mx-auto mt-10">
        {session?.user && (
          <div className="border-b border-threads-gray-dark py-4">
            <NewPostForm />
          </div>
        )}
        {posts.map((post) => (
          <div key={post._id}>
            <Post post={post} />
          </div>
        ))}
      </div>
    </ConnectedLayout>
  );
}
