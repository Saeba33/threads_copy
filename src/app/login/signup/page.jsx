"use client";

import { createUser } from "@/actions/create-user";
import Button from "@/components/Button/Button";
import { checkEmail } from "@/utils/check-emailsyntax";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function SignUp() {
  const router = useRouter();
  const prepareCreateUser = async (formData) => {
    const username = formData.get("username");
    const pseudo = formData.get("pseudo");
    const email = formData.get("email");
    const password = formData.get("password");

    if (!username || !pseudo || !email || !password) {
      toast.error("Veuillez remplir tous les champs");
    }
    if (!checkEmail(email)) {
      return toast.error("Veuillez renseigner un email valide");
    }
    try {
      await createUser(username, pseudo, email, password);
    } catch (error) {
      return toast.error("Erreur lors de la création du compte");
    }
    toast.success("Votre compte a été créé avec succès");
    router.push("/login/signin");
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
        Inscrivez-vous
      </h1>
      <form action={prepareCreateUser}>
        <input
          className="input"
          type="text"
          name="username"
          placeholder="Nom d'utilisateur"
          required
        ></input>
        <input
          className="input"
          type="text"
          name="pseudo"
          placeholder="Pseudo"
          required
        ></input>
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
        <Button formButton>S'inscrire</Button>
      </form>
      <div className="flex justify-center items-center mt-4">
        <div className="border-t border-threads-gray-light w-1/4"></div>
        <div className="text-threads-gray-light mx-4">ou</div>
        <div className="border-t border-threads-gray-light w-1/4"></div>
      </div>
      <Link href="/login/signin">
        <Button>Se connecter</Button>
      </Link>
    </div>
  );
}
