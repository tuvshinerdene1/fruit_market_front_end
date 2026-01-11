"use client";

import Link from "next/link";
import { Menu, Heart, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { SearchBar } from "../searchbar/searchbar";

export default function NavBar() {
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Fruits", href: "/fruit" },
    { name: "Bundles", href: "/bundle" },
    { name: "About us", href: "/about" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between px-4">
        {/*Logo */}
        <Link href={"/"} className="text-xl font-bold text-green-600">
          Fruit Market.mn
        </Link>
        <SearchBar></SearchBar>
        <Button
          variant={"ghost"}
          size={"icon"}
          className="rounded-full hover:bg-red-50 hover:text-red-600 transition-colors"
        >
          <Heart className="h-5 w-5" />
          <span className="sr-only">Wishlist</span>
        </Button>
        <Button
          variant={"ghost"}
          size={"icon"}
          className="rounded-full hover:bg-red-50 hover:text-red-600 transition-colors"
        >
          <ShoppingCart className="h-5 w-5" />
          <span className="sr-only">ShoppingCart</span>
        </Button>
        {/*Desktop nav */}

        <div className="hidden md:flex gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium hover:text-green-600"
            >
              {link.name}
            </Link>
          ))}
        </div>
        {/*Mobile nav */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant={"ghost"} size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <SheetDescription className="sr-only">
                Access main pages of the Fruit Market
              </SheetDescription>
              <div className="flex flex-col gap-4 mt-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-lg font-bold hover:text-green-600 transition"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
