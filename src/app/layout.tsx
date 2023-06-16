import Provider from "./context/AuthConext";
import "./globals.css";
import ToasterContext from "./context/ToasterContext";
import localFont from "next/font/local";

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
      <body>
        <Provider>
          <ToasterContext />
          {children}
        </Provider>
      </body>
    </html>
  );
}
