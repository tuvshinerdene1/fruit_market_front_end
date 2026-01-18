"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, ShoppingCart, Truck, Home } from "lucide-react";
import { useCartCount } from "@/hooks/use_cart_count";
import { cn } from "@/lib/utils";

export default function MobileNav() {
  const pathname = usePathname();
  const cartCount = useCartCount();

  const items = [
    { name: "Нүүр", href: "/", icon: Home },
    { name: "Төлөв", href: "/order_status", icon: Truck },
    { name: "Хадгалсан", href: "/liked", icon: Heart },
    { name: "Сагс", href: "/cart", icon: ShoppingCart, isCart: true },
  ];

  return (
    <div className="sm:hidden fixed bottom-0 left-0 z-[100] w-full bg-white/80 backdrop-blur-lg border-t border-stone-100 pb-safe-area-inset-bottom">
      <div className="grid grid-cols-4 h-16">
        {items.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center gap-1 transition-colors",
                isActive ? "text-green-600" : "text-stone-400"
              )}
            >
              <div className="relative">
                <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                {item.isCart && cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-green-600 text-[9px] font-bold text-white ring-2 ring-white">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="text-[10px] font-bold">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}