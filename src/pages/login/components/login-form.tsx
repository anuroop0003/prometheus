import ErrorToaster from "@/components/toaster/error-toaster";
import PendingToaster from "@/components/toaster/pending-toaster";
import SuccessToaster from "@/components/toaster/success-toaster";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { useLogin } from "@/services/query/login/login.api";
import { loginSchema, type LoginFormValues } from "@/validations/login.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeOff } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

export const LoginForm = () => {
  const { mutateAsync, isPending } = useLogin();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginFormValues) => {
    toast.promise(mutateAsync(data), {
      icon: null,
      loading: <PendingToaster />,
      success: <SuccessToaster />,
      error: <ErrorToaster />,
    });
  };

  return (
    <Card className="w-sm">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Login to your account</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="email"
                    placeholder="m@example.com"
                    className={errors.email ? "border border-destructive" : ""}
                  />
                )}
              />
              <FieldError className="-mt-2">{errors.email?.message}</FieldError>
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <InputGroup
                    className={
                      errors.password ? "border border-destructive" : ""
                    }
                  >
                    <InputGroupInput
                      {...field}
                      type="password"
                      placeholder="Enter password"
                    />
                    <InputGroupAddon align="inline-end">
                      <EyeOff className="h-4 w-4 cursor-pointer" />
                    </InputGroupAddon>
                  </InputGroup>
                )}
              />
              <FieldError className="-mt-2">
                {errors.password?.message}
              </FieldError>
            </Field>
            <Field>
              <Button
                type="submit"
                className="cursor-pointer"
                disabled={isPending}
                loading={isPending}
              >
                Login
              </Button>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
};
