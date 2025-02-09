import { Button } from "@/components/ui/button";
import { auth, signOut } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();

  if (!session) {
    redirect("/sign-in");
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1>Test Drizzle Database to create a user</h1>
      <h2>User Details</h2>
      <p>Username: {session.user?.name}</p>
      <p>Email: {session.user?.email}</p>
      <Button
        onClick={async () => {
          "use server";
          await signOut();
        }}
      >
        Sign Out
      </Button>
    </div>
  );
}
