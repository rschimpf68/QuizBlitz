import { Inter } from "next/font/google";
import Provider  from "./context/AuthConext";
import "./globals.css";

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
      <body className={inter.className}>
        <Provider>
          {children}
        </Provider>
      </body>
    </html>
  );
}
