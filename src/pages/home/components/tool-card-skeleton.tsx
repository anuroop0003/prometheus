import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function ToolCardSkeleton() {
  return (
    <Card className="py-2 rounded-none border-2 border-slate-200 bg-white shadow-none transition-all flex flex-col h-full min-h-[160px]">
      <CardHeader className="p-4 pb-2 relative flex flex-row justify-between items-start space-y-0">
        <div className="flex flex-col gap-2 w-full">
          <div className="flex items-center gap-2">
            <span className="size-1.5 bg-slate-200 rounded-none relative top-0.5"></span>
            <Skeleton className="h-4 w-1/2 rounded-none bg-slate-200" />
          </div>
          <Skeleton className="h-3 w-1/3 ml-[14px] rounded-none bg-slate-200" />
        </div>
        <CardAction>
          <div className="p-1 border-none">
            <Skeleton className="size-8 rounded-none bg-slate-200" />
          </div>
        </CardAction>
      </CardHeader>

      <CardContent className="px-4 py-2 flex-1 flex flex-col space-y-4">
        <div className="space-y-2 mt-2">
          <Skeleton className="h-2 w-full rounded-none bg-slate-200" />
          <Skeleton className="h-2 w-[90%] rounded-none bg-slate-200" />
          <Skeleton className="h-2 w-[80%] rounded-none bg-slate-200" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-4 w-12 rounded-none bg-slate-200" />
          <Skeleton className="h-4 w-16 rounded-none bg-slate-200" />
        </div>
      </CardContent>

      <CardFooter className="px-4 pb-4 pt-2 mt-auto">
        <Skeleton className="h-9 w-full rounded-none bg-slate-200" />
      </CardFooter>
    </Card>
  );
}
