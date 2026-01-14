"use client";
import { useState } from "react";
import { Plus, Minus, ShoppingCart, X } from "lucide-react";
import { toast } from "sonner";
import { useCart } from "@/hooks/useCart";

export default function AddCart({ productId }: { productId: string }) {
  const [isSelecting, setIsSelecting] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const handleConfirm = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(productId, quantity);
    toast.success("Амжилттай сагслаа!");
    setIsSelecting(false);
    setQuantity(1);
  };

  const handleCancel = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsSelecting(false);
    setQuantity(1);
  };

  if (!isSelecting) {
    return (
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsSelecting(true);
        }}
        className="w-full bg-[#FFF9E6] hover:bg-[#FFF2CC] text-amber-900/80 py-2.5 sm:py-3 rounded-2xl text-[10px] xs:text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-1 sm:gap-2 border border-amber-200/50 shadow-sm"
      >
        <ShoppingCart size={14} className="shrink-0 opacity-70" />
        <span className="truncate">Сагслах</span>
      </button>
    );
  }

  return (
    <div
      className="relative flex items-center justify-between bg-white/60 backdrop-blur-md rounded-2xl p-0.5 sm:p-1 border border-white/60 w-full overflow-hidden shadow-sm"
      onClick={(e) => e.stopPropagation()}
    >
      {/* 1. Cancel button: Positioned absolutely on tiny screens to save row space */}
      <button
        onClick={handleCancel}
        className="absolute left-1 top-1/2 -translate-y-1/2 xs:static xs:translate-y-0 p-1 text-slate-400 hover:text-red-400 transition-colors z-10"
      >
        <X size={12} className="sm:w-4 sm:h-4" />
      </button>

      {/* 2. Main controls container: Added pl-6 on tiny screens to clear the X button */}
      <div className="flex items-center gap-0.5 sm:gap-1.5 pl-6 xs:pl-0">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setQuantity(Math.max(1, quantity - 1));
          }}
          className="p-1 sm:p-2 bg-white/90 rounded-xl shadow-sm hover:bg-white text-amber-700 border border-amber-100/50"
        >
          <Minus size={12} className="sm:w-4 sm:h-4" />
        </button>

        <span className="font-bold text-[10px] sm:text-base min-w-[18px] text-center text-amber-900/80">
          {quantity}
        </span>

        <button
          onClick={(e) => {
            e.stopPropagation();
            setQuantity(quantity + 1);
          }}
          className="p-1 sm:p-2 bg-white/90 rounded-xl shadow-sm hover:bg-white text-amber-700 border border-amber-100/50"
        >
          <Plus size={12} className="sm:w-4 sm:h-4" />
        </button>
      </div>

      <button
        onClick={handleConfirm}
        className="bg-amber-800/90 text-amber-50 px-2 py-1.5 sm:px-4 sm:py-2 rounded-xl text-[10px] sm:text-xs font-bold hover:bg-amber-900 transition-all ml-1 shrink-0"
      >
        OK
      </button>
    </div>
  );
}