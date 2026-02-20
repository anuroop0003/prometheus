import { Clock } from "lucide-react";
import * as React from "react";
import { TimePickerInput } from "./time-picker-input";

interface TimePickerProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
}

export function TimePicker({ date, setDate }: TimePickerProps) {
  const minuteRef = React.useRef<HTMLInputElement>(null);
  const hourRef = React.useRef<HTMLInputElement>(null);
  const secondRef = React.useRef<HTMLInputElement>(null);

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-2 rounded-none border border-slate-200 bg-white h-10 px-3 shadow-none">
        <Clock className="size-4 text-slate-500" />
        <TimePickerInput
          picker="hours"
          date={date}
          setDate={setDate}
          ref={hourRef}
          onRightFocus={() => minuteRef.current?.focus()}
          className="w-[30px] border-none shadow-none focus-visible:ring-0 p-0 rounded-none h-full bg-transparent text-sm font-medium focus:bg-slate-100"
        />
        <span>:</span>
        <TimePickerInput
          picker="minutes"
          date={date}
          setDate={setDate}
          ref={minuteRef}
          onLeftFocus={() => hourRef.current?.focus()}
          onRightFocus={() => secondRef.current?.focus()}
          className="w-[30px] border-none shadow-none focus-visible:ring-0 p-0 rounded-none h-full bg-transparent text-sm font-medium focus:bg-slate-100"
        />
        <span>:</span>
        <TimePickerInput
          picker="seconds"
          date={date}
          setDate={setDate}
          ref={secondRef}
          onLeftFocus={() => minuteRef.current?.focus()}
          className="w-[30px] border-none shadow-none focus-visible:ring-0 p-0 rounded-none h-full bg-transparent text-sm font-medium focus:bg-slate-100"
        />
      </div>
    </div>
  );
}
