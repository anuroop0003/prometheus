import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { PackageOpen } from "lucide-react";

const EmptyToolState = () => {
  return (
    <Card className="col-span-1 md:col-span-2 lg:col-span-3 flex flex-col border-dashed border-primary shadow-none">
      <CardHeader className="flex items-center justify-center">
        <div className="rounded-full bg-muted p-6">
          <PackageOpen className="size-10 text-muted-foreground" />
        </div>
      </CardHeader>

      <CardContent className="space-y-2 text-center">
        <h3 className="font-semibold text-foreground">Empty Category</h3>
        <p className="text-sm leading-relaxed text-muted-foreground">
          There aren't any tools here yet. Be the first to add one!
        </p>
      </CardContent>
    </Card>
  );
};

export default EmptyToolState;
