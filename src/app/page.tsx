import { Button } from "@/components/ui/button";

export default async function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1>Test Drizzle Database to create a user</h1>
      <Button variant={"outline"}>Create User</Button>
    </div>
  );
}
