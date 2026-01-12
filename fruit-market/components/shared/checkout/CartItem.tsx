"use client";

import { Minus, Plus, Trash2 } from "lucide-react";
import { MOCK_FRUITS, MOCK_BUNDLES } from "@/mock_data/mock_bundle";

interface CartItemProps {
  id: string;
  quantity: number;
}

export default function CartItem({ id, quantity }: CartItemProps) {
  // 1. Find the product details from your mock data
  const product = [...MOCK_FRUITS, ...MOCK_BUNDLES].find((p) => p.id === id);

  if (!product) return null;

  // 2. Update logic (Mirroring your AddCart logic)
  const updateLocalCart = (newQty: number) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    let newCart;

    if (newQty <= 0) {
      newCart = cart.filter((item: any) => item.id !== id);
    } else {
      newCart = cart.map((item: any) =>
        item.id === id ? { ...item, quantity: newQty } : item
      );
    }

    localStorage.setItem("cart", JSON.stringify(newCart));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const removeItem = () => updateLocalCart(0);

  return (
    <div className="flex items-center gap-4 py-4 border-b border-stone-100 last:border-0 group">
      {/* Product Image */}
      <div className="h-20 w-20 rounded-2xl bg-stone-50 overflow-hidden flex-shrink-0 border border-stone-100">
        <img 
          src={product.image} 
          alt={product.name} 
          className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500" 
        />
      </div>

      {/* Info & Controls */}
      <div className="flex-1 flex flex-col justify-between h-20 py-1">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-slate-900 text-sm leading-tight">
              {product.name}
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              {product.price.toLocaleString()}₮ / ширхэг
            </p>
          </div>
          
          <button 
            onClick={removeItem}
            className="text-stone-300 hover:text-red-500 transition-colors p-1"
          >
            <Trash2 size={16} />
          </button>
        </div>

        <div className="flex items-center justify-between mt-auto">
          {/* Minimalist Quantity Control */}
          <div className="flex items-center bg-stone-100 rounded-lg p-0.5 border border-stone-200/50 scale-90 -ml-2">
            <button
              onClick={() => updateLocalCart(quantity - 1)}
              className="p-1.5 hover:bg-white rounded-md transition-all text-slate-600"
            >
              <Minus size={14} />
            </button>
            <span className="w-8 text-center text-xs font-bold text-slate-900">
              {quantity}
            </span>
            <button
              onClick={() => updateLocalCart(quantity + 1)}
              className="p-1.5 hover:bg-white rounded-md transition-all text-slate-600"
            >
              <Plus size={14} />
            </button>
          </div>

          {/* Line Total */}
          <span className="font-bold text-slate-900 text-sm">
            {(product.price * quantity).toLocaleString()}₮
          </span>
        </div>
      </div>
    </div>
  );
}