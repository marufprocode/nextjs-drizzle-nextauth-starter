"use client";
import { Button } from "@/components/ui/button";
import { trpc } from "@/trpc/client";
export const dynamic = "force-dynamic";

export default function Home() {
  const { data: user, isLoading, refetch } = trpc.auth.getUser.useQuery();
  const signOut = trpc.auth.signOut.useMutation();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1>Test Drizzle Database to create a user</h1>
      <h2>User Details</h2>
      <p>Username: {user?.name}</p>
      <p>Email: {user?.email}</p>
      <Button
        onClick={() => {
          signOut.mutate(undefined, {
            onSuccess: () => {
              refetch();
            },
          });
        }}
      >
        Sign Out
      </Button>
    </div>
  );
}
