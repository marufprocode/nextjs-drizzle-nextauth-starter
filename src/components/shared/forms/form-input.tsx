import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FieldValues, useFormContext } from "react-hook-form";

interface FormInputProps<T extends FieldValues> {
  name: keyof T & string;
  label?: string;
  placeholder: string;
  type?: string;
  description?: string;
}

const FormInput = <T extends FieldValues>({
  name,
  label,
  placeholder,
  type,
  description,
}: FormInputProps<T>) => {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Input {...field} placeholder={placeholder} type={type} />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormInput;
