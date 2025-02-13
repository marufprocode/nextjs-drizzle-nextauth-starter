"use client";

import { trpc } from "@/trpc/client";

export const Home = () => {
  const { data } = trpc.hello.useQuery({ text: "client" });

  return <div>{data?.greeting}</div>;
};
