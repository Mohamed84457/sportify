import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const nextOptions: NextAuthOptions = {
  pages: {
    signIn: "/LogIn",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "email", placeholder: "test@gmail.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // console.log(credentials);

        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}api/Auth/login`,
            {
              method: "POST",
              body: JSON.stringify({
                email: credentials?.email,
                password: credentials?.password,
              }),
              headers: { "Content-Type": "application/json" },
            },
          );
          const user = await res.json();
          // console.log(user);

          if (res.ok && user) {
            return user;
          }
        } catch (error) {
          console.log(error);
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.token = user.accessToken;
        token.name = user.fullName;
        token.email = user.email;
        token.role = user.roleName;
      }
      // console.log('user', user)
      return token;
    },

    async session({ session, token }) {
      session.user.name = token.name;
      session.user.email = token.email;
      session.user.role = token.role;
      // session.user.token = token.token;
      return session;
    },
  },
};

const handler = NextAuth(nextOptions);

export { handler as GET, handler as POST };
