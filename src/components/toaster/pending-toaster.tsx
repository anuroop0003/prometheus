import { Loader } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

const PendingToaster = () => {
  return (
    <Alert variant="pending" className="bg-amber--50">
      <Loader className="animate-spin" />
      <AlertTitle>Your subscription will expire in 3 days.</AlertTitle>
      <AlertDescription className="font-normal">
        Renew now to avoid service interruption or upgrade to a paid plan to
        continue using the service.
      </AlertDescription>
    </Alert>
  );
};

export default PendingToaster;
