"use client";
import Form from "@/components/shared/forms/form";
import FormInput from "@/components/shared/forms/form-input";
import { Button } from "@/components/ui/button";
import { trpc } from "@/trpc/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const signUpForm = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  name: z.string().min(1, "Name is required"),
});

type SignUpForm = z.infer<typeof signUpForm>;

const SignUpForm = () => {
  const methods = useForm<SignUpForm>({
    resolver: zodResolver(signUpForm),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });
  const signUp = trpc.auth.signUp.useMutation({
    onSuccess: () => {
      toast.success("Sign in successfully.");
    },
    onError: (error) => {
      toast.error(error.message, {
        richColors: true,
      });
    },
  });

  const onSubmit = (data: SignUpForm) => {
    signUp.mutate(data);
  };

  return (
    <Form methods={methods} onSubmit={onSubmit} className="space-y-2">
      <FormInput<SignUpForm> name="name" label="Name" placeholder="Name" />
      <FormInput<SignUpForm> name="email" label="Email" placeholder="Email" />
      <FormInput<SignUpForm>
        name="password"
        label="Password"
        placeholder="Password"
      />
      <Button type="submit">Sign Up</Button>
    </Form>
  );
};

export default SignUpForm;
