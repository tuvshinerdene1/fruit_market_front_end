"use client";
import { useState, useEffect } from "react";
import CartItem from "@/components/shared/checkout/CartItem";
import { MOCK_FRUITS, MOCK_BUNDLES } from "@/mock_data/mock_bundle"; 
import { ArrowLeft, ShoppingBag, Truck, MapPin, Phone, User } from "lucide-react";
import Link from "next/link";

export default function CheckoutList() {
  const [cartItems, setCartItems] = useState<{id: string, quantity: number}[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    district: "",
    address: "",
    note: ""
  });

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

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
        <div className="bg-stone-100 p-6 rounded-full mb-6 text-stone-300">
          <ShoppingBag size={48} />
        </div>
        <h2 className="text-2xl font-bold text-slate-900">Таны сагс хоосон байна</h2>
        <Link href="/" className="mt-8 bg-slate-900 text-white px-8 py-3 rounded-2xl font-semibold hover:bg-slate-800 transition-all">
          Дэлгүүр рүү буцах
        </Link>
      </div>
    );
  }

  return (
    <div className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Link href="/" className="flex items-center gap-2 text-stone-500 hover:text-slate-900 transition-colors mb-8 group">
        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
        <span className="text-sm font-medium">Буцах</span>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* LEFT COLUMN: Items + Shipping Form */}
        <div className="lg:col-span-7 xl:col-span-8 space-y-12">
          
          {/* 1. Products Section */}
          <section>
            <div className="flex items-baseline justify-between mb-6 border-b border-stone-100 pb-4">
              <h2 className="text-2xl font-black text-slate-900">1. Захиалсан бараа</h2>
              <span className="text-stone-400 text-sm font-medium">{cartItems.length} нэр төрөл</span>
            </div>
            <div className="divide-y divide-stone-100 bg-white rounded-3xl">
              {cartItems.map((item, index) => (
                <CartItem key={item.id || index} id={item.id} quantity={item.quantity} />
              ))}
            </div>
          </section>

          {/* 2. Shipping Form Section */}
          <section>
            <div className="flex items-baseline mb-6 border-b border-stone-100 pb-4">
              <h2 className="text-2xl font-black text-slate-900">2. Хүргэлтийн мэдээлэл</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-stone-50/50 p-8 rounded-[2rem] border border-stone-100">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-500 ml-1">Хүлээн авагчийн нэр</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
                  <input 
                    type="text" 
                    placeholder="Нэрээ оруулна уу"
                    className="w-full pl-12 pr-4 py-4 bg-white border border-stone-200 rounded-2xl focus:ring-2 focus:ring-green-500/20 focus:border-green-500 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-500 ml-1">Утасны дугаар</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
                  <input 
                    type="tel" 
                    placeholder="8800****"
                    className="w-full pl-12 pr-4 py-4 bg-white border border-stone-200 rounded-2xl focus:ring-2 focus:ring-green-500/20 focus:border-green-500 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="md:col-span-2 space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-500 ml-1">Дүүрэг / Хороо</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
                  <select className="w-full pl-12 pr-4 py-4 bg-white border border-stone-200 rounded-2xl appearance-none focus:ring-2 focus:ring-green-500/20 outline-none">
                    <option>Сонгох...</option>
                    <option>Баянзүрх дүүрэг</option>
                    <option>Хан-Уул дүүрэг</option>
                    <option>Сүхбаатар дүүрэг</option>
                    <option>Баянгол дүүрэг</option>
                  </select>
                </div>
              </div>

              <div className="md:col-span-2 space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-500 ml-1">Дэлгэрэнгүй хаяг</label>
                <textarea 
                  rows={3}
                  placeholder="Байр, орц, давхар, хаалганы дугаар болон бусад нэмэлт мэдээлэл"
                  className="w-full p-4 bg-white border border-stone-200 rounded-2xl focus:ring-2 focus:ring-green-500/20 outline-none transition-all resize-none"
                />
              </div>
            </div>
          </section>
        </div>

        {/* RIGHT COLUMN: Sticky Summary */}
        <div className="lg:col-span-5 xl:col-span-4">
          <div className="sticky top-28 bg-white border border-stone-200 shadow-xl shadow-stone-200/50 rounded-[2.5rem] p-8">
            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
               Захиалгын хураангуй
            </h3>
            
            <div className="space-y-4 mb-8">
              {/* Mini Item List Preview */}
              <div className="max-h-40 overflow-y-auto pr-2 space-y-3 mb-6 scrollbar-hide">
                {cartItems.map((item,index) => {
                  const product = allProducts.find(p => p.id === item.id);
                  const uniqueKey = item.id ? `summary-${item.id}` : `summary-fallback-${index}`;
                  return (
                    <div key={uniqueKey} className="flex justify-between text-xs">
                      <span className="text-stone-500">{product?.name} x {item.quantity}</span>
                      <span className="font-bold">{(product ? product.price * item.quantity : 0).toLocaleString()}₮</span>
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-between text-stone-600 border-t border-dashed pt-4">
                <span className="text-sm">Барааны дүн</span>
                <span className="font-bold">{subtotal.toLocaleString()}₮</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span className="text-sm">Хүргэлт</span>
                <span className={`font-bold ${deliveryFee === 0 ? "text-green-600" : ""}`}>
                    {deliveryFee === 0 ? "Үнэгүй" : `+${deliveryFee.toLocaleString()}₮`}
                </span>
              </div>
            </div>

            <div className="pt-6 border-t border-stone-100 mb-8">
              <div className="flex justify-between items-end">
                <span className="text-slate-500 font-medium mb-1">Нийт төлөх</span>
                <span className="text-4xl font-black text-slate-900 tracking-tighter">
                  {totalAmount.toLocaleString()}₮
                </span>
              </div>
            </div>

            <button className="w-full bg-slate-900 text-white py-6 rounded-2xl font-bold hover:bg-green-600 transition-all active:scale-[0.98] shadow-lg shadow-slate-200 text-lg">
              Төлбөр төлөх (QPay)
            </button>
            
            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-3 text-[11px] text-stone-400 bg-stone-50 p-3 rounded-xl">
                <Truck size={14} className="text-green-500" />
                <span>Маргааш 12:00-18:00 цагийн хооронд хүргэгдэнэ</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}