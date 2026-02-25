"use client";

import updateProfileDetails from "@/hooks/action/updateProfileDetails";
import { profileNameSchema } from "@/lib/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon, PencilLineIcon } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import z from "zod";
import { Button } from "../shadcnui/button";
import { Field, FieldError, FieldLabel } from "../shadcnui/field";
import { Input } from "../shadcnui/input";

type ProfileFormProps = {
  userName: string;
};

const ProfileForm = ({ userName }: ProfileFormProps) => {
  const {
    handleSubmit,
    control,
    formState: { isSubmitting, isDirty },
  } = useForm({
    resolver: zodResolver(profileNameSchema),
    defaultValues: {
      name: userName,
    },
    mode: "all",
  });

  const nameHandler = async ({ name }: z.infer<typeof profileNameSchema>) => {
    const { isSuccess, message } = await updateProfileDetails(name);

    if (!isSuccess) {
      toast.error(message);
    } else {
      toast.success(message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(nameHandler)}
      className="grid gap-6"
      noValidate>
      {/* Name field */}
      <Controller
        name="name"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Name</FieldLabel>
            <Input
              {...field}
              id={field.name}
              aria-invalid={fieldState.invalid}
              placeholder="Enter your name"
              autoComplete="name"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Button
        className="w-full cursor-pointer"
        type="submit"
        disabled={!isDirty || isSubmitting}>
        {isSubmitting ?
          <>
            <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
            Updating...
          </>
        : <>
            <PencilLineIcon className="mr-2 h-4 w-4" />
            Update
          </>
        }
      </Button>
    </form>
  );
};

export default ProfileForm;
