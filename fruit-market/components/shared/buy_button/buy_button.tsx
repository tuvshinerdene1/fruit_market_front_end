"use client"
import { ShoppingCart } from "lucide-react";

interface BuyButtonProps {
    productId: string[];
}

export default function BuyButton() {
  return (
    <div>
      <div className="mt-4 w-full bg-slate-900 text-white py-2 rounded-xl text-sm font-semibold hover:bg-green-600 transition-colors">
        Buy now
      </div>
    </div>
  );
}
