import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PackageOpen, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const EmptyToolState = ({
  isPersonaCreated = false,
}: {
  isPersonaCreated: boolean;
}) => {
  const navigate = useNavigate();

  return (
    <Card className="flex flex-col items-center border-dashed border-2 border-slate-200 shadow-none py-12 bg-slate-50/50">
      <CardHeader className="flex items-center justify-center size-20 rounded-full bg-white shadow-sm ring-1 ring-slate-200">
        <CardTitle>
          <PackageOpen className="size-10 text-slate-400" />
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-2 text-center max-w-lg">
        <h3 className="text-xl font-bold text-slate-900 tracking-tight">
          {isPersonaCreated ? "No Tools Found" : "No Persona Found"}
        </h3>
        <p className="text-sm leading-relaxed text-slate-500 max-w-xl mx-auto">
          {isPersonaCreated
            ? "Your persona is active, but you haven't added any tools. Connect your verified stack to increase your reliability score."
            : "You haven't configured your professional persona yet. Define your role and expertise to get started."}
        </p>
      </CardContent>

      {!isPersonaCreated && (
        <CardFooter>
          <Button
            onClick={() => navigate("/persona")}
            className="cursor-pointer"
          >
            <Plus />
            Create Your Persona
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default EmptyToolState;
