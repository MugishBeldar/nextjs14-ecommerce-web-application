import NextAuth, { type DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  status: boolean;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}
