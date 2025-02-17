"use client";
import Form from "@/components/shared/forms/form";
import FormInput from "@/components/shared/forms/form-input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
const signInForm = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z.string().min(1, "Password is required"),
});

type SignInForm = z.infer<typeof signInForm>;

const SignInForm = () => {
  const methods = useForm<SignInForm>({
    resolver: zodResolver(signInForm),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: SignInForm) => {
    console.log(data);
  };

  return (
    <Form methods={methods} onSubmit={onSubmit} className="space-y-2">
      <FormInput<SignInForm> name="email" label="Email" placeholder="Email" />
      <FormInput<SignInForm>
        name="password"
        label="Password"
        placeholder="Password"
      />
      <Button type="submit">Sign In</Button>
    </Form>
  );
};

export default SignInForm;
