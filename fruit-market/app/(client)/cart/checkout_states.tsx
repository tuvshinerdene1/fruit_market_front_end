import Link from "next/link";
import { CheckCircle2, ShoppingBag } from "lucide-react";

export function SuccessView() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 animate-in fade-in zoom-in duration-500">
      <div className="max-w-md w-full text-center space-y-8 bg-white p-10 rounded-[3rem] shadow-2xl shadow-stone-200 border border-stone-100">
        <div className="relative mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center animate-bounce">
          <CheckCircle2 size={40} className="text-green-600" />
        </div>
        <div className="space-y-2">
          <h2 className="text-3xl font-black text-slate-900">Баярлалаа!</h2>
          <p className="text-stone-500 text-sm">
            Таны захиалгыг хүлээн авлаа. Бид удахгүй холбогдоно.
          </p>
        </div>
        <Link
          href="/"
          className="block w-full bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-green-600 transition-all"
        >
          Нүүр хуудас руу буцах
        </Link>
      </div>
    </div>
  );
}

export function EmptyCartView() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <div className="bg-stone-100 p-6 rounded-full mb-6 text-stone-300">
        <ShoppingBag size={48} />
      </div>
      <h2 className="text-2xl font-bold text-slate-900">Таны сагс хоосон байна</h2>
      <Link
        href="/"
        className="mt-8 bg-slate-900 text-white px-8 py-3 rounded-2xl font-semibold"
      >
        Дэлгүүр рүү буцах
      </Link>
    </div>
  );
}