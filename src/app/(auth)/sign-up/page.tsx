import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import db from "@/db";
import { usersTable } from "@/db/schemas";
import { credentialsSchema } from "@/lib/auth";
import executeAction from "@/lib/execute-action";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function SignUpPage() {
  return (
    <div className="flex justify-center items-center h-full bg-slate-50">
      <div className="w-full max-w-sm mx-auto space-y-6 shadow-lg p-4">
        <h1 className="text-2xl font-bold text-center mb-6">Create Account</h1>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with email
            </span>
          </div>
        </div>

        {/* Email/Password Sign Up */}
        <form
          className="space-y-4"
          action={async (formData: FormData) => {
            "use server";
            const res = await executeAction({
              actionFn: async () => {
                const validatedSchema = credentialsSchema.parse(formData);
                await db.insert(usersTable).values({
                  name: "sads",
                  age: 32,
                  email: validatedSchema.email,
                  password: validatedSchema.password,
                });
              },
            });
            if (res.success) {
              redirect("/sign-in");
            }
          }}
        >
          <Input
            name="email"
            placeholder="Email"
            type="email"
            required
            autoComplete="email"
          />
          <Input
            name="password"
            placeholder="Password"
            type="password"
            required
            autoComplete="new-password"
          />
          <Button className="w-full" type="submit">
            Sign Up
          </Button>
        </form>

        <div className="text-center">
          <Button asChild variant="link">
            <Link href="/sign-in">Already have an account? Sign in</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
