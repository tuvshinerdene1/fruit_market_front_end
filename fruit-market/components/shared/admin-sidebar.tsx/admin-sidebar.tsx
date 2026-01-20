"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Users, Package, Truck, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Хянах самбар", href: "/admin", icon: LayoutDashboard },
  { name: "Ажилчид", href: "/admin/workers", icon: Users },
  { name: "Бараа материал", href: "/admin/inventory", icon: Package },
  { name: "Хүргэлт", href: "/admin/delivery", icon: Truck },
];

interface SidebarProps {
  setOpen?: (open: boolean) => void;
}

export function AdminSidebar({ setOpen }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("currentWorker");
    router.push("/login");
  };

  return (
    <div className="flex h-full flex-col bg-slate-900 text-white">
      <div className="p-6">
        <h2 className="text-xl font-bold tracking-tight text-green-500 font-serif">
          Admin Panel
        </h2>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Button
              key={item.href}
              variant={isActive ? "secondary" : "ghost"}
              asChild
              className={cn(
                "w-full justify-start gap-3 rounded-xl px-3 py-6 transition-all",
                !isActive && "text-slate-400 hover:text-white hover:bg-slate-800"
              )}
              onClick={() => setOpen?.(false)} // Close drawer on mobile click
            >
              <Link href={item.href}>
                <item.icon className="h-5 w-5" />
                <span className="font-medium">{item.name}</span>
              </Link>
            </Button>
          );
        })}
      </nav>

      <div className="p-4 mt-auto border-t border-slate-800">
        <Button 
          variant="ghost" 
          className="w-full justify-start gap-3 text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded-xl"
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5" />
          Гарах
        </Button>
      </div>
    </div>
  );
}