import { Button } from "@/components/ui/button";
import { ShieldCheck } from "lucide-react";

interface PersonaHeaderProps {
  isPending: boolean;
  onSubmit: () => void;
}

export function PersonaHeader({ isPending, onSubmit }: PersonaHeaderProps) {
  return (
    <header className="sticky top-4 z-50 w-full border-b bg-white/80 backdrop-blur-md">
      <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-rose-600 h-9 w-9 rounded-xl flex items-center justify-center shadow-md">
            <ShieldCheck className="text-white h-5 w-5" />
          </div>
          <span className="font-bold tracking-tight text-xl">Prometheus</span>
        </div>

        <Button
          onClick={onSubmit}
          loading={isPending}
          disabled={isPending}
          className="min-w-36 cursor-pointer"
        >
          Save Changes
        </Button>
      </div>
    </header>
  );
}
