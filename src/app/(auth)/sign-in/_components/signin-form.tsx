"use client";
import Form from "@/components/shared/forms/form";
import FormInput from "@/components/shared/forms/form-input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
const signInForm = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z.string().min(1, "Password is required"),
});

type SignInForm = z.infer<typeof signInForm>;

const SignInForm = () => {
  const router = useRouter();
  const methods = useForm<SignInForm>({
    resolver: zodResolver(signInForm),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignInForm) => {
    const response = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });
    if (response?.error) {
      toast.error(response.error);
    } else {
      toast.success("Sign in successfully.");
      router.push("/");
    }
  };

  return (
    <Form methods={methods} onSubmit={onSubmit} className="space-y-2">
      <FormInput<SignInForm> name="email" label="Email" placeholder="Email" />
      <FormInput<SignInForm>
        name="password"
        label="Password"
        placeholder="Password"
        type="password"
      />
      <Button type="submit">Sign In</Button>
    </Form>
  );
};

export default SignInForm;
