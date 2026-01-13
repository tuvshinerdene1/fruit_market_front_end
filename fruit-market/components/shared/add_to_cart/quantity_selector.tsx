"use client";
import {Plus, Minus} from "lucide-react";
import React from "react";

interface QuantitySelectorProps{
    quantity : number,
    onIncrease : (e:React.MouseEvent) => void,
    onDecrease : (e:React.MouseEvent) => void,
}
export function QuantitySelector({ quantity, onIncrease, onDecrease }: QuantitySelectorProps) {
  const preventClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };
return (

    <div
      onClick={preventClick}
      className="flex items-center justify-between bg-stone-100 rounded-xl p-1 border border-stone-200/50"
    >
      <button
        onClick={onDecrease}
        className="p-2 hover:bg-white hover:shadow-sm rounded-lg transition-all active:scale-90"
      >
        <Minus size={16} className="text-slate-600" />
      </button>
      
      <span className="font-bold text-sm text-slate-900">{quantity}</span>
      
      <button
        onClick={onIncrease}
        className="p-2 hover:bg-white hover:shadow-sm rounded-lg transition-all active:scale-90"
      >
        <Plus size={16} className="text-slate-600" />
      </button>
    </div>
  );
}