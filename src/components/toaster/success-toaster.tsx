import { AlertTriangle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

interface SuccessToasterProps {
  title?: string;
  description?: string;
}

const SuccessToaster = ({
  title = "Success",
  description = "Operation completed successfully.",
}: SuccessToasterProps) => {
  return (
    <Alert variant="success">
      <AlertTriangle />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription className="font-normal">{description}</AlertDescription>
    </Alert>
  );
};

export default SuccessToaster;
