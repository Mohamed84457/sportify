"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function NavBar({ mobile = false }) {
  const pathname = usePathname();

  const nav = [
    { label: "Home", href: "/Home" },
    { label: "Bookings", href: "/Home/bookings" },
    { label: "Venues", href: "/Home/venues" },
  ];

  return (
    <nav className={cn("flex gap-6", mobile && "flex-col gap-3")}>
      {nav.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "text-sm font-medium transition-all duration-200 px-3 py-2 rounded-md",
            "hover:bg-emerald-50 hover:text-zinc-900 md:hover:text-zinc-400 md:hover:bg-transparent",
            pathname === item.href
              ? "text-emerald-500 bg-emerald-50 md:bg-transparent"
              : "text-zinc-500 md:text-zinc-300",
          )}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
