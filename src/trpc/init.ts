import { auth } from "@/lib/auth";
import { rateLimit } from "@/lib/redis";
import { initTRPC, TRPCError } from "@trpc/server";
import { cache } from "react";
import superjson from "superjson";

export const createTRPCContext = cache(async () => {
  const user = await auth();
  return {
    userId: user?.user?.id,
  };
});

export type Context = Awaited<ReturnType<typeof createTRPCContext>>;
// Avoid exporting the entire t-object
// since it's not very descriptive.
// For instance, the use of a t variable
// is common in i18n libraries.
const t = initTRPC.context<Context>().create({
  /**
   * @see https://trpc.io/docs/server/data-transformers
   */
  transformer: superjson,
});
// Base router and procedure helpers
export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;

const isRateLimited = t.middleware(async ({ ctx, next }) => {
  const { success } = await rateLimit.limit(ctx.userId ?? "anonymous");
  if (!success) {
    throw new TRPCError({
      code: "TOO_MANY_REQUESTS",
      message: "Rate limit exceeded",
    });
  }
  return next({ ctx });
});

const isAuthenticated = t.middleware(({ ctx, next }) => {
  if (!ctx.userId) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({ ctx: { ...ctx, userId: ctx.userId } });
});

export const baseProcedure = t.procedure.use(isRateLimited);
export const protectedProcedure = t.procedure
  .use(isRateLimited)
  .use(isAuthenticated);
