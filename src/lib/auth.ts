import db from "@/db";
import { accounts, users } from "@/db/schemas";
import { eq } from "drizzle-orm";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { z } from "zod";
import { v4 as uuid } from "uuid";
import { encode as defaultEncode } from "next-auth/jwt";

export const credentialsSchema = z.object({
  email: z.string().email().min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
});

const adapter = DrizzleAdapter(db);

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter,
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
          .from(users)
          .where(eq(users.email, email));
          
        if (!user) {
          return Promise.reject(new Error("User not found"));
        }

        if (email === user.email && password === user.password) {
          return Promise.resolve({
            email: user.email,
            name: user.name,
            id: user.id,
          });
        } else {
          return Promise.reject(new Error("Invalid credentials"));
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account?.provider === "credentials") {
        token.credentials = true;
      }
      return token;
    },
  },
  jwt: {
    encode: async function (params) {
      if (params.token?.credentials) {
        const sessionToken = uuid();

        if (!params.token.sub) {
          throw new Error("No user ID found in token");
        }

        const createdSession = await adapter?.createSession?.({
          sessionToken: sessionToken,
          userId: params.token.sub,
          expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        });

        if (!createdSession) {
          throw new Error("Failed to create session");
        }

        return sessionToken;
      }
      return defaultEncode(params);
    },
  },
});
