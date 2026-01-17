"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, Heart, ShoppingCart, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { isHmrRefresh } from "next/dist/server/app-render/work-unit-async-storage.external";

export default function NavBar() {
  const [cartCount, setCartCount] = useState(0);

  // Sync Cart Count
  const updateCount = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const total = cart.reduce((acc: number, item: any) => acc + item.quantity, 0);
    setCartCount(total);
  };

  useEffect(() => {
    updateCount();
    window.addEventListener("cartUpdated", updateCount);
    return () => window.removeEventListener("cartUpdated", updateCount);
  }, []);

  const navLinks = [
    { name: "Нүүр", href: "/" },
    { name: "Жимс", href: "/fruit" },
    { name: "Сет жимс", href: "/bundle" },
    { name: "Бидний тухай", href: "/about" },
    {name: "Захиалгын төлөв", href: "/order_status"}
  ];

  return (
    <nav className="sticky top-0 z-[100] w-full border-b border-stone-100 bg-white/70 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex h-20 items-center justify-between px-6">
        
        {/* Logo - Elegant & Clean */}
        <Link href="/" className="flex flex-col leading-none group">
          <span className="text-xl font-black tracking-tighter text-slate-900 group-hover:text-green-600 transition-colors">
            SHINY FRUIT<span className="text-green-500">.MN</span>
          </span>
          <span className="text-[10px] uppercase tracking-[0.2em] text-stone-400 font-bold">Premium Fresh</span>
        </Link>

        {/* Desktop Nav - Centered & Spaced */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[13px] font-bold uppercase tracking-widest text-stone-500 hover:text-slate-900 transition-all relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-500 transition-all group-hover:w-full" />
            </Link>
          ))}
        </div>

        {/* Action Icons */}
        <div className="flex items-center gap-2">
          
          <Link
            href="/liked"
            className="p-3 rounded-full hover:bg-stone-50 transition-colors relative"
          >
            <Heart className="h-5 w-5 text-slate-700" strokeWidth={1.5} />
          </Link>

          <Link
            href="/cart"
            className="p-3 rounded-full hover:bg-stone-50 transition-colors relative group"
          >
            <ShoppingCart className="h-5 w-5 text-slate-700 group-hover:text-green-600 transition-colors" strokeWidth={1.5} />
            {cartCount > 0 && (
              <span className="absolute top-2 right-2 flex h-4 w-4 items-center justify-center rounded-full bg-green-600 text-[9px] font-bold text-white animate-in zoom-in">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Mobile Menu Trigger */}
          <div className="md:hidden ml-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Menu className="h-6 w-6 text-slate-900" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <SheetTitle className="text-left font-black text-2xl mb-8">Цэс</SheetTitle>
                <div className="flex flex-col gap-6">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-2xl font-bold text-slate-900 hover:text-green-600 transition"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}