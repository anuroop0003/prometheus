import { Workflow } from "lucide-react";

const SuspenseLoader = () => {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="flex items-center gap-2 self-center font-medium tracking-wide">
        <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
          <Workflow className="size-4" />
        </div>
        Prometheus Inc.
      </div>
    </div>
  );
};

export default SuspenseLoader;
