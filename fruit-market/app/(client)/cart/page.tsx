"use client";
import { useState, useEffect } from "react";
import CartItem from "@/components/shared/checkout/CartItem";
import { MOCK_FRUITS, MOCK_BUNDLES } from "@/mock_data/mock_bundle";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import Link from "next/link";

export default function CheckoutList() {
  const [cartItems, setCartItems] = useState<
    { id: string; quantity: number }[]
  >([]);
  const allProducts = [...MOCK_FRUITS, ...MOCK_BUNDLES];

  const loadCart = () => {
    const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(savedCart);
  };

  useEffect(() => {
    loadCart();
    window.addEventListener("cartUpdated", loadCart);
    return () => window.removeEventListener("cartUpdated", loadCart);
  }, []);

  const subtotal = cartItems.reduce((acc, item) => {
    const product = allProducts.find((p) => p.id === item.id);
    return acc + (product ? product.price * item.quantity : 0);
  }, 0);

  const deliveryFee = subtotal > 50000 ? 0 : 5000;
  const totalAmount = subtotal + deliveryFee;

  // EMPTY STATE - Also made to fill the screen
  if (cartItems.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
        <div className="bg-stone-100 p-6 rounded-full mb-6">
          <ShoppingBag className="w-12 h-12 text-stone-300" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900">
          Таны сагс хоосон байна
        </h2>
        <p className="text-stone-500 mt-2 max-w-xs">
          Танд одоогоор сонгосон жимс алга байна. Манай шинэ ургацын жимснүүдээс
          сонирхоорой.
        </p>
        <Link
          href="/"
          className="mt-8 bg-slate-900 text-white px-8 py-3 rounded-2xl font-semibold hover:bg-slate-800 transition-all"
        >
          Дэлгүүр рүү буцах
        </Link>
      </div>
    );
  }

  return (
    /* flex-grow ensures this container pushes the footer down */
    <div className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center gap-2 mb-8 group cursor-pointer">
        <Link
          href="/"
          className="flex items-center gap-2 text-stone-500 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft
            size={18}
            className="group-hover:-translate-x-1 transition-transform"
          />
          <span className="text-sm font-medium">
            Үргэлжлүүлэн худалдан авалт хийх
          </span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* 1. List of Items (Takes 7/12 of space) */}
        <div className="lg:col-span-7 xl:col-span-8">
          <div className="flex items-baseline justify-between mb-8 border-b border-stone-100 pb-4">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
              Миний сагс
            </h2>
            <span className="text-stone-400 font-medium">
              {cartItems.length - 1 > 0 ? (
                <div>{cartItems.length - 1} бүтээгдэхүүн</div>
              
              ):(
                <div>Бүтээгдэхүүн сонгоогүй байна.</div>
              )}
            </span>
          </div>

          <div className="divide-y divide-stone-100">
            {cartItems.map((item, index) => (
              <CartItem
                key={item.id || `fallback-${index}`}
                id={item.id}
                quantity={item.quantity}
              />
            ))}
          </div>
        </div>

        {/* 2. Total Summary Section (Takes 5/12 of space) */}
        <div className="lg:col-span-5 xl:col-span-4">
          <div className="sticky top-28 bg-white border border-stone-200 shadow-sm rounded-[2rem] p-8">
            <h3 className="text-xl font-bold text-slate-900 mb-6">
              Захиалгын мэдээлэл
            </h3>

            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-stone-600">
                <span className="font-medium">Барааны дүн</span>
                <span className="font-bold">{subtotal.toLocaleString()}₮</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span className="font-medium">Хүргэлт</span>
                <span
                  className={`font-bold ${
                    deliveryFee === 0 ? "text-green-600" : ""
                  }`}
                >
                  {deliveryFee === 0
                    ? "Үнэгүй"
                    : `+${deliveryFee.toLocaleString()}₮`}
                </span>
              </div>
              {deliveryFee > 0 && (
                <p className="text-[11px] bg-green-50 text-green-700 p-2 rounded-lg">
                  💡 <b>{(50000 - subtotal).toLocaleString()}₮</b>-ийн худалдан
                  авалт нэмээд <b>Үнэгүй хүргүүлээрэй!</b>
                </p>
              )}
            </div>

            <div className="pt-6 border-t border-stone-100 mb-8">
              <div className="flex justify-between items-center">
                <span className="text-slate-500 font-medium">
                  Нийт төлөх дүн
                </span>
                <span className="text-3xl font-black text-slate-900 tracking-tighter">
                  {totalAmount.toLocaleString()}₮
                </span>
              </div>
            </div>
            {subtotal === 0 ? (
              <div className="w-full bg-slate-300 text-white py-6 rounded-2xl font-bold cursor-not-allowed text-center text-lg">
                Захиалга баталгаажуулах
              </div>
            ) : (
              <Link href="/checkout/">
                <div className="text-center w-full bg-slate-900 text-white py-6 rounded-2xl font-bold hover:bg-green-600 transition-all active:scale-[0.98] shadow-lg shadow-slate-200 text-lg">
                  Захиалга баталгаажуулах
                </div>
              </Link>
            )}


            <div className="mt-6 flex flex-col gap-3">
              <div className="flex items-center gap-2 text-[11px] text-stone-400">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                <span>Төлбөр QPay-ээр найдвартай хийгдэнэ</span>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-stone-400">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                <span>24 цагийн дотор хүргэгдэнэ</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
