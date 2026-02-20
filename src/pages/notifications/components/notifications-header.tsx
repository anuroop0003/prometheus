import { Workflow } from "lucide-react";
import { Link } from "react-router-dom";

export function NotificationsHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b-2 border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
        <Link to="/home" className="flex items-center gap-3">
          <div className="bg-slate-900 h-8 w-8 rounded-none flex items-center justify-center shadow-none">
            <Workflow className="text-white size-5" />
          </div>
          <span className="font-extrabold tracking-tight text-xl text-slate-900 uppercase">
            Prometheus
          </span>
        </Link>
      </div>
    </header>
  );
}
