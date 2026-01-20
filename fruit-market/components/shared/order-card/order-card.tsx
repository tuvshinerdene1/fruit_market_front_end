"use client";

import { Order } from "@/types/order";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, 
  Phone, 
  Calendar, 
  ShoppingBag, 
  Truck, 
  Clock, 
  CheckCircle2, 
  Box 
} from "lucide-react";
import { cn } from "@/lib/utils";

interface OrderCardProps {
  order: Order;
}

export function OrderCard({ order }: OrderCardProps) {
  // Status styling configuration
  const statusConfig = {
    pending: { 
      label: "Хүлээгдэж буй", 
      color: "bg-slate-100 text-slate-700 border-slate-200", 
      icon: Clock 
    },
    preparing: { 
      label: "Бэлтгэж байна", 
      color: "bg-blue-100 text-blue-700 border-blue-200", 
      icon: Box 
    },
    shipping: { 
      label: "Хүргэлтэнд гарсан", 
      color: "bg-amber-100 text-amber-700 border-amber-200", 
      icon: Truck 
    },
    delivered: { 
      label: "Хүргэгдсэн", 
      color: "bg-green-100 text-green-700 border-green-200", 
      icon: CheckCircle2 
    },
  };

  const config = statusConfig[order.status as keyof typeof statusConfig];
  const StatusIcon = config.icon;

  // Calculate total items (fruits + bundles)
  const fruitCount = Object.values(order.fruit_items).reduce((a, b) => a + b, 0);
  const bundleCount = Object.values(order.bundle_items).reduce((a, b) => a + b, 0);

  return (
    <Card className="border shadow-sm hover:shadow-md transition-shadow rounded-xl overflow-hidden bg-white">
      <CardContent className="p-0">
        {/* Header: ID and Status */}
        <div className="flex items-center justify-between p-4 border-b bg-slate-50/50">
          <div className="flex flex-col">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-tighter">Захиалгын №</span>
            <span className="font-bold text-slate-900">{order.id}</span>
          </div>
          <Badge className={cn("px-3 py-1 border font-medium shadow-none", config.color)}>
            <StatusIcon className="h-3.5 w-3.5 mr-1.5" />
            {config.label}
          </Badge>
        </div>

        <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left: Customer & Delivery Info */}
          <div className="space-y-3">
            <div className="flex items-start gap-3 text-sm">
              <MapPin className="h-4 w-4 text-slate-400 mt-0.5" />
              <div className="flex flex-col">
                <span className="font-semibold text-slate-800">{order.district}, {order.building}</span>
                <span className="text-slate-500">{order.floor}-р давхар, {order.door} тоот</span>
              </div>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Phone className="h-4 w-4 text-slate-400" />
              <span className="font-medium text-slate-700">{order.phone_number}</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-500">
              <Calendar className="h-4 w-4 text-slate-400" />
              <span>{new Date(order.order_date).toLocaleDateString()} {new Date(order.order_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
          </div>

          {/* Right: Order Summary */}
          <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-medium text-slate-500 uppercase">
                <span>Барааны тойм</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="h-3.5 w-3.5 text-slate-400" />
                  <span>Жимс (кг/ш)</span>
                </div>
                <span className="font-bold">{fruitCount}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <Box className="h-3.5 w-3.5 text-slate-400" />
                  <span>Багц бүтээгдэхүүн</span>
                </div>
                <span className="font-bold">{bundleCount}</span>
              </div>
            </div>

            <div className="pt-2 mt-2 border-t border-slate-200 flex justify-between items-end">
              <span className="text-sm font-medium text-slate-600">Нийт дүн:</span>
              <span className="text-lg font-bold text-green-700">₮{order.total_price.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}