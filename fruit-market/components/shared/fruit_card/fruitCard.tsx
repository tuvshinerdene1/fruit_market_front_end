"use client";

import { useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Fruit } from "@/types/fruit";
import FruitGridItem from "./fruitGridItem";
import ProductDetails from "./ProductDetails";
import SuccessMessage from "./SuccessMessage";

interface FruitCardProps {
  fruit: Fruit;
}

export default function FruitCard({ fruit }: FruitCardProps) {
  const [view, setView] = useState<"INFO" | "CART">("INFO");
  const [isOpen, setIsOpen] = useState(false);
  const [autoFocusCart, setAutoFocusCart] = useState(false);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      // Small delay to reset state so the user doesn't see it flicker while closing
      setTimeout(() => {
        setView("INFO");
        setAutoFocusCart(false);
      }, 300);
    }
  };

  const handleCardClick = () => {
    setAutoFocusCart(false);
    setIsOpen(true);
  };

  const handleDirectAddClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setAutoFocusCart(true);
    setIsOpen(true);
  };

  return (
    <Drawer direction="right" open={isOpen} onOpenChange={handleOpenChange}>
      
      {/* 1. Trigger */}
      <FruitGridItem 
        fruit={fruit} 
        onClick={handleCardClick} 
        onQuickAdd={handleDirectAddClick} 
      />

      {/* 2. Drawer Content */}
      <DrawerContent className="h-full w-full md:w-[450px] mt-0 rounded-none fixed right-0 top-0 bg-white">
        <div className="mx-auto w-full h-full flex flex-col">
          <DrawerHeader className="relative shrink-0">
            <DrawerTitle className="text-2xl font-serif text-center md:text-left">
              {view === "INFO" ? fruit.name : "Added to Cart"}
            </DrawerTitle>
          </DrawerHeader>

          {/* 3. Conditional Views */}
          {view === "INFO" ? (
            <ProductDetails
              fruit={fruit}
              autoFocusCart={autoFocusCart}
              onSuccess={() => setView("CART")}
            />
          ) : (
            <SuccessMessage onClose={() => setIsOpen(false)} />
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
}