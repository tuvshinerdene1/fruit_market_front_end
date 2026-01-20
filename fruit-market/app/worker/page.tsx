"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // To redirect after logout
import { Order } from "@/types/order";
import { MOCK_ORDERS } from "@/mock_data/mock_orders";
import { WorkerOrderCard } from "@/components/shared/worker_order-card/worker-order-card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ClipboardList, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function WorkerPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS);

  const handleStatusChange = (id: string, newStatus: Order["status"]) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === id ? { ...order, status: newStatus } : order
      )
    );
  };

  const handleLogout = () => {
    // 1. Clear local storage/session (where your JWT is stored)
    localStorage.removeItem("currentWorker"); 
    
    // 2. Redirect to login
    router.push("/login");
    
    // Optional: add a toast message here
  };

  const pendingOrders = orders.filter((o) => o.status === "pending");
  const activeOrders = orders.filter((o) => o.status === "preparing" || o.status === "shipping");
  const completedOrders = orders.filter((o) => o.status === "delivered");

  return (
    <div className="max-w-7xl mx-auto min-h-screen bg-slate-50 pb-20 px-4 md:px-8">
      {/* Header with Logout */}
      <header className="py-6 mb-2 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Ажилчны хэсэг</h1>
          <p className="text-sm text-slate-500 font-medium">Өнөөдрийн захиалгын удирдлага</p>
        </div>
        
        <Button 
          variant="ghost" 
          onClick={handleLogout}
          className="text-slate-500 hover:text-red-600 hover:bg-red-50 gap-2 rounded-xl transition-all"
        >
          <LogOut className="h-5 w-5" />
          <span className="hidden sm:inline">Гарах</span>
        </Button>
      </header>

      <main>
        <Tabs defaultValue="active" className="w-full">
          <div className="flex justify-center md:justify-start">
            <TabsList className="grid w-full max-w-md grid-cols-3 mb-8 bg-slate-200/60 p-1 rounded-xl shadow-sm">
              <TabsTrigger value="pending" className="rounded-lg text-xs md:text-sm gap-1">
                Шинэ ({pendingOrders.length})
              </TabsTrigger>
              <TabsTrigger value="active" className="rounded-lg text-xs md:text-sm gap-1">
                Идэвхтэй ({activeOrders.length})
              </TabsTrigger>
              <TabsTrigger value="done" className="rounded-lg text-xs md:text-sm gap-1">
                Дууссан
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="pending" className="outline-none">
            {pendingOrders.length === 0 ? (
              <EmptyState message="Шинэ захиалга байхгүй байна" />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {pendingOrders.map((order) => (
                  <WorkerOrderCard key={order.id} order={order} onStatusChange={handleStatusChange} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="active" className="outline-none">
            {activeOrders.length === 0 ? (
              <EmptyState message="Идэвхтэй ажил байхгүй байна" />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {activeOrders.map((order) => (
                  <WorkerOrderCard key={order.id} order={order} onStatusChange={handleStatusChange} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="done" className="outline-none">
            {completedOrders.length === 0 ? (
              <EmptyState message="Хүргэгдсэн захиалга одоогоор алга" />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {completedOrders.map((order) => (
                  <WorkerOrderCard key={order.id} order={order} onStatusChange={handleStatusChange} />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-32 text-slate-400 bg-white rounded-3xl border-2 border-dashed border-slate-200">
      <ClipboardList className="h-12 w-12 mb-4 opacity-20" />
      <p className="font-medium">{message}</p>
    </div>
  );
}