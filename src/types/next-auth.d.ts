import NextAuth, { DefaultSession } from "next-auth"
import { JWT } from "next-auth/jwt"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface User {
    accessToken: string,
    fullName: string,
    email: string,
    roleName: string
  };
  interface Session {
    user: {
      role: string,
      token: string
    } & DefaultSession["user"];
  
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    name?: string,
    email: string,
    role: string,
    token: string
  }
}