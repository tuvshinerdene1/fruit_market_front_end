"use client";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Zap, X } from "lucide-react";

import { Fruit } from "@/types/fruit";
import Link from "next/link";
import { LikeButton } from "../like_button/LikeButton";
import AddCart from "../add_to_cart/add_cart";
interface FruitCardProps {
  fruit: Fruit;
}

export default function FruitCard({ fruit }: FruitCardProps) {
  return (
    <Drawer>
      {/* 1. The Trigger:Card layout */}
      <DrawerTrigger asChild>
        <div className="group bg-white items-center rounded-2xl overflow-hidden border border-slate-100 cursor-pointer transition-all hover:shadow-xl">
          <div className="relative aspect-square bg-slate-100">
            <img
              src={fruit.image}
              alt={fruit.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-4 text-center">
            <h3 className="font-bold">{fruit.name}</h3>
            <p className="text-lg font-black">{fruit.price}₮</p>
          </div>
          <div className="flex items-center justify-center gap-2 w-full p-4">
            <div className="flex-[3]">
              <AddCart productId={fruit.id} />
            </div>
            <div className="flex-1">
              <LikeButton productId={fruit.id} />
            </div>
          </div>
        </div>
      </DrawerTrigger>

      {/* 2. The Pop-up (Drawer) Content */}
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm md:max-w-2xl">
          <DrawerHeader className="relative">
            {/* Small visual handle at the top is automatic with Shadcn Drawer */}
            <DrawerTitle className="text-2xl font-serif text-center md:text-left">
              {fruit.name}
            </DrawerTitle>
          </DrawerHeader>

          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left: Image */}
            <div className="bg-stone-50 rounded-2xl p-4 flex justify-center">
              <img src={fruit.image} className="max-h-[300px] object-contain" />
            </div>

            {/* Right: Info */}
            <div className="space-y-4">
              <p className="text-2xl font-bold text-slate-800">
                {fruit.price}₮{" "}
                <span className="text-sm font-normal text-slate-500">
                  / {fruit.unit}
                </span>
              </p>
              <p className="text-slate-500 text-sm leading-relaxed">
                Freshly picked and delivered to your doorstep. Selected for peak
                ripeness.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3 pt-4">
                <div className="flex items-center gap-2 w-full p-4">
                  {/* On small screens (iPhone XR), we allow the AddCart to grow 
      but keep the LikeButton at a fixed small size 
  */}
                  <div className="flex-grow min-w-0">
                    <AddCart productId={fruit.id} />
                  </div>
                  <div className="flex-shrink-0">
                    <LikeButton productId={fruit.id} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <DrawerFooter className="pb-10">
            <DrawerClose asChild>
              <Button variant="ghost">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
