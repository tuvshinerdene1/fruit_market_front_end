"use client";
import {
  ShoppingCart,
} from "lucide-react";
import { Fruit } from "@/types/fruit";
import { LikeButton } from "../like_button/LikeButton";

interface FruitGridItemProps {
  fruit: Fruit;
  onClick: () => void;
  onQuickAdd: (e: React.MouseEvent) => void;
}

export default function FruitGridItem({
  fruit,
  onClick,
  onQuickAdd,
}: FruitGridItemProps) {
  return (
    <div
      onClick={onClick}
      className="group bg-white items-center rounded-2xl overflow-hidden border border-slate-100 cursor-pointer transition-all hover:shadow-xl hover:border-amber-200"
    >
      <div className="relative aspect-square bg-slate-100">
        <img
          src={fruit.image}
          alt={fruit.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <div className="p-4 text-center">
        <h3 className="font-bold text-slate-800">{fruit.name}</h3>
        <p className="text-lg font-black text-amber-600">{fruit.price}₮</p>
      </div>
      <div className="flex items-center justify-center gap-2 w-full p-4 pt-0">
        <div className="flex-[3]">
          {/* Fake button that triggers the drawer in 'Select Mode' */}
          <button
            onClick={onQuickAdd}
            className="w-full bg-[#FFF9E6] hover:bg-[#FFF2CC] text-amber-900/80 py-2.5 sm:py-3 rounded-2xl text-[10px] xs:text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-1 sm:gap-2 border border-amber-200/50 shadow-sm"
          >
            <ShoppingCart size={14} className="shrink-0 opacity-70" />
            <span className="truncate">Add to Cart</span>
          </button>
        </div>
        <div className="flex-1 flex justify-center">
          <div onClick={(e) => e.stopPropagation()}>
            <LikeButton productId={fruit.id} />
          </div>
        </div>
      </div>
    </div>
  );
}
