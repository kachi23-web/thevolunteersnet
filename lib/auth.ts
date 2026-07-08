import type { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null;
        }

        const adminUsername = process.env.ADMIN_USERNAME;
        const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;

        if (!adminUsername || !adminPasswordHash) {
          return null;
        }

        if (credentials.username !== adminUsername) {
          return null;
        }

        const isValid = await compare(credentials.password, adminPasswordHash);

        if (!isValid) {
          return null;
        }

        return {
          id: "1",
          name: adminUsername,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 86400, // 24 hours
  },
  pages: {
    signIn: "/admin/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
