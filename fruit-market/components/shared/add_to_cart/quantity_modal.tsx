"use client";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom"; // Import Portal
import { Plus, Minus, X } from "lucide-react";
import PopUpItem from "./pop_up_item";

interface QuantityModalProps {
  id:string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (quantity: number) => void;
}

export function QuantityModal({ id,isOpen, onClose, onConfirm }: QuantityModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [mounted, setMounted] = useState(false);

  // Ensure portal only runs on the client
  useEffect(() => {
    setMounted(true);
    if (isOpen) {
      document.body.style.overflow = "hidden"; // Disable background scrolling
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  if (!isOpen || !mounted) return null;

  // The Modal UI
  const modalContent = (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={(e) => {
        e.stopPropagation();
        onClose(); // Close when clicking the dark backdrop
      }}
    >
      <div 
        className="bg-white w-full max-w-sm rounded-3xl p-6 shadow-2xl animate-in fade-in zoom-in duration-200"
        onClick={(e) => e.stopPropagation()} // 2. PREVENT CLICK THROUGH: Stops clicks inside here from hitting things behind
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-slate-900">Тоо ширхэг</h3>
          <button 
            onClick={onClose} 
            className="p-2 hover:bg-stone-100 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <PopUpItem id={id} />
        

        <div className="flex items-center justify-between bg-stone-100 rounded-2xl p-2 border border-stone-200 mb-6">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="p-4 bg-white shadow-sm rounded-xl active:scale-95 transition-all"
          >
            <Minus size={20} />
          </button>
          
          <span className="text-2xl font-bold text-slate-900">{quantity}</span>
          
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="p-4 bg-white shadow-sm rounded-xl active:scale-95 transition-all"
          >
            <Plus size={20} />
          </button>
        </div>

        <button
          onClick={() => {
            onConfirm(quantity);
            setQuantity(1);
          }}
          className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-slate-800 transition-all active:scale-[0.98]"
        >
          Сагсанд нэмэх
        </button>
      </div>
    </div>
  );

  // 1. FULL SCREEN: Render into document.body instead of inside the Fruit Card
  return createPortal(modalContent, document.body);
}