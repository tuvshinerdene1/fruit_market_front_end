import { MapPin, Building2, DoorOpen } from "lucide-react";
import { Order } from "@/types/order";

interface DeliveryAddressProps {
  order: Order;
}

export function DeliveryAddress({ order }: DeliveryAddressProps) {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">
        Delivery Details
      </h3>
      
      <div className="space-y-3">
        {/* Building Info */}
        <div className="flex items-start gap-3">
          <Building2 className="w-5 h-5 text-primary mt-0.5" />
          <div>
            <p className="font-medium text-sm leading-none mb-1">Building</p>
            <p className="text-muted-foreground text-sm">{order.building}</p>
          </div>
        </div>

        {/* Floor & Door Info */}
        <div className="flex items-start gap-3">
          <DoorOpen className="w-5 h-5 text-primary mt-0.5" />
          <div>
            <p className="font-medium text-sm leading-none mb-1">Unit Info</p>
            <p className="text-muted-foreground text-sm">
              Floor {order.floor}, Apartment {order.door}
            </p>
          </div>
        </div>

        {/* District Info */}
        <div className="flex items-start gap-3">
          <MapPin className="w-5 h-5 text-primary mt-0.5" />
          <div>
            <p className="font-medium text-sm leading-none mb-1">District</p>
            <p className="text-muted-foreground text-sm">{order.district}</p>
          </div>
        </div>
      </div>
    </div>
  );
}