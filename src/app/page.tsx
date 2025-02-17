import { Button } from "@/components/ui/button";
import { auth, signOut } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const session = await auth();
  if (!session) {
    redirect("/sign-in");
  }
  const handleSignOut = async () => {
    "use server";
    await signOut();
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">Welcome {session.user?.name}</h1>
      <Button onClick={handleSignOut}>Sign Out</Button>
    </div>
  );
}
