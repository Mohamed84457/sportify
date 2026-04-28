import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Bounce, ToastContainer } from "react-toastify";
import UserProvider from "@/src/UserProvider";
import HeaderLayout from "./components/headerlayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "sportify",
  description: "Generated our team",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} font-[Arial] ${geistMono.variable} antialiased`}
      >
        <UserProvider>
          <ToastContainer
            position="top-right"
            autoClose={4000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
            transition={Bounce}
          />

          {/* Navbar Me3hben */}
          <header className="sticky top-0 z-50  ">
            <HeaderLayout />
          </header>
          
          {children}
        </UserProvider>
      </body>
    </html>
  );
}
