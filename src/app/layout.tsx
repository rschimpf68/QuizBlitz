import { Inter } from "next/font/google";
import Provider from "./context/AuthConext";
import "./globals.css";
import ToasterContext from "./context/ToasterContext";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "QuizBlitz",
  icons: {
    icon: { url: "/favicon.svg", type: "image/svg" },
    shortcut: { url: "/favicon.svg", type: "image/svg" },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider> <ToasterContext />{children}</Provider>
      </body>
    </html>
  );
}
