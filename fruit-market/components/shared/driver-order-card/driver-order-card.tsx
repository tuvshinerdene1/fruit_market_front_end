"use client";

import { Order } from "@/types/order";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Phone, MapPinned, Navigation, CheckCircle2 } from "lucide-react";

interface DriverOrderCardProps {
  order: Order;
  onStatusChange: (id: string, newStatus: Order["status"]) => void;
}

export function DriverOrderCard({ order, onStatusChange }: DriverOrderCardProps) {
  // Drivers only see orders that are "shipping" or "delivered"
  const isDelivered = order.status === "delivered";

  const handleNavigation = () => {
    const address = `${order.district} ${order.building}`;
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`, '_blank');
  };

  return (
    <Card className="p-0 overflow-hidden border-slate-200 shadow-lg">
      <div className="p-5 space-y-4">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Хүргэлтийн хаяг</span>
            <h3 className="text-lg font-bold text-slate-900 leading-tight">
              {order.district}, {order.building}
            </h3>
            <p className="text-slate-600 text-sm font-medium">
              {order.floor} давхар, {order.door} тоот
            </p>
          </div>
          <Badge className={isDelivered ? "bg-green-100 text-green-700" : "bg-purple-100 text-purple-700"}>
            {isDelivered ? "Хүргэгдсэн" : "Замд гарсан"}
          </Badge>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Button 
            variant="outline" 
            className="rounded-xl border-blue-200 text-blue-700 gap-2 h-12"
            onClick={() => window.open(`tel:${order.phone_number}`)}
          >
            <Phone className="h-4 w-4" /> Залгах
          </Button>
          <Button 
            variant="outline" 
            className="rounded-xl border-slate-200 text-slate-700 gap-2 h-12"
            onClick={handleNavigation}
          >
            <Navigation className="h-4 w-4 text-green-600" /> Газрын зураг
          </Button>
        </div>

        {!isDelivered ? (
          <Button 
            className="w-full bg-green-600 hover:bg-green-700 text-white rounded-xl h-14 text-lg font-bold shadow-md"
            onClick={() => onStatusChange(order.id, "delivered")}
          >
            Хүргэж дуусгах
          </Button>
        ) : (
          <div className="flex items-center justify-center gap-2 py-2 text-green-600 font-bold bg-green-50 rounded-xl">
            <CheckCircle2 className="h-5 w-5" /> Хүргэгдсэн
          </div>
        )}
      </div>
    </Card>
  );
}