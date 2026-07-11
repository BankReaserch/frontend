import type { Metadata } from "next";
import { CartProvider } from "@/context/CartContext";
import { ToastContainer } from "react-toastify";
import '../node_modules/react-toastify/dist/ReactToastify.css'
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ribbis",
  description: "Developed by Samir",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col overflow-x-hidden">
        <CartProvider>
          {children}
        </CartProvider>
        <ToastContainer
          position="top-right"
          autoClose={4000}
          theme="light"
        />
      </body>
    </html>
  );
}