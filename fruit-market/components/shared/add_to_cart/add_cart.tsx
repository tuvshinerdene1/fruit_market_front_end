"use client";
import { useState } from "react";
import { Plus, Minus, CheckCircle2, CreditCard } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
// 1. Import the hook
import { useCart } from "@/hooks/useCart";

interface AddCartProps {
  productId: string;
}

export default function AddCart({ productId }: AddCartProps) {
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();
  
  // 2. Destructure the function from the hook
  const { addToCart } = useCart(); 

  const preventClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const adjustQuantity = (amount: number, e: React.MouseEvent) => {
    preventClick(e);
    setQuantity((prev) => Math.max(1, prev + amount));
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    preventClick(e);
    
    // 3. Use the hook function instead of writing logic here
    addToCart(productId, quantity);

    toast.success(`${quantity} ширхэгийг амжилттай сагслаа!`, {
      icon: <CheckCircle2 className="text-green-500" />,
    });
    setQuantity(1);
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    preventClick(e);

    // 4. Use the hook here too
    addToCart(productId, quantity);

    // Redirect
    router.push("/cart"); // Ensure this matches your page path
  };

  return (
    <div className="space-y-3">
      {/* Quantity Selector */}
      <div
        onClick={preventClick}
        className="flex items-center justify-between bg-stone-100 rounded-xl p-1 border border-stone-200/50"
      >
        <button
          onClick={(e) => adjustQuantity(-1, e)}
          className="p-2 hover:bg-white hover:shadow-sm rounded-lg transition-all active:scale-90"
        >
          <Minus size={16} className="text-slate-600" />
        </button>
        <span className="font-bold text-sm text-slate-900">{quantity}</span>
        <button
          onClick={(e) => adjustQuantity(1, e)}
          className="p-2 hover:bg-white hover:shadow-sm rounded-lg transition-all active:scale-90"
        >
          <Plus size={16} className="text-slate-600" />
        </button>
      </div>

      <div className="flex flex-col gap-2">
        {/* Add to Cart */}
        <button
          onClick={handleAddToCart}
          className="w-full bg-white border border-slate-200 text-slate-900 py-3 rounded-xl text-sm font-semibold hover:bg-stone-50 transition-all active:scale-95 flex items-center justify-center gap-2"
        >
          Сагслах
        </button>

        {/* Buy Now */}
        <button
          onClick={handleBuyNow}
          className="w-full bg-slate-900 text-white py-3 rounded-xl text-sm font-bold hover:bg-green-600 transition-all active:scale-95 flex items-center justify-center gap-2"
        >
          <CreditCard size={16} />
          Шууд авах
        </button>
      </div>
    </div>
  );
}