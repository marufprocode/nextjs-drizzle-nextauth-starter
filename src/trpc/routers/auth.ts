import db from "@/db";
import { users } from "@/db/schemas";
import { TRPCError } from "@trpc/server";
import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { baseProcedure, createTRPCRouter } from "../init";

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
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await db.insert(users).values({
        email,
        password: hashedPassword,
        name,
      });
      return user;
    }),
});
