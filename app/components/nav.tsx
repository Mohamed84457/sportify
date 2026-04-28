// "use client";
// import Link from "next/link";
// // interfaces
// import { Inavigation } from "../utils/interfaces";

// import { usePathname } from "next/navigation";
// import { signOut, useSession } from "next-auth/react";
// import { Button } from "@/components/ui/button";

// export default function NavBar() {
//   // const data = useSession();
//   // console.log(data);

//   // pathname to highlight page
//   const pathname = usePathname();
//   // navigations
//   const navigation: Inavigation[] = [
//     {
//       label: "Home",
//       directory: "/Home",
//     },
//     {
//       label: "Bookings",
//       directory: "/Home/bookings",
//     },
//     {
//       label: "Venues",
//       directory: "/Home/venues",
//     },
//   ];

//   // function logout() {
//   //   signOut({
//   //     callbackUrl: '/LogIn'
//   //   })
//   // }

//   return (
//     <nav className="flex items-center justify-between w-full h-full  p-4 rounded-xl">
//       {navigation.map((item) => (
//         <Link
//           key={item.directory}
//           href={item.directory}
//           className={`relative hover:text-green-600 transition-all duration-500
//               after:absolute after:left-0 after:-bottom-0.5 after:w-0 after:h-0.5 after:bg-green-600 hover:after:w-full after:transition-all after:duration-300
//             text-gray-900  font-medium ${
//               pathname === item.directory
//                 ? "text-green-400"
//                 : "text-gray-300 hover:text-gray-700"
//             }`}
//         >
//           {item.label}
//         </Link>
//       ))}

//       {/* <span>Hello {data.data?.user.name?.split(" ")[0]}</span>
//       {data?.status === "authenticated" ? (
//         <Button onClick={logout}>Logout</Button>
//       ) : (
//         <>
//           <Link href="/LogIn">Sign in</Link>
//           <Link href="/Register">Register</Link>
//         </>
//       )} */}
//     </nav>
//   );
// }

































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
            "text-sm font-medium transition-colors",
            pathname === item.href
              ? "text-green-600"
              : "text-gray-500 hover:text-gray-900"
          )}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}