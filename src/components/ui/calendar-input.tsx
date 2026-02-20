import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { ChevronDownIcon } from "lucide-react";

interface CalendarInputProps {
  value?: Date;
  onChange: (date?: Date) => void;
}

export function CalendarInput({ value, onChange }: CalendarInputProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          data-empty={!value}
          className="data-[empty=true]:text-muted-foreground w-full justify-between text-left font-normal rounded-none border border-slate-200 bg-white"
        >
          {value ? format(value, "PPP") : <span>Pick a date</span>}
          <ChevronDownIcon className="size-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={value}
          onSelect={onChange}
          defaultMonth={value}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
