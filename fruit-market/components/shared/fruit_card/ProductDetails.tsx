"use client"
import {
  DrawerClose,
  DrawerFooter,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Fruit } from "@/types/fruit";
import { LikeButton } from "../like_button/LikeButton";
import AddCart from "../add_to_cart/add_cart";

interface ProductDetailsProps {
  fruit: Fruit;
  autoFocusCart: boolean;
  onSuccess: () => void;
}

export default function ProductDetails({ fruit, autoFocusCart, onSuccess }: ProductDetailsProps) {
  return (
    <>
      <div className="flex-1 overflow-y-auto p-6 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="bg-stone-50 rounded-2xl p-8 flex justify-center items-center">
          <img
            src={fruit.image}
            alt={fruit.name}
            className="max-h-[250px] object-contain drop-shadow-lg"
          />
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-end">
            <p className="text-3xl font-bold text-slate-800">
              {fruit.price}₮
              <span className="text-base font-medium text-slate-400 ml-1">
                / {fruit.unit}
              </span>
            </p>
            <div className="mb-1">
              <LikeButton productId={fruit.id} />
            </div>
          </div>

          <hr className="border-slate-100" />

          <p className="text-slate-600 leading-relaxed">
            Freshly picked and delivered to your doorstep. Selected for peak
            ripeness.
          </p>
        </div>
      </div>

      <DrawerFooter className="pb-8 pt-4 border-t border-slate-100 bg-white z-10">
        <div className="w-full">
          <div className="mb-3">
            <AddCart
              productId={fruit.id}
              onSuccess={onSuccess}
              startOpen={autoFocusCart}
            />
          </div>
          <DrawerClose asChild>
            <Button variant="ghost" className="w-full">
              Close
            </Button>
          </DrawerClose>
        </div>
      </DrawerFooter>
    </>
  );
}