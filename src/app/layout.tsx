import { Inter } from "next/font/google";
import Provider from "./context/AuthConext";
import "./globals.css";
import ToasterContext from "./context/ToasterContext";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "QuizBlitz",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={inter.className}>
        <Provider> <ToasterContext />{children}</Provider>
      </body>
    </html>
  );
}
