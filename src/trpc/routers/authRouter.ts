import db from "@/db";
import { users } from "@/db/schemas";
import { signOut as signOutSession } from "@/lib/auth";
import { TRPCError } from "@trpc/server";
import bcryptjs from "bcryptjs";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { baseProcedure, createTRPCRouter, protectedProcedure } from "../init";

export const authRouter = createTRPCRouter({
  signUp: baseProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string().min(8),
        name: z.string().min(1),
      })
    )
    .mutation(async ({ input }) => {
      const { email, password, name } = input;
      const existUser = await db.query.users.findFirst({
        where: eq(users.email, email),
      });
      if (existUser) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "User already exists",
        });
      }
      const hashedPassword = await bcryptjs.hash(password, 10);
      const user = await db
        .insert(users)
        .values({
          email,
          password: hashedPassword,
          name,
        })
        .returning({
          id: users.id,
          email: users.email,
          name: users.name,
        });
      return user;
    }),
  getUser: protectedProcedure.query(async ({ ctx }) => {
    const user = await db.query.users.findFirst({
      where: eq(users.id, ctx.userId),
    });
    return user;
  }),
  signOut: protectedProcedure.mutation(async () => {
    await signOutSession();
  }),
});
