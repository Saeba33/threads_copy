"use client";

import Button from "@/components/Button/Button";
import { checkEmail } from "@/utils/check-emailsyntax";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function SignIn() {
  const router = useRouter();
  const prepareLogin = async (formData) => {
    const email = formData.get("email");
    const password = formData.get("password");

    if (!email || !password) {
      return toast.error("Veuillez remplir tous les champs");
    }

    if (!checkEmail(email)) {
      return toast.error("Veuillez renseigner un email valide");
    }

    try {
      const response = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (response.error) {
        return toast.error(response.error);
      }
    } catch (error) {
      return toast.error("Erreur lors de la connexion");
    }

    toast.success("Vous êtes connecté");
    router.replace("/");
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
          </svg>
        </Link>
        Se connecter
      </h1>
      <form action={prepareLogin}>
        <input
          className="input"
          type="email"
          name="email"
          placeholder="Email"
          required
        ></input>
        <input
          className="input"
          type="password"
          name="password"
          placeholder="Mot de passe"
          required
        ></input>
        <Button formButton>Se connecter</Button>
      </form>
      <div className="flex justify-center items-center mt-4">
        <div className="border-t border-threads-gray-light w-1/4"></div>
        <div className="text-threads-gray-light mx-4">ou</div>
        <div className="border-t border-threads-gray-light w-1/4"></div>
      </div>
      <Link href="/login/signup">
        <Button>Créer un compte</Button>
      </Link>
    </div>
  );
}
