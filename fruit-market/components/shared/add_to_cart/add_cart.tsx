"use client";
import { useState } from "react";
import {
  Plus,
  Minus,
  CheckCircle2,
  CreditCard,
  ShoppingCart,
} from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useCart } from "@/hooks/useCart";
import { QuantityModal } from "./quantity_modal";

interface AddCartProps {
  productId: string;
}

export default function AddCart({ productId }: AddCartProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const { addToCart } = useCart();

  const handleOpenModel = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsModalOpen(true);
  };

  const handleConfirmAdd = (quantity: number) => {
    addToCart(productId, quantity);
    setIsModalOpen(false);

    toast.success(`${quantity} ширхэгийг амжилттай сагслаа!`, {
      icon: <CheckCircle2 className="text-green-500" />,
    });
  };
  return (
    <>
      <div className="space-y-3">
        <div className="flex flex-col gap-2">
          <button
            onClick={handleOpenModel}
            className="w-full bg-white border border-slate-200 text-slate-900 py-3 rounded-xl text-sm font-semibold hover:bg-stone-50 transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            <ShoppingCart size={16} />
            Сагслах
          </button>
        </div>
      </div>

      {/* The Modal */}
      <QuantityModal
        id={productId}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmAdd}
      />
    </>
  );
}
