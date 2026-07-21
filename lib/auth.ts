import type { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { promises as fs } from "fs";
import path from "path";

interface AdminUser {
  id: string;
  username: string;
  passwordHash: string;
  createdAt: string;
}

async function getAdminUsers(): Promise<AdminUser[]> {
  const filePath = path.join(process.cwd(), "content", "admins.json");
  try {
    const raw = await fs.readFile(filePath, "utf-8");
    return JSON.parse(raw) as AdminUser[];
  } catch {
    return [];
  }
}

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

        const admins = await getAdminUsers();
        const admin = admins.find(
          (a) => a.username === credentials.username
        );

        if (!admin) {
          return null;
        }

        const isValid = await compare(
          credentials.password,
          admin.passwordHash
        );

        if (!isValid) {
          return null;
        }

        return {
          id: admin.id,
          name: admin.username,
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
