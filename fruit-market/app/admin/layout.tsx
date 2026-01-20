"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Import the router
import { AdminSidebar } from "@/components/shared/admin-sidebar.tsx/admin-sidebar";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, Loader2 } from "lucide-react";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false); // Auth state
  const router = useRouter();

  useEffect(() => {
    // 1. Check LocalStorage for worker info
    const storedWorker = localStorage.getItem("currentWorker");
    
    if (!storedWorker) {
      // 2. If no data, redirect to login
      router.push("/login");
    } else {
      try {
        const worker = JSON.parse(storedWorker);
        // 3. Optional: Verify if the user is actually an 'admin'
        if (worker.role !== "admin") {
          router.push("/login"); // Or a "Not Authorized" page
        } else {
          setIsAuthorized(true);
        }
      } catch (error) {
        localStorage.removeItem("currentWorker");
        router.push("/login");
      }
    }
  }, [router]);

  // 4. While checking, show a blank screen or a loading spinner 
  // to prevent "flickering" of admin content
  if (!isAuthorized) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="h-8 w-8 animate-spin text-green-600" />
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      {/* DESKTOP SIDEBAR */}
      <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
        <AdminSidebar />
      </div>

      {/* MOBILE HEADER */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-slate-900 flex items-center px-4 z-40 border-b border-slate-800">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" className="text-white p-0 hover:bg-transparent">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 bg-slate-900 border-none w-64">
            <SheetHeader>
              <VisuallyHidden.Root>
                <SheetTitle>Цэс</SheetTitle>
              </VisuallyHidden.Root>
            </SheetHeader>
            <AdminSidebar setOpen={setOpen} />
          </SheetContent>
        </Sheet>
        <span className="ml-4 text-green-500 font-serif font-bold">Admin Panel</span>
      </div>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 overflow-y-auto p-4 md:p-8 pt-20 lg:pt-8 lg:ml-64">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}