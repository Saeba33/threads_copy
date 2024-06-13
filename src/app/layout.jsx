import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";

export const metadata = {
  title: "Copy of Threads",
  description: "Generated a copy of social network Threads",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className="bg-threads-gray">
        {children}
        <ToastContainer position="bottom-right" />
      </body>
    </html>
  );
}
