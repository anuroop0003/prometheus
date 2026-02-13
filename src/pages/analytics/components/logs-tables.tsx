import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import { Fragment, useState } from "react";
import LogLevelBadge from "./log-level-badge";

const logs = [
  {
    id: "LOG001",
    level: "INFO",
    message: "User logged in",
    source: "auth-service",
    timestamp: "2026-02-13T10:22:12Z",
    metadata: { userId: "u_234", ip: "192.168.1.12", browser: "Chrome" },
  },
  {
    id: "LOG002",
    level: "ERROR",
    message: "Payment failed: insufficient_funds",
    source: "payment-service",
    timestamp: "2026-02-13T10:30:41Z",
    metadata: {
      orderId: "ord_983",
      reason: "Insufficient funds",
      gateway: "Stripe",
    },
  },
];

const LogsTable = () => {
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});

  const toggleRow = (id: string) => {
    setExpandedRows((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Deployment Logs</CardTitle>
        <CardDescription>
          Real-time output from your latest deployment.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader className="bg-muted">
              <TableRow className="hover:bg-transparent border-b">
                <TableHead className="w-8" />
                <TableHead className="w-30 text-xs uppercase font-semibold">
                  Status
                </TableHead>
                <TableHead className="text-xs uppercase font-semibold">
                  Message
                </TableHead>
                <TableHead className="w-40 text-xs uppercase font-semibold">
                  Source
                </TableHead>
                <TableHead className="w-40 text-right text-xs uppercase font-semibold">
                  Time
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {logs.map((log) => {
                const isOpen = expandedRows[log.id];

                return (
                  <Fragment key={log.id}>
                    <TableRow
                      className="group cursor-pointer border-b transition-colors hover:bg-muted/30 data-[state=selected]:bg-muted/50"
                      data-state={isOpen ? "selected" : "unselected"}
                      onClick={() => toggleRow(log.id)}
                    >
                      <TableCell className="py-2 pl-4">
                        <ChevronRight
                          className={cn(
                            "size-3.5 transition-transform duration-200 text-muted-foreground group-hover:text-foreground",
                            isOpen ? "rotate-90" : "",
                          )}
                        />
                      </TableCell>

                      <TableCell className="py-2">
                        <LogLevelBadge level={log.level} />
                      </TableCell>

                      <TableCell className="py-2 font-mono text-[13px] text-foreground/90 break-all">
                        {log.message}
                      </TableCell>

                      <TableCell className="py-2 text-[12px] text-muted-foreground font-medium">
                        {log.source}
                      </TableCell>

                      <TableCell className="py-2 text-right font-mono text-[12px] text-muted-foreground/70">
                        {new Date(log.timestamp).toLocaleTimeString([], {
                          hour12: false,
                          hour: "2-digit",
                          minute: "2-digit",
                          second: "2-digit",
                        })}
                      </TableCell>
                    </TableRow>

                    {isOpen && (
                      <TableRow className="bg-muted/20 hover:bg-muted/20 border-b">
                        <TableCell colSpan={5} className="p-0">
                          <div className="px-12 py-4 border-l-2 border-primary/30 ml-4">
                            <div className="rounded-md bg-black/3 dark:bg-white/3 p-3 ring-1 ring-inset ring-foreground/5">
                              <p className="text-[11px] uppercase tracking-widest text-muted-foreground mb-2 font-semibold">
                                Metadata
                              </p>
                              <pre className="text-[12px] font-mono leading-relaxed text-foreground/80">
                                {JSON.stringify(log.metadata, null, 2)}
                              </pre>
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </Fragment>
                );
              })}
            </TableBody>
            <TableFooter>
              <TableRow className="text-[11px] text-muted-foreground font-normal">
                <TableCell colSpan={4} className="text-left">
                  Total Events: {logs.length}
                </TableCell>
                <TableCell className="flex items-center gap-1">
                  <span className="relative flex size-2 ml-auto">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex rounded-full size-2 bg-green-500" />
                  </span>
                  Live tailing activeing
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default LogsTable;
