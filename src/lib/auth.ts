import db from "@/db";
import { usersTable } from "@/db/schemas";
import { eq } from "drizzle-orm";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { z } from "zod";

const credentialsSchema = z.object({
  email: z.string().email().min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
});

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google,
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const { email, password } = credentialsSchema.parse(credentials);

        const [user] = await db
          .select()
          .from(usersTable)
          .where(eq(usersTable.email, email));

        if (!user) {
          return Promise.reject(new Error("User not found"));
        }

        if (email === user.email && password === user.password) {
          return Promise.resolve({ email: user.email, name: user.name });
        } else {
          return Promise.reject(new Error("Invalid credentials"));
        }
      },
    }),
  ],
});
