import { Button } from "@/components/ui/button";
import { auth, signIn } from "@/lib/auth";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import SignInForm from "./_components/signin-form";

export default async function SignIn() {
  const session = await auth();
  if (session) {
    redirect("/");
  }
  return (
    <div className="h-full flex flex-col items-center justify-center bg-slate-50">
      <div className="w-full max-w-sm mx-auto space-y-6 p-5 shadow-xl rounded-md bg-white">
        <h1 className="text-2xl font-bold text-center mb-6">Sign In</h1>

        <form
          action={async () => {
            "use server";
            await signIn("google");
          }}
        >
          <Button className="w-full" variant="outline">
            <Image
              src="/logos/google.svg"
              alt="Google"
              width={16}
              height={16}
            />
            Continue with Google
          </Button>
        </form>

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

        {/* Email/Password Sign In */}
        <SignInForm />

        <div className="text-center">
          <Button asChild variant="link">
            <Link href="/sign-up">Don&apos;t have an account? Sign up</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
