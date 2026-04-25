import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sol — Full Stack Developer",
  description: "U.S.-based full stack developer focused on building, fixing, and maintaining reliable websites and apps.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Mono:wght@300;400&family=Outfit:wght@200;300;400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className="bg-ink text-off font-sans font-light overflow-x-hidden"
        style={{ backgroundColor: "#0c0b0a", color: "#f5f2eb" }}
      >
        {children}
      </body>
      
    </html>
  );
}