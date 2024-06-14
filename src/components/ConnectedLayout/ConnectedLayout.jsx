"use client";

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Button from "../Button/Button";
import { Footer } from "../Footer/Footer";
import NewPostForm from "../NewPostForm/NewPostForm";

export default function ConnectedLayout({ children }) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [openModale, setOpenModale] = useState(false);

  useEffect(() => {
    if (openModale) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [openModale]);

  return (
    <section className="flex flex-col min-h-screen px-5">
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
            <div className="modale-foreground">
              <NewPostForm closeModale={() => setOpenModale(false)} />
            </div>
          </div>,
          document.body
        )}
      <header className="flex justify-between items-center py-4 ">
        <nav className="absolute left-0 top-0 right-0 flex justify-center py-7 gap-5 z-0">
          <Link href="/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`w-10 h-10 hover:bg-threads-gray-dark duration-150 p-1 rounded-xl ${
                pathname == "/" ? "text-white" : "text-threads-gray-light"
              }`}
              viewBox="0 0 256 256"
            >
              <path
                fill="currentColor"
                d="M224 120v96a8 8 0 0 1-8 8h-56a8 8 0 0 1-8-8v-52a4 4 0 0 0-4-4h-40a4 4 0 0 0-4 4v52a8 8 0 0 1-8 8H40a8 8 0 0 1-8-8v-96a16 16 0 0 1 4.69-11.31l80-80a16 16 0 0 1 22.62 0l80 80A16 16 0 0 1 224 120"
              ></path>
            </svg>
          </Link>
          <Link href="/search">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`w-10 h-10 hover:bg-threads-gray-dark duration-150 p-1 rounded-xl ${
                pathname == "/search" ? "text-white" : "text-threads-gray-light"
              }`}
              viewBox="0 0 256 256"
            >
              <path
                fill="currentColor"
                d="M232.49 215.51L185 168a92.12 92.12 0 1 0-17 17l47.53 47.54a12 12 0 0 0 17-17ZM44 112a68 68 0 1 1 68 68a68.07 68.07 0 0 1-68-68"
              ></path>
            </svg>
          </Link>

          {session?.user?.email && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-10 h-10 hover:bg-threads-gray-dark duration-150 p-1 rounded-xl text-threads-gray-light cursor-pointer"
              viewBox="0 0 256 256"
              onClick={() => setOpenModale(true)}
            >
              <path
                fill="currentColor"
                d="m230.15 70.54l-44.69-44.68a20 20 0 0 0-28.28 0L33.86 149.17A19.86 19.86 0 0 0 28 163.31V208a20 20 0 0 0 20 20h168a12 12 0 0 0 0-24h-91L230.15 98.83a20 20 0 0 0 0-28.29M136 81l11 11l-71 71l-11-11ZM52 204v-31l15.52 15.51L83 204Zm52-13l-11-11l71-71l11 11Zm88-88l-39-39l18.34-18.34l39 39Z"
              ></path>
            </svg>
          )}

          {session?.user?.email && (
            <Link href={`/@${session.user.pseudo}`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`w-10 h-10 hover:bg-threads-gray-dark duration-150 p-1 rounded-xl ${
                  pathname.includes("@")
                    ? "text-white"
                    : "text-threads-gray-light"
                }`}
                viewBox="0 0 256 256"
              >
                <path
                  fill="currentColor"
                  d="M234.38 210a123.36 123.36 0 0 0-60.78-53.23a76 76 0 1 0-91.2 0A123.36 123.36 0 0 0 21.62 210a12 12 0 1 0 20.77 12c18.12-31.32 50.12-50 85.61-50s67.49 18.69 85.61 50a12 12 0 0 0 20.77-12M76 96a52 52 0 1 1 52 52a52.06 52.06 0 0 1-52-52"
                ></path>
              </svg>
            </Link>
          )}
        </nav>
        <Image src="/logo.png" alt="Threads" width={40} height={40} />

        <div className="z-10">
          {session?.user?.email ? (
            <Button withoutMarginTop onClick={() => signOut()}>
              Se déconnecter
            </Button>
          ) : (
            <Link href="/login">
              <Button withoutMarginTop>Se connecter</Button>
            </Link>
          )}
        </div>
      </header>
      <div className="flex-1">{children}</div>
      <Footer />
    </section>
  );
}
