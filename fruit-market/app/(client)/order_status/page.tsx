"use client"
import { useState } from "react";
import { MOCK_ORDERS } from "@/mock_data/mock_orders";
import { Order, OrderStatus } from "@/types/order";
import { OrderSearchForm } from "./orderSearchForm"
import { OrderStatusProgress } from "./orderStatusProgress";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { OrderItemsList } from "./orderItemsList";
import { OrderNotFound } from "./orderNotFound";
import { DeliveryAddress } from "./deliverAddress";



export default function OrderStatusPage() {
  const [phoneInput, setPhoneInput] = useState("");
  const [foundOrder, setFoundOrder] = useState<Order | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const order = MOCK_ORDERS.find((o) => o.phone_number.replace(/\D/g, '') === phoneInput.replace(/\D/g, ''));
    setFoundOrder(order || null);
    setHasSearched(true);
  };

  return (
    <div className="max-w-2xl mx-auto p-4 md:p-8 space-y-8">
      <header className="text-center">
        <h1 className="text-4xl font-bold">Fruit Tracker</h1>
      </header>

      <OrderSearchForm 
        value={phoneInput} 
        onChange={setPhoneInput} 
        onSearch={handleSearch} 
      />

      {hasSearched && (
        foundOrder ? (
          <Card>
            <CardHeader>...</CardHeader>
            <CardContent className="space-y-8">
              <OrderStatusProgress status={foundOrder.status as OrderStatus} />
              <div className="grid md:grid-cols-2 gap-6 pt-4 border-t">
                 <DeliveryAddress order={foundOrder} />
                 <OrderItemsList 
                    fruitItems={foundOrder.fruit_items} 
                    bundleItems={foundOrder.bundle_items}
                    total={foundOrder.total_price}
                 />
              </div>
            </CardContent>
          </Card>
        ) : (
          <OrderNotFound phone={phoneInput} />
        )
      )}
    </div>
  );
}