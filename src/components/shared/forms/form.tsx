import { Form as FormUI } from "@/components/ui/form";
import React, { HTMLAttributes } from "react";
import { FieldValues, UseFormReturn } from "react-hook-form";

type Props<T extends FieldValues> = {
  children: React.ReactNode;
  onSubmit: (values: T) => void;
  methods: UseFormReturn<T>;
  className?: HTMLAttributes<HTMLFormElement>["className"];
};

const Form = <T extends FieldValues>({
  children,
  onSubmit,
  methods,
  className,
}: Props<T>) => {
  return (
    <FormUI {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className={className}>
        {children}
      </form>
    </FormUI>
  );
};

export default Form;
