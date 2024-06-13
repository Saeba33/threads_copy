"use client";

import ConnectedLayout from "@/components/ConnectedLayout/ConnectedLayout";
import Post from "@/components/Post/Post";
import Image from "next/image";
import { useParams } from "next/navigation";

export default function Profile() {
  const params = useParams();
  const pseudo = params.pseudo.slice(3);
  const posts = [
    {
      _id: "1",
      content: "Hello World",
      pseudo: "John Doe",
      picture: "/picture.png",
    },
    {
      _id: "2",
      content: "Hello World",
      pseudo: "John Doe",
      picture: "/picture.png",
    },
    {
      _id: "3",
      content: "Hello World",
      pseudo: "John Doe",
      picture: "/picture.png",
    },
    {
      _id: "4",
      content: "Hello World",
      pseudo: "John Doe",
      picture: "/picture.png",
    },
    {
      _id: "5",
      content: "Hello World",
      pseudo: "John Doe",
      picture: "/picture.png",
    },
  ];

  return (
    <ConnectedLayout>
      <div className="mt-10 md:[700px] mx auto text-white">
        <div className="flex justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold ">John Doe</h1>
            <div className="text-threads-gray-light mt-2">@{pseudo}</div>
            <div className="mt-5 whitespace-pre-line">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi,
              ea?
            </div>
            <div className="mt-5 text-blue-500 hover:text-blue-400 duration-150">
              <a href="https://cproust.com" target="_blank">
                https://cproust.com
              </a>
            </div>
          </div>
          <div>
            <Image
              src="/picture.png"
              alt="Profile picture"
              width={100}
              height={100}
              className="rounded-full object-cover"
            />
          </div>
        </div>
        <div className="flex mt-10">
          <div className="flex-1 border-b border-white pb-4 px-4 text-center hover:text-white hover:border-white duraction-150 cursor-pointer">
            Threads
          </div>

          <div className="flex-1 border-b border-threads-gray-light text-threads-gray-light pb-4 px-4 text-center hover:text-white hover:border-white duraction-150 cursor-pointer">
            Réponses
          </div>

          <div className="flex-1 border-b  border-threads-gray-light text-threads-gray-light pb-4 px-4 text-center hover:text-white hover:border-white duraction-150 cursor-pointer">
            Republication
          </div>
        </div>
        <div>
            {posts.map(post => (
                <div key={post._id}>
                    <Post post={post}/>
                </div>
            ))}
        </div>
      </div>
    </ConnectedLayout>
  );
}
