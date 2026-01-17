import { Progress } from "@/components/ui/progress";
import { OrderStatus } from "@/types/order";
import { Timer, Utensils, Truck, CheckCircle2 } from "lucide-react";

const statusConfig = {
  pending: { value: 15, label: "Order Placed", icon: Timer },
  preparing: { value: 45, label: "Packing Fruits", icon: Utensils },
  shipping: { value: 75, label: "On the Way", icon: Truck },
  delivered: { value: 100, label: "Enjoy your Fruits!", icon: CheckCircle2 },
};

export function OrderStatusProgress({ status }: { status: OrderStatus }) {
  const current = statusConfig[status];
  const Icon = current.icon;

  return (
    <div className="space-y-4">
      <div className="flex justify-between text-xs font-medium text-muted-foreground px-1">
        {Object.keys(statusConfig).map((s) => (
          <span key={s} className={status === s ? "text-primary font-bold capitalize" : "capitalize"}>
            {s}
          </span>
        ))}
      </div>
      <Progress value={current.value} className="h-3" />
      <div className="flex items-center gap-2 text-sm font-medium text-primary bg-primary/5 p-3 rounded-md">
        <Icon className="w-5 h-5 animate-pulse" />
        <span>{current.label}</span>
      </div>
    </div>
  );
}