"use client";

import Button from "@/components/Button/Button";
import ConnectedLayout from "@/components/ConnectedLayout/ConnectedLayout";
import Post from "@/components/Post/Post";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { toast } from "react-toastify";

export default function Profile() {
  const params = useParams();
  const pseudo = params.pseudo.slice(3);
  const router = useRouter();
  const { data: session } = useSession();

  const [user, setUser] = useState([]);
  const [posts, setPosts] = useState([]);
  const [openModale, setOpenModale] = useState(false);
  const [pictureInput, setPictureInput] = useState("");
  const [bioInput, setBioInput] = useState("");
  const [urlInput, setUrlInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!pseudo) {
      router.push("/");
    }
    fetchUserDataPosts();
  }, []);

  useEffect(() => {
    if (openModale) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [openModale]);

  const fetchUserDataPosts = async () => {
    const response = await fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ pseudo }),
    });

    const data = await response.json();
    if (!response.ok) {
      toast.error("Une erreur est survenue");
    }

    if (!data.user) {
      router.push("/");
      return;
    }

    setUser(data.user);
    setPosts(data.posts);
  };

  const edit = () => {
    setPictureInput(user.picture);
    setBioInput(user.bio);
    setUrlInput(user.url);

    setOpenModale(true);
  };

  const editUser = async () => {
    if (isLoading) return;

    setIsLoading(true);

    const response = await fetch("/api/user/edit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        pseudo,
        picture: pictureInput,
        bio: bioInput,
        url: urlInput,
      }),
    });
    const data = await response.json();

    if (!response.ok) {
      toast.error(data.message);
      setIsLoading(false);
      return;
    }

    const newUser = {
      ...user,
      picture: pictureInput,
      bio: bioInput,
      url: urlInput,
    };

    setUser(newUser);
    setOpenModale(false);
    setIsLoading(false);
    toast.success("Profil mis à jour");
  };

  return (
    <ConnectedLayout>
      {openModale &&
        createPortal(
          <div
            className="modale-background"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setOpenModale(false);
              }
            }}
          >
            <div className="modale-user-foreground">
              <div className="flex gap-3">
                <div className="flex-1">
                  <label className="label" htmlFor="picture">
                    Photo de profil
                  </label>
                  <input
                    type="url"
                    name="picutre"
                    id="picture"
                    className="input"
                    placeholder="http://johndoe.com/image.png"
                    value={pictureInput}
                    onChange={(e) => setPictureInput(e.target.value)}
                  ></input>
                </div>
                <div className="w-[100px] h-[100px] rounded-full overflow-hidden">
                  <Image
                    src={user.picture}
                    alt="Profile picture"
                    width={100}
                    height={100}
                    unoptimized
                  />
                </div>
              </div>
              <div className="mt-5">
                <label className="label" htmlFor="bio">
                  Bio
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  className="input"
                  placeholder="Bio"
                  value={bioInput}
                  onChange={(e) => setBioInput(e.target.value)}
                ></textarea>
              </div>
              <div className="mt-5">
                <label className="label" htmlFor="url">
                  Site web
                </label>
                <input
                  type="url"
                  name="url"
                  id="url"
                  className="input"
                  placeholder="http://cproust.com"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                ></input>
              </div>
              <div className="mt-1 flex justify-end">
                <div>
                  <Button onClick={editUser} disabled={isLoading}>
                    Enregistrer
                  </Button>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}

      <div className="mt-10 md:[700px] mx auto text-white">
        <div className="flex justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold ">{user.username}</h1>
            <div className="text-threads-gray-light mt-2">@{pseudo}</div>
            <div className="mt-5 whitespace-pre-line">{user.bio}</div>
            {user && user.url && (
              <div className="mt-5 text-blue-500 hover:text-blue-400 duration-150">
                <a href={user.url} target="_blank">
                  {user.url}
                </a>
              </div>
            )}
          </div>
          <div className="w-[100px] h-[100px] rounded-full overflow-hidden">
            <Image
              src={user.picture}
              alt="Profile picture"
              width={100}
              height={100}
              unoptimized
            />
          </div>
        </div>

        {session?.user?.pseudo === pseudo && (
          <div className="user-button" onClick={edit}>
            Modifier le profil
          </div>
        )}

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
          {posts.map((post) => (
            <div key={post._id}>
              <Post post={post} />
            </div>
          ))}
        </div>
      </div>
    </ConnectedLayout>
  );
}
