"use client";
import { useState, useEffect } from "react";
import { Plus, Minus, ShoppingCart, X } from "lucide-react";
import { toast } from "sonner";
import { useCart } from "@/hooks/useCart";

interface AddCartProps {
  productId: string;
  onSuccess?: () => void;
  startOpen?: boolean;
}

export default function AddCart({ productId, onSuccess, startOpen = false }: AddCartProps) {
  const [isSelecting, setIsSelecting] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    if (startOpen) setIsSelecting(true);
  }, [startOpen]);

  const handleConfirm = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(productId, quantity);
    toast.success("Added to cart successfully!");
    setIsSelecting(false);
    setQuantity(1);
    if (onSuccess) onSuccess();
  };

  if (!isSelecting) {
    return (
      <button
        onClick={(e) => { e.stopPropagation(); setIsSelecting(true); }}
        // Changed w-full to w-fit and mx-auto to center it
        className="w-fit mx-auto min-w-[140px] bg-[#FFF9E6] hover:bg-[#FFF2CC] text-amber-900/80 px-6 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 border border-amber-200/50 shadow-sm"
      >
        <ShoppingCart size={16} className="shrink-0 opacity-70" />
        <span>Add to Cart</span>
      </button>
    );
  }

  return (
    <div
      // Key Change: Removed w-full. Added w-fit, mx-auto, and min-w
      className="relative flex items-center justify-between bg-white/90 backdrop-blur-md rounded-2xl p-1 border border-amber-200/50 w-fit min-w-[160px] mx-auto overflow-hidden shadow-lg ring-1 ring-amber-100 animate-in fade-in zoom-in-95 duration-200"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Cancel */}
      <button
        onClick={(e) => { e.stopPropagation(); setIsSelecting(false); }}
        className="p-1.5 text-slate-400 hover:text-red-500 transition-colors"
      >
        <X size={16} />
      </button>

      {/* Quantity - Now tightly grouped */}
      <div className="flex items-center gap-2 px-2">
        <button
          onClick={(e) => { e.stopPropagation(); setQuantity(Math.max(1, quantity - 1)); }}
          className="p-1 bg-amber-50 rounded-lg hover:bg-amber-100 text-amber-700 border border-amber-100"
        >
          <Minus size={14} />
        </button>

        <span className="font-bold text-sm tabular-nums text-amber-950 min-w-[20px] text-center">
          {quantity}
        </span>

        <button
          onClick={(e) => { e.stopPropagation(); setQuantity(quantity + 1); }}
          className="p-1 bg-amber-50 rounded-lg hover:bg-amber-100 text-amber-700 border border-amber-100"
        >
          <Plus size={14} />
        </button>
      </div>

      {/* OK Button */}
      <button
        onClick={handleConfirm}
        className="bg-amber-600 text-white px-4 py-1.5 rounded-xl text-xs font-bold hover:bg-amber-700 transition-all shadow-sm active:scale-95"
      >
        OK
      </button>
    </div>
  );
}