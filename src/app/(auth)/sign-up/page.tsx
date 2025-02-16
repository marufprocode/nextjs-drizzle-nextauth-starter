import { Button } from "@/components/ui/button";
import Link from "next/link";
import SignUpForm from "./_components/SignUpForm";

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

        <SignUpForm />

        <div className="text-center">
          <Button asChild variant="link">
            <Link href="/sign-in">Already have an account? Sign in</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
