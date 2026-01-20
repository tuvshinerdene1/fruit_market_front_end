"use client";

import { Order } from "@/types/order";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Phone, 
  MapPin, 
  Package, 
  ChevronRight, 
  CheckCircle2, 
  Clock, 
  Truck 
} from "lucide-react";
import { cn } from "@/lib/utils";

interface WorkerOrderCardProps {
  order: Order;
  onStatusChange: (id: string, newStatus: Order["status"]) => void;
}

export function WorkerOrderCard({ order, onStatusChange }: WorkerOrderCardProps) {
  
  // Define status styling and labels
  const statusConfig = {
    pending: { label: "Хүлээгдэж буй", color: "bg-amber-100 text-amber-700 border-amber-200", next: "preparing", btnText: "Бэлтгэж эхлэх" },
    preparing: { label: "Бэлтгэж байна", color: "bg-blue-100 text-blue-700 border-blue-200", next: "shipping", btnText: "Хүргэлтэд гаргах" },
    shipping: { label: "Хүргэлтэнд", color: "bg-purple-100 text-purple-700 border-purple-200", next: "delivered", btnText: "Хүргэгдсэн" },
    delivered: { label: "Хүргэгдсэн", color: "bg-green-100 text-green-700 border-green-200", next: null, btnText: "Дууссан" },
  };

  const current = statusConfig[order.status];

  return (
    <Card className="overflow-hidden border-slate-200 shadow-sm">
      <div className="p-4 space-y-4">
        {/* Header: ID and Status Badge */}
        <div className="flex justify-between items-center">
          <span className="text-xs font-mono font-bold text-slate-500">{order.id}</span>
          <Badge className={cn("px-2 py-0.5 rounded-full border shadow-none font-medium", current.color)}>
            {current.label}
          </Badge>
        </div>

        {/* Address & Contact Section */}
        <div className="space-y-2">
          <div className="flex items-start gap-2">
            <MapPin className="h-4 w-4 text-slate-400 mt-1 shrink-0" />
            <div className="text-sm">
              <p className="font-bold text-slate-900">{order.district}, {order.building}</p>
              <p className="text-slate-500">{order.floor}-р давхар, {order.door} тоот</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-slate-400 shrink-0" />
            <a href={`tel:${order.phone_number}`} className="text-sm font-medium text-blue-600 underline">
              {order.phone_number}
            </a>
          </div>
        </div>

        {/* Items Summary */}
        <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
          <div className="flex items-center gap-2 mb-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
            <Package className="h-3.5 w-3.5" /> Бараанууд
          </div>
          <div className="flex flex-wrap gap-2">
            {/* Show Fruit Count */}
            {Object.keys(order.fruit_items).length > 0 && (
              <Badge variant="outline" className="bg-white text-[11px] font-normal">
                {Object.values(order.fruit_items).reduce((a, b) => a + b, 0)} жимс
              </Badge>
            )}
            {/* Show Bundle Count */}
            {Object.keys(order.bundle_items).length > 0 && (
              <Badge variant="outline" className="bg-white text-[11px] font-normal border-blue-200 text-blue-700">
                {Object.values(order.bundle_items).reduce((a, b) => a + b, 0)} багц
              </Badge>
            )}
          </div>
        </div>

        {/* Action Button: Changes based on status */}
        {current.next && (
          <Button 
            className="w-full bg-slate-900 hover:bg-slate-800 text-white rounded-xl h-12 gap-2 shadow-lg shadow-slate-200"
            onClick={() => onStatusChange(order.id, current.next as Order["status"])}
          >
            {order.status === "pending" && <Clock className="h-4 w-4" />}
            {order.status === "preparing" && <Package className="h-4 w-4" />}
            {order.status === "shipping" && <Truck className="h-4 w-4" />}
            {current.btnText}
            <ChevronRight className="h-4 w-4 ml-auto opacity-50" />
          </Button>
        )}

        {order.status === "delivered" && (
          <div className="flex items-center justify-center gap-2 py-2 text-green-600 font-bold text-sm">
            <CheckCircle2 className="h-5 w-5" />
            Амжилттай хүргэгдсэн
          </div>
        )}
      </div>
    </Card>
  );
}