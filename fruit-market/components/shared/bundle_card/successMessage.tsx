"use client";
import Link from "next/link";
import {
  CheckCircle,
  ArrowRight,
  ShoppingBag,
} from "lucide-react";
import {
  DrawerFooter,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
interface SuccessMessageProps {
  onClose: () => void;
}

export default function SuccessMessage({ onClose }: SuccessMessageProps) {
  return (
    <>
      <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6 animate-in zoom-in-95 duration-300 p-6">
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-4">
          <CheckCircle size={48} />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-slate-800">
            Амжилттай сагсанд хийлээ!
          </h2>
        </div>
      </div>

      <DrawerFooter className="pb-8 pt-4 border-t border-slate-100 bg-white z-10">
        <div className="flex flex-col gap-3 w-full">
          <Link href="/cart" className="w-full">
            <Button
              className="w-full gap-2 bg-slate-900 hover:bg-slate-800"
              size="lg"
            >
              <ShoppingBag size={18} />
              Сагс харах
            </Button>
          </Link>
          <Button
            variant="outline"
            size="lg"
            onClick={onClose}
            className="w-full gap-2"
          >
            Үргэлжлүүлэн сонгох <ArrowRight size={16} />
          </Button>
        </div>
      </DrawerFooter>
    </>
  );
}