import { z } from "zod";
import { baseProcedure, createTRPCRouter } from "../init";

export const appRouter = createTRPCRouter({
  hello: baseProcedure
    .input(
      z.object({
        text: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const userId = ctx.userId;
      return {
        greeting: `hello ${input.text}, userId: ${userId}`,
      };
    }),
});
// export type definition of API
export type AppRouter = typeof appRouter;
