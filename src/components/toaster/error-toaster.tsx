import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

interface ErrorToasterProps {
  title?: string;
  description?: string;
}

const ErrorToaster = ({
  title = "Error",
  description = "Something went wrong. Please try again.",
}: ErrorToasterProps) => {
  return (
    <Alert variant="destructive">
      <AlertCircle />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription className="font-normal">{description}</AlertDescription>
    </Alert>
  );
};

export default ErrorToaster;
