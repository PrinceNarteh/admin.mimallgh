import { login } from "@/services/auth";
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        emailOrPhoneNumber: {
          label: "Username",
          type: "text",
          placeholder: "jsmith",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const { emailOrPhoneNumber, password } = credentials as {
          emailOrPhoneNumber: string;
          password: string;
        };

        let user = await login({ emailOrPhoneNumber, password });

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
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
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
