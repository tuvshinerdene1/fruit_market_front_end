"use client";
import { useState, useEffect } from "react";
import { Plus, Minus, ShoppingCart, X } from "lucide-react";
import { toast } from "sonner";
import { useCart } from "@/hooks/useCart"; 

interface AddCartProps {
  productId: string;
  onSuccess?: () => void;
  startOpen?: boolean; // New Prop
}

export default function AddCart({ productId, onSuccess, startOpen = false }: AddCartProps) {
  const [isSelecting, setIsSelecting] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  // If startOpen is passed as true, immediately enter selection mode
  useEffect(() => {
    if (startOpen) {
      setIsSelecting(true);
    }
  }, [startOpen]);

  const handleConfirm = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    addToCart(productId, quantity);
    toast.success("Added to cart successfully!");
    
    setIsSelecting(false);
    setQuantity(1);

    if (onSuccess) onSuccess();
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
        <span className="truncate">Add to Cart</span>
      </button>
    );
  }

  return (
    <div
      className="relative flex items-center justify-between bg-white/60 backdrop-blur-md rounded-2xl p-0.5 sm:p-1 border border-amber-200/50 w-full overflow-hidden shadow-sm ring-1 ring-amber-100"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        onClick={handleCancel}
        className="absolute left-1 top-1/2 -translate-y-1/2 xs:static xs:translate-y-0 p-1 text-slate-400 hover:text-red-400 transition-colors z-10"
      >
        <X size={14} />
      </button>

      <div className="flex items-center justify-center gap-2 flex-1 pl-6 xs:pl-0">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setQuantity(Math.max(1, quantity - 1));
          }}
          className="p-1.5 bg-white rounded-lg shadow-sm hover:bg-slate-50 text-amber-700 border border-amber-100"
        >
          <Minus size={14} />
        </button>

        <span className="font-bold text-sm min-w-[20px] text-center text-amber-950">
          {quantity}
        </span>

        <button
          onClick={(e) => {
            e.stopPropagation();
            setQuantity(quantity + 1);
          }}
          className="p-1.5 bg-white rounded-lg shadow-sm hover:bg-slate-50 text-amber-700 border border-amber-100"
        >
          <Plus size={14} />
        </button>
      </div>

      <button
        onClick={handleConfirm}
        className="bg-amber-600 text-black px-3 py-2 rounded-xl text-xs font-bold hover:bg-amber-700 transition-all ml-1 shrink-0 shadow-md"
      >
        OK
      </button>
    </div>
  );
}