"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Menu,
  Heart,
  ShoppingCart,
  Home,
  Apple,
  Gift,
  Info,
  Truck,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { useCartCount } from "@/hooks/use_cart_count";
import { cn } from "@/lib/utils";

export default function NavBar() {
  const cartCount = useCartCount();
  const pathname = usePathname();

  const navLinks = [
    { name: "Нүүр", href: "/", icon: Home },
    { name: "Жимс", href: "/fruit", icon: Apple },
    { name: "Сет жимс", href: "/bundle", icon: Gift },
    { name: "Бидний тухай", href: "/about", icon: Info },
  ];

  return (
    <nav className="absolute top-0 z-[100] w-full border-b border-stone-100 bg-white/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex h-24 items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="flex flex-col leading-none group shrink-0">
          <span className="text-xl font-black tracking-tighter text-slate-900 group-hover:text-green-600 transition-colors">
            SHINY FRUIT<span className="text-green-500">.MN</span>
          </span>
          <span className="text-[10px] uppercase tracking-[0.2em] text-stone-400 font-bold">
            Premium Fresh
          </span>
        </Link>

        {/* Desktop Nav (Center) */}
        <div className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-[13px] font-bold uppercase tracking-widest transition-all relative group",
                  isActive
                    ? "text-slate-900"
                    : "text-stone-500 hover:text-slate-900"
                )}
              >
                {link.name}
                <span
                  className={cn(
                    "absolute -bottom-1 left-0 h-0.5 bg-green-500 transition-all",
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  )}
                />
              </Link>
            );
          })}
        </div>

        {/* Actions - Visible on Desktop only */}
        <div className="flex items-center gap-0 sm:gap-1">
          <div className="hidden sm:flex items-center gap-1">
            {/* Order Status */}
            <Link
              href="/order_status"
              className={cn(
                "flex flex-col items-center justify-center w-16 h-16 rounded-2xl transition-all",
                pathname === "/order_status"
                  ? "text-green-600 bg-green-50"
                  : "text-slate-600 hover:bg-stone-50"
              )}
            >
              <Truck className="h-5 w-5 mb-1" strokeWidth={1.5} />
              <span className="text-[10px] font-bold uppercase tracking-tighter">
                Төлөв
              </span>
            </Link>

            {/* Liked */}
            <Link
              href="/liked"
              className={cn(
                "flex flex-col items-center justify-center w-16 h-16 rounded-2xl transition-all",
                pathname === "/liked"
                  ? "text-red-500 bg-red-50"
                  : "text-slate-600 hover:bg-stone-50"
              )}
            >
              <Heart className="h-5 w-5 mb-1" strokeWidth={1.5} />
              <span className="text-[10px] font-bold uppercase tracking-tighter">
                Хадгалсан
              </span>
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              className={cn(
                "flex flex-col items-center justify-center w-16 h-16 rounded-2xl transition-all relative",
                pathname === "/cart"
                  ? "text-green-600 bg-green-50"
                  : "text-slate-600 hover:bg-stone-50"
              )}
            >
              <div className="relative mb-1">
                <ShoppingCart className="h-5 w-5" strokeWidth={1.5} />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-green-600 text-[9px] font-bold text-white shadow-sm ring-2 ring-white">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="text-[10px] font-bold uppercase tracking-tighter">
                Сагс
              </span>
            </Link>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="lg:hidden ml-1">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-12 w-12 rounded-2xl hover:bg-stone-100"
                >
                  <Menu className="h-6 w-6 text-slate-900" />
                </Button>
              </SheetTrigger>

              <SheetContent
                side="right"
                className="w-[85%] sm:w-[380px] p-0 border-l-0 rounded-l-[32px] overflow-hidden"
              >
                <div className="flex flex-col h-full bg-white">
                  {/* Fixed Header */}
                  <div className="p-8 pb-6 border-b border-stone-50 bg-stone-50/50 shrink-0">
                    <SheetTitle className="text-left font-black text-2xl tracking-tight text-slate-900">
                      Цэс
                    </SheetTitle>
                    <p className="text-stone-400 text-xs font-medium uppercase tracking-widest mt-1">
                      Premium Fresh Fruit
                    </p>
                  </div>

                  {/* Scrollable Area */}
                  <div className="flex-1 overflow-y-auto">
                    <div className="px-4 py-6 flex flex-col gap-2">
                      {/* Navigation Links */}
                      {navLinks.map((link) => {
                        const isActive = pathname === link.href;
                        const Icon = link.icon;

                        return (
                          <SheetClose asChild key={link.href}>
                            <Link
                              href={link.href}
                              className={cn(
                                "flex items-center justify-between p-4 rounded-2xl transition-all duration-200 group",
                                isActive
                                  ? "bg-green-50 text-green-700"
                                  : "hover:bg-stone-50 text-slate-600"
                              )}
                            >
                              <div className="flex items-center gap-4">
                                <div
                                  className={cn(
                                    "p-2 rounded-xl transition-colors",
                                    isActive
                                      ? "bg-green-600 text-white"
                                      : "bg-stone-100 text-stone-400"
                                  )}
                                >
                                  <Icon size={18} />
                                </div>
                                <span className="font-bold text-lg">
                                  {link.name}
                                </span>
                              </div>
                              <ChevronRight
                                size={18}
                                className={cn(
                                  "transition-transform",
                                  isActive
                                    ? "text-green-600 translate-x-1"
                                    : "text-stone-300"
                                )}
                              />
                            </Link>
                          </SheetClose>
                        );
                      })}

                      {/* Contact Card - Moves up to follow links */}
                      <div className="mt-6 mx-2 p-8 bg-stone-900 text-white rounded-[24px] pb-[calc(env(safe-area-inset-bottom)+5rem)]">
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-xs font-bold uppercase tracking-tighter opacity-60">
                            Холбоо барих
                          </span>
                          <div className="h-[1px] flex-1 bg-white/10 ml-4"></div>
                        </div>
                        <p className="text-lg font-bold">7700-XXXX</p>
                        <p className="text-sm text-stone-400">
                          Өдөр бүр 09:00 - 21:00
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}