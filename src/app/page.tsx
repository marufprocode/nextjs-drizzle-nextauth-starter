import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();

  if (!session) {
    redirect("/sign-in");
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1>Test Drizzle Database to create a user</h1>
      <Button variant={"outline"}>Create User</Button>
    </div>
  );
}
