import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BarChart3, Bell, UserSquare } from "lucide-react";
import { Link } from "react-router-dom";

const navigationCards = [
  {
    name: "Analytics",
    path: "/analytics",
    icon: BarChart3,
    description: "System metrics and usage reports",
    color: "text-blue-600",
    bg: "bg-blue-100",
  },
  {
    name: "Notifications",
    path: "/notifications",
    icon: Bell,
    description: "Recent alerts and messages",
    color: "text-amber-600",
    bg: "bg-amber-100",
  },
  {
    name: "Persona",
    path: "/persona",
    icon: UserSquare,
    description: "Agent identity and preferences",
    color: "text-emerald-600",
    bg: "bg-emerald-100",
  },
];

const NavigationSection = () => {
  return (
    <section className="space-y-4 mb-8">
      <div className="border-b-2 border-slate-300 pb-2 mb-4">
        <h2 className="text-xl font-bold tracking-tight text-slate-800 uppercase text-sm">
          System Navigation
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {navigationCards.map((card) => (
          <Link key={card.path} to={card.path} className="block group">
            <Card className="rounded-none border-2 border-slate-300 bg-slate-50 shadow-[4px_4px_0px_0px_rgba(203,213,225,1)] hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-[2px_2px_0px_0px_rgba(203,213,225,1)] transition-all cursor-pointer h-full">
              <CardHeader className="flex flex-row items-center space-y-0 pb-2 gap-4">
                <div
                  className={`p-2 rounded-none border-2 border-slate-300 ${card.bg}`}
                >
                  <card.icon
                    className={`size-6 ${card.color}`}
                    strokeWidth={2.5}
                  />
                </div>
                <div>
                  <CardTitle className="text-lg font-bold text-slate-800">
                    {card.name}
                  </CardTitle>
                  <CardDescription className="text-xs font-semibold text-slate-500 mt-1">
                    {card.description}
                  </CardDescription>
                </div>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default NavigationSection;
