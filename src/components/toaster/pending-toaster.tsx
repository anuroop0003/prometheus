import { Loader } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

interface PendingToasterProps {
  title?: string;
  description?: string;
}

const PendingToaster = ({
  title = "Processing...",
  description = "Please wait while we process your request.",
}: PendingToasterProps) => {
  return (
    <Alert variant="pending">
      <Loader className="animate-spin" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription className="font-normal">{description}</AlertDescription>
    </Alert>
  );
};

export default PendingToaster;
