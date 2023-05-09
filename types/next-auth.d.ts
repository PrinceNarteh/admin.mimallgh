import { DefaultSession, Session } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface User {
    id: string;
    firstName: string;
    lastName: string;
    accessToken: string;
    refreshToken: string;
  }
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session extends DefaultSession {
    user?: User;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    accessToken: string;
    refreshToken: string;
  }
}
