import { type LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  icon: LucideIcon;
  trend: "up" | "down";
}

export default function StatsCard({
  title,
  value,
  change,
  icon: Icon,
  trend,
}: StatsCardProps) {
  return (
    <Card className="p-6 glass-effect border-border/40 hover:border-primary/50 transition-colors">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-muted-foreground mb-1">{title}</p>
          <h3 className="text-2xl font-bold mb-2">{value}</h3>
          <p
            className={`text-xs ${
              trend === "up" ? "text-green-500" : "text-red-500"
            }`}
          >
            {change}
          </p>
        </div>
        <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
          <Icon className="h-6 w-6 text-primary" />
        </div>
      </div>
    </Card>
  );
}
