"use client";
import { useState, useEffect } from "react";
import { ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";

interface CartedButtonProps {
  productId: String;
}

export default function AddCart({ productId }: CartedButtonProps) {
  const [isCarted, setIsCarted] = useState(false);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    setIsCarted(cart.includes(productId));
  }, [productId]);

  const toggleCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    let newCart;

    if (isCarted) {
      newCart = cart.filter((id: string) => id !== productId);
    } else {
      newCart = [...cart, productId];
    }

    localStorage.setItem("cart", JSON.stringify(newCart));
    setIsCarted(!isCarted);

    window.dispatchEvent(new Event("cartUpdated"));
  };

  return (
    <div onClick={toggleCart} className="mt-4 w-full bg-slate-900 text-white py-2 rounded-xl text-sm font-semibold hover:bg-green-600 transition-colors">
      {!isCarted ? "Сагслах" : "Сагснаас хасах"}
    </div>
  );
}
