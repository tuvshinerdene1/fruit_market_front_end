"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MOCK_ORDERS } from "@/mock_data/mock_orders";
import { DriverOrderCard } from "@/components/shared/driver-order-card/driver-order-card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Truck, Map, History, LogOut, PackageCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DriverPage() {
  const router = useRouter();
  const [orders, setOrders] = useState(MOCK_ORDERS);

  const handleStatusChange = (id: string, newStatus: any) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status: newStatus } : o));
    // Integration point: apiRequest(`/orders/${id}/`, "PATCH", { status: newStatus })
  };

  const handleLogout = () => {
    localStorage.removeItem("currentWorker");
    router.push("/login");
  };

  const toDeliver = orders.filter(o => o.status === "shipping");
  const delivered = orders.filter(o => o.status === "delivered");

  return (
    <div className="min-h-screen bg-slate-50 pb-10">
      {/* Responsive Header: Full width on mobile, max-width on desktop */}
      <header className="bg-slate-900 text-white sticky top-0 z-20 shadow-2xl rounded-b-[1.5rem] md:rounded-none">
        <div className="max-w-7xl mx-auto px-6 py-4 md:py-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-green-500/20 p-2 rounded-lg hidden sm:block">
              <Truck className="h-6 w-6 text-green-400" />
            </div>
            <div>
              <h1 className="text-lg md:text-xl font-bold tracking-tight">Жолоочийн хэсэг</h1>
              <p className="text-slate-400 text-[10px] md:text-xs uppercase tracking-widest font-semibold">
                {toDeliver.length} Захиалга хүргэх дутуу
              </p>
            </div>
          </div>
          
          <Button 
            variant="ghost" 
            onClick={handleLogout}
            className="text-slate-300 hover:text-white hover:bg-white/10 gap-2 rounded-xl transition-all h-10 px-3"
          >
            <LogOut className="h-5 w-5" />
            <span className="hidden md:inline font-medium">Системээс гарах</span>
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4 md:p-8">
        <Tabs defaultValue="delivery" className="w-full">
          {/* Tabs Positioning: Centered on mobile, Left-aligned on Desktop */}
          <div className="flex justify-center md:justify-start mb-8">
            <TabsList className="grid w-full max-w-[400px] grid-cols-2 h-12 rounded-2xl bg-slate-200/50 p-1 backdrop-blur-sm border">
              <TabsTrigger value="delivery" className="rounded-xl gap-2 font-bold data-[state=active]:bg-white data-[state=active]:shadow-sm">
                <Map className="h-4 w-4" /> Хүргэх
              </TabsTrigger>
              <TabsTrigger value="history" className="rounded-xl gap-2 font-bold data-[state=active]:bg-white data-[state=active]:shadow-sm">
                <History className="h-4 w-4" /> Түүх
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="delivery" className="outline-none">
            {toDeliver.length === 0 ? (
              <EmptyState message="Одоогоор хүргэх бараа алга." />
            ) : (
              /* Grid Layout: 1 col on mobile, 2 col on large tablets, 3 col on large desktop */
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {toDeliver.map(order => (
                  <DriverOrderCard 
                    key={order.id} 
                    order={order} 
                    onStatusChange={handleStatusChange} 
                  />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="history" className="outline-none">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {delivered.map(order => (
                <DriverOrderCard 
                  key={order.id} 
                  order={order} 
                  onStatusChange={handleStatusChange} 
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-slate-400 bg-white rounded-[2rem] border-2 border-dashed border-slate-200">
      <PackageCheck className="h-16 w-16 mb-4 opacity-10" />
      <p className="font-semibold text-lg">{message}</p>
      <p className="text-sm">Шинэ захиалга ирэхийг хүлээнэ үү</p>
    </div>
  );
}