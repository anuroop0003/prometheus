import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

const ErrorToaster = () => {
  return (
    <Alert variant="destructive">
      <AlertCircle />
      <AlertTitle>Payment failed</AlertTitle>
      <AlertDescription className="font-normal">
        Your payment could not be processed. Please check your payment method
        and try again.
      </AlertDescription>
    </Alert>
  );
};

export default ErrorToaster;
