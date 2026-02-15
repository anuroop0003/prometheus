import { AlertTriangle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

const SuccessToaster = () => {
  return (
    <Alert>
      <AlertTriangle />
      <AlertTitle>Your subscription will expire in 3 days.</AlertTitle>
      <AlertDescription className="font-normal">
        Renew now to avoid service interruption or upgrade to a paid plan to
        continue using the service.
      </AlertDescription>
    </Alert>
  );
};

export default SuccessToaster;
