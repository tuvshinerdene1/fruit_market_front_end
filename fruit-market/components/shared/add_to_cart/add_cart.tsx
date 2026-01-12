"use client";
import { useState } from "react";
import { Plus, Minus, CheckCircle2 } from "lucide-react";
import { toast } from "sonner"; // Recommended: 'sonner' for nice premium alerts

interface AddCartProps {
  productId: string;
}

export default function AddCart({ productId }: AddCartProps) {
  const [quantity, setQuantity] = useState(1);

  const adjustQuantity = (amount: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Prevent quantity from going below 1
    setQuantity((prev) => Math.max(1, prev + amount));
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // 1. Get current cart
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    
    // 2. Find if item exists to increment, or add new
    const existingItemIndex = cart.findIndex((item: any) => item.id === productId);
    let newCart = [...cart];

    if (existingItemIndex !== -1) {
      newCart[existingItemIndex].quantity += quantity;
    } else {
      newCart.push({ id: productId, quantity: quantity });
    }

    // 3. Save to storage
    localStorage.setItem("cart", JSON.stringify(newCart));
    
    // 4. Dispatch event for Navbar/Cart Drawer
    window.dispatchEvent(new Event("cartUpdated"));

    // 5. Nice Alert (Using a simple alert or a library like 'sonner')
    // If you don't have 'sonner' installed, you can use a simple state-based alert
    toast.success(`${quantity} ширхэгийг амжилттай сагслаа!`, {
      icon: <CheckCircle2 className="text-green-500" />,
      style: { borderRadius: '12px', padding: '16px' }
    });

    // 6. Reset component to initial state
    setQuantity(1);
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

      {/* Action Button */}
      <button 
        onClick={handleAddToCart} 
        className="w-full bg-slate-900 text-white py-3 rounded-xl text-sm font-semibold hover:bg-green-600 transition-all active:scale-95 flex items-center justify-center gap-2"
      >
        Сагслах
      </button>
    </div>
  );
}