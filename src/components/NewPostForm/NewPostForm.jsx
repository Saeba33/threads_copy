"use client";

import { createPost } from "@/actions/create-post";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "../Button/Button";

export default function NewPostForm({ closeModale = () => {} }) {
  const { data: session } = useSession();
  const [textarea, setTextarea] = useState("");
  const onPrepare = async (formData) => {
    try {
      await createPost(formData);
      setTextarea("");
    } catch (error) {
      return toast.error(error.message);
    }
    closeModale();
  };

  return (
    <form action={onPrepare}>
      <div className="flex gap-3 w-full">
        <div>
          <Image
            src={session?.user.picture}
            alt="User picture"
            width={50}
            height={50}
            className="rounded-full mt-5"
            unoptimized
          />
        </div>
        <div className="flex-1">
          <textarea
            name="content"
            placeholder="Commencer un thread..."
            className="input"
            value={textarea}
            onChange={(e) => setTextarea(e.target.value)}
          ></textarea>
        </div>
      </div>
      <div className="flex justify-end mt-3">
        <div>
          <Button formButton disabled={textarea.length < 1}>
            Publier
          </Button>
        </div>
      </div>
    </form>
  );
}
