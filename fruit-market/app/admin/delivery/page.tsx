import { MOCK_ORDERS } from "@/mock_data/mock_orders";
import { OrderCard } from "@/components/shared/order-card/order-card";

export default function OrdersPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold font-serif">Захиалгын хяналт</h1>
        <p className="text-muted-foreground">Бүх захиалгын мэдээлэл болон хүргэлтийн төлөв.</p>
      </div>

      <div className="flex flex-col gap-4">
        {MOCK_ORDERS.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
}