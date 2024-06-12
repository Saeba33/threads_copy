"use client";

import Button from "@/components/button/Button";
import { setCookie } from "cookies-next";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Guest() {

    const router = useRouter();

    const onContinue = () => {
        setCookie("guest", "true");
        router.push("/");
    };

  return (
    <div className="w-[440px] mx-auto">
        <h1 className="text-white text-center font-bold text-xl flex items-center gap-1">
            <Link href="/login">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 256 256"
          >
            <path
              fill="currentColor"
              d="M228 128a12 12 0 0 1-12 12H69l51.52 51.51a12 12 0 0 1-17 17l-72-72a12 12 0 0 1 0-17l72-72a12 12 0 0 1 17 17L69 116h147a12 12 0 0 1 12 12"
            ></path>
          </svg></Link>
          Continuer en mode invité
        </h1>
      <p className="text-threads-gray-light mt-4">Vous pouvez naviguer dans Threads sans profil, mais vous ne pourrez pas interagir avec du contenu ni en publier.</p>
      <Button onClick={onContinue} >Continuer</Button>
    </div>
  );
}
