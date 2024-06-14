"use client";

import { deletePost } from "@/actions/delete-post";
import moment from "moment-timezone";
import "moment/locale/fr";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";

export default function Post({ post }) {
  const { data: session } = useSession();
  const [optionsAreOpen, setOptionsAreOpen] = useState(false);

  const onDeletePost = async () => {
    if (!confirm("Voulez-vous vraiment supprimer ce post ?")) return;

    try {
      await deletePost(post._id);
    } catch (error) {
      console.error(error.message);
    }

    toast.success("Post supprimé");
  };

  return (
    <div className="post">
      <div>
        <div className="w-[50px] h-[50px] mt-5 rounded-full overflow-hidden">
          <Image
            src={post.picture}
            alt="Profile picture"
            width={50}
            height={50}
            unoptimized
          />
        </div>
      </div>
      <div className="text-white w-full">
        <div className="flex items-center justify-between">
          <Link href={`/@${post.pseudo}`}>{post.pseudo}</Link>
          <div className="flex items-center gap-1 text-sm text-threads-gray-light relative">
            <div>
              {moment
                .utc(post.creation, "YYYY-MM-DD HH:mm:ss")
                .tz("Europe/Paris")
                .fromNow()}
            </div>
            {session?.user && (
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 256 256"
                  className="cursor-pointer"
                  onClick={() => setOptionsAreOpen((prev) => !prev)}
                >
                  <path
                    fill="currentColor"
                    d="M144 128a16 16 0 1 1-16-16a16 16 0 0 1 16 16m-84-16a16 16 0 1 0 16 16a16 16 0 0 0-16-16m136 0a16 16 0 1 0 16 16a16 16 0 0 0-16-16"
                  ></path>
                </svg>
              </div>
            )}
            {optionsAreOpen && session?.user && (
              <div className="options">
                {session?.user && session.user.pseudo != post.pseudo ? (
                  <div className="option">Signaler</div>
                ) : (
                  <>
                    <div className="option">Modifier</div>
                    <div className="option" onClick={onDeletePost}>
                      Supprimer
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="mt-4 whitespace-pre-line">{post.content}</div>
      </div>
    </div>
  );
}
