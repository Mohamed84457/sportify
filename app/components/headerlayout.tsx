// "use client";
// // components
// import NavBar from "./nav";

// // icons
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";

// // next
// import Image from "next/image";
// import Link from "next/link";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { usePathname } from "next/navigation";
// import { Button } from "@/components/ui/button";
// import { signOut, useSession } from "next-auth/react";

// export default function HeaderLayout() {
//   const data = useSession();
//   console.log(data);

//   function logout() {
//     signOut({
//       callbackUrl: "/LogIn",
//     });
//   }

//   // pathname to highlight page
//   const pathname = usePathname();
//   // route
//   const userouter = useRouter();
//   // hamburger
//   const hamburger = [
//     {
//       label: "Home",
//       path: "/Home",
//     },
//     {
//       label: "Bookings",
//       path: "/Home/bookings",
//     },
//     {
//       label: "venues",
//       path: "/Home/venues",
//     },
//   ];
//   // sidebar
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   return (
//     <header className="bg-white h-16 px-6 flex items-center justify-between shadow-md ">
//       {/* Logo */}
//       <Link
//         href={"/Home"}
//         className="flex items-center gap-2 cursor-pointer group"
//       >
//         <div className=" flex items-center gap-2 cursor-pointer ">
//           {/* group-hover:animate-pulse */}
//           <Image
//             className=" group-hover:animate-pulse  transition-all duration-200"
//             src="/test.png"
//             alt="logo"
//             width={40}
//             height={40}
//           />
//           <span className="text-xl font-bold text-gray-800">Sportify</span>
//         </div>
//       </Link>
//       {/* nav */}
//       <div className=" p-1 w-full flex items-center justify-between  hidden md:flex ">
//         {/* Navigation */}
//         <div className="w-4/5 md:w-2/4 flex justify-center ">
//           <NavBar />
//         </div>
//         {/* Profile */}
//         <div className="flex items-center">
//           <span>Hello {data.data?.user.name?.split(" ")[0]}</span>
//           {data?.status === "authenticated" ? (
//             <Button onClick={logout}>Logout</Button>
//           ) : (
//             <>
//               <Link href="/LogIn">Sign in</Link>
//               <Link href="/Register">Register</Link>
//             </>
//           )}
//           <AccountCircleIcon
//             fontSize="large"
//             className="text-gray-700 cursor-pointer hover:text-green-500 transition"
//           />
//         </div>
//       </div>

//       {/* sidebar */}
//       <div className="md:hidden ">
//         <button
//           onClick={() => setSidebarOpen(true)}
//           className="py-2 px-3 rounded-lg bg-white shadow border-none cursor-pointer transition-all duration-150  hover:shadow-md active:scale-90 active:translate-y-1"
//         >
//           ☰
//         </button>
//       </div>

//       {/* Overlay */}
//       {sidebarOpen && (
//         <div
//           className="fixed inset-0 bg-black/40 z-40 md:hidden"
//           onClick={() => setSidebarOpen(false)}
//         />
//       )}

//       {/* Sidebar */}
//       <div
//         className={`
//           fixed lg:static top-0 left-0 z-50 h-full w-72 bg-white 
//           transform transition-transform duration-300 ease-in-out
//           ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
//           lg:translate-x-0 lg:w-auto
//           lg:col-span-4 flex flex-col gap-5 p-4 lg:p-0
//           md:hidden`}
//       >
//         {/* Close button (mobile only) */}
//         <div className="flex justify-between md:hidden  ">
//           <span>Hello {data.data?.user.name?.split(" ")[0]}</span>
//           {data?.status === "authenticated" ? (
//             <Button onClick={logout}>Logout</Button>
//           ) : (
//             <>
//               <Link href="/LogIn">Sign in</Link>
//               <Link href="/Register">Register</Link>
//             </>
//           )}

//           {/* Profile */}
//           <div className="flex items-center">
//             <AccountCircleIcon
//               fontSize="large"
//               className="text-gray-700 cursor-pointer hover:text-green-500 transition"
//             />
//           </div>
//           <button
//             className=" rounded-lg cursor-pointer shadow py-2 px-3 border-none hover:shadow-md  transition-all duration-150 active:scale-90 active:translate-y-1"
//             onClick={() => setSidebarOpen(false)}
//           >
//             ✕
//           </button>
//         </div>
//         {hamburger.map((item) => (
//           <div
//             onClick={() => {
//               setSidebarOpen((pre) => false);
//               userouter.replace(item.path);
//             }}
//             key={item.path}
//             className={`border ${
//               pathname === item.path
//                 ? "text-green-400"
//                 : "text-gray-500 hover:text-gray-700"
//             } p-3 rounded-lg shadow cursor-pointer hover:shadow-md transition-all duration-150 active:scale-95 active:translate-y-1 font-bold  tracking-wider  `}
//           >
//             {item.label}
//           </div>
//         ))}
//       </div>
//     </header>
//   );
// }




































"use client";

import NavBar from "./nav";
import Link from "next/link";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Menu, User } from "lucide-react";

export default function HeaderLayout() {
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);

  const logout = async () => {
    await signOut({ callbackUrl: "/LogIn" });
  };

  return (
    <header className=" border-white/8 bg-black/30 px-8 sticky top-0 z-50 border-b backdrop-blur-md">
      
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
            <span className="hidden md:block text-sm text-zinc-600 font-medium">
              Hi, {session?.user?.name?.split(" ")[0]}
            </span>
          )}

          {/* Auth buttons */}
          {status === "authenticated" ? (
            <Button
              onClick={logout}
              variant="outline"
              className="text-zinc-700 hover:text-emerald-500"
            >
              Logout
            </Button>
          ) : (
            <div className="hidden md:flex gap-3 text-sm text-zinc-600">
              <Link className="hover:text-emerald-600 transition" href="/LogIn">
                Login
              </Link>
              <Link className="hover:text-emerald-600 transition" href="/Register">
                Register
              </Link>
            </div>
          )}

          {/* Avatar */}
          <div className="h-9 w-9 rounded-full bg-zinc-100 flex items-center justify-center">
            <User size={18} className="text-zinc-600" />
          </div>

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

            {/* Auth */}
            <div className="mt-6 border-t pt-4 flex flex-col gap-3 text-sm">
              {status === "authenticated" ? (
                <Button onClick={logout}>Logout</Button>
              ) : (
                <>
                  <Link className="text-zinc-600 hover:text-emerald-600" href="/LogIn">
                    Login
                  </Link>
                  <Link className="text-zinc-600 hover:text-emerald-600" href="/Register">
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}