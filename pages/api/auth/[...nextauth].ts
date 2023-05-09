import { login } from "@/services/auth";
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        shopCode: {
          label: "Username",
          type: "text",
          placeholder: "jsmith",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const { shopCode, password } = credentials as {
          shopCode: string;
          password: string;
        };

        let user = await login({ shopCode, password });

        if (user) {
          return user.data;
        } else {
          return null;
        }
      },
    }),
  ],
  secret: process.env.SECRET,
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  pages: {
    signIn: "/auth/login",
    signOut: "/auth/signout",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.shopCode = user.shopCode;
        token.location = user.location;
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
      }
      return token;
    },
    async session({ session, token, user }) {
      session.user = token as any;
      return session;
    },
  },
  // Enable debug messages in the console if you are having problems
  debug: false,
};

export default NextAuth(authOptions);
