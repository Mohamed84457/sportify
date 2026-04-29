"use client";

import NavBar from "./nav";
import Link from "next/link";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { LogIn, LogOut, Menu, User, UserPlus } from "lucide-react";

export default function HeaderLayout() {
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);

  const logout = async () => {
    await signOut({ callbackUrl: "/LogIn" });
  };

  return (
    <header className=" border-white/8 bg-black/70 px-8 sticky top-0 z-50 border-b">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="font-[inter] text-2xl font-black tracking-tight text-transparent bg-clip-text bg-linear-to-r from-emerald-500 to-green-600">
            Sportify
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex flex-1 justify-center">
          <NavBar />
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          {/* Greeting */}
          {status === "authenticated" && (
            <span className="hidden md:block text-sm text-zinc-300 font-medium">
              Hi, {session?.user?.name?.split(" ")[0]}
            </span>
          )}

          <div className="hidden md:flex items-center gap-3">
          {/* Auth buttons */}
          {status === "authenticated" ? (
            <Button
              onClick={logout}
              variant="outline"
              className="text-zinc-600 hover:text-red-600 bg-red-300 transition"
            >
              Logout
            </Button>
          ) : (
            <div className="hidden md:flex gap-3 text-sm text-zinc-600">
              <Link className="hover:text-emerald-600 text-zinc-200 transition" href="/LogIn">
                Login
              </Link>
              <Link
                className="hover:text-emerald-600 text-zinc-200 transition"
                href="/Register"
              >
                Register
              </Link>
            </div>
          )}

          {/* Avatar */}
          <div className="h-9 w-9 rounded-full bg-zinc-100 flex items-center justify-center ">
            <User size={18} className="text-zinc-600" />
          </div></div>

          {/* Mobile menu */}
          <button
            onClick={() => setOpen(true)}
            className="md:hidden p-2 text-zinc-700"
          >
            <Menu />
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/40 md:hidden"
          onClick={() => setOpen(false)}
        >
          <div
            className="absolute right-0 top-0 h-full w-72 bg-white p-5"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <span className="font-semibold text-zinc-800">Menu</span>
              <button className="text-zinc-500" onClick={() => setOpen(false)}>
                ✕
              </button>
            </div>

            {/* Nav */}
            <NavBar mobile />

            {/* Auth Section in mobile nav */}
            <div>
              <div className="mt-6 border-t border-zinc-200 pt-5 flex flex-col gap-3">
                {status === "authenticated" ? (
                  <>
                    <div className="flex items-center gap-3 rounded-xl bg-zinc-50 p-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white border border-zinc-200">
                        <User size={18} className="text-zinc-700" />
                      </div>

                      <div>
                        <p className="text-sm font-medium text-zinc-800">
                          {session?.user?.name}
                        </p>

                        <p className="text-xs text-zinc-500">Logged in</p>
                      </div>
                    </div>

                    <Button onClick={logout} variant={"destructive"} className=" flex justify-between">
                      Logout
                      <LogOut />
                    </Button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/LogIn"
                      className="rounded-xl flex justify-between border border-zinc-200 bg-white px-4 py-3 text-center font-medium text-zinc-700 transition hover:border-emerald-400 hover:text-emerald-600"
                    >
                      Login
                      <LogIn />
                    </Link>

                    <Link
                      href="/Register"
                      className="rounded-xl flex justify-between bg-emerald-500 px-4 py-3 text-center font-medium text-white transition hover:bg-emerald-600"
                    >
                      Register
                      <UserPlus />
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
