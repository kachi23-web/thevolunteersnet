import type { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { getDb } from "@/lib/mongodb";
import type { AdminUser } from "@/types";

const ADMINS_COLLECTION = "admins";

async function getAdminUsers(): Promise<AdminUser[]> {
  try {
    const db = await getDb();
    const docs = await db.collection(ADMINS_COLLECTION).find({}).toArray();
    return docs.map(({ _id, ...rest }) => rest) as unknown as AdminUser[];
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
