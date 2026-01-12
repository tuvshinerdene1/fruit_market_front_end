"use client";
import { useState } from "react";
import { Plus, Minus, CheckCircle2, CreditCard } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation"; // To handle redirect

interface AddCartProps {
  productId: string;
}

export default function AddCart({ productId }: AddCartProps) {
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();

  const adjustQuantity = (amount: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setQuantity((prev) => Math.max(1, prev + amount));
  };

  // Shared logic for updating localStorage
  const saveToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingItemIndex = cart.findIndex((item: any) => item.id === productId);
    let newCart = [...cart];

    if (existingItemIndex !== -1) {
      newCart[existingItemIndex].quantity += quantity;
    } else {
      newCart.push({ id: productId, quantity: quantity });
    }

    localStorage.setItem("cart", JSON.stringify(newCart));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    saveToCart();
    
    toast.success(`${quantity} ширхэгийг амжилттай сагслаа!`, {
      icon: <CheckCircle2 className="text-green-500" />,
    });
    setQuantity(1);
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // 1. Save the quantity chosen
    saveToCart();
    
    // 2. Immediate redirect to checkout
    router.push("/cart");
  };

  return (
    <div className="space-y-3">
      {/* Quantity Selector */}
      <div className="flex items-center justify-between bg-stone-100 rounded-xl p-1 border border-stone-200/50">
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

        {/* Buy Now - Direct to Checkout */}
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