import { FieldDescription } from "@/components/ui/field";
import { Workflow } from "lucide-react";
import { LoginForm } from "./components/login-form";

const Login = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <div className="flex items-center gap-2 self-center font-mono font-medium tracking-wide">
          <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
            <Workflow className="size-4" />
          </div>
          Prometheus Inc.
        </div>
        <LoginForm />
        <FieldDescription className="px-6 text-center text-xs">
          By clicking continue, you agree to our{" "}
          <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
        </FieldDescription>
      </div>
    </div>
  );
};

export default Login;
