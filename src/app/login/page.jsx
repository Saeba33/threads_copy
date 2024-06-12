import Link from "next/link";

export default function Login() {
  return (
    <div>
      <h1 className="text-center font-bold text-white text-xl">
        Comment souhaitez-vous utiliser Threads ?
      </h1>
      <div className="mt-5 w-[500px] mx-auto flex flex-col gap-4">
        <Link href="/login/signup">
          <div className="auth-method">
            <h2 className="font-bold text-white">
              S'inscrire ou se connecter avec une adresse email{" "}
            </h2>
            <p className="text-threads-gray-light mt-4">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quasi,
              ea?
            </p>
          </div>
        </Link>
        <Link href="/login/guest">
          <div className="auth-method">
            <h2 className="font-bold text-white">
              Utiliser sans profil
            </h2>
            <p className="text-threads-gray-light mt-4">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quasi,
              ea?
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}
