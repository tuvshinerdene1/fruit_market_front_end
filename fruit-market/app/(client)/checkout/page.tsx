"use client";
import { useState, useEffect } from "react";
import CartItem from "@/components/shared/checkout/CartItem";
import { MOCK_FRUITS, MOCK_BUNDLES } from "@/mock_data/mock_bundle";
import {
  ArrowLeft,
  ShoppingBag,
  Truck,
  CheckCircle2,
  User,
  Phone,
  MapPin,
  MessageSquare,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export default function CheckoutList() {
  const [cartItems, setCartItems] = useState<{ id: string; quantity: number }[]>([]);
  const [isPickup, setIsPickup] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState("Бэлнээр");
  const [isSuccess, setIsSuccess] = useState(false); // Success state

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    district: "Сүхбаатар", // Default district
    address: "",
    note: "",
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleVerifyOrder = () => {
    if (!formData.name || !formData.phone || (!isPickup && !formData.address)) {
      toast.error("Мэдээллээ бүрэн бөглөнө үү");
      return;
    }

    // Process success
    localStorage.removeItem("cart");
    window.dispatchEvent(new Event("cartUpdated"));
    setIsSuccess(true);
    toast.success("Захиалга амжилттай!");
  };

  const subtotal = cartItems.reduce((acc, item) => {
    const product = allProducts.find((p) => p.id === item.id);
    return acc + (product ? product.price * item.quantity : 0);
  }, 0);

  const deliveryFee = isPickup || subtotal > 50000 ? 0 : 5000;
  const totalAmount = subtotal + deliveryFee;

  // SUCCESS VIEW
  if (isSuccess) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 animate-in fade-in zoom-in duration-500">
        <div className="max-w-md w-full text-center space-y-8 bg-white p-10 rounded-[3rem] shadow-2xl shadow-stone-200 border border-stone-100">
          <div className="relative mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center animate-bounce">
            <CheckCircle2 size={40} className="text-green-600" />
          </div>
          <div className="space-y-2">
            <h2 className="text-3xl font-black text-slate-900">Баярлалаа!</h2>
            <p className="text-stone-500 text-sm">Таны захиалгыг хүлээн авлаа. Бид удахгүй холбогдоно.</p>
          </div>
          <Link href="/" className="block w-full bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-green-600 transition-all">
            Нүүр хуудас руу буцах
          </Link>
        </div>
      </div>
    );
  }

  // EMPTY CART VIEW
  if (cartItems.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
        <div className="bg-stone-100 p-6 rounded-full mb-6 text-stone-300">
          <ShoppingBag size={48} />
        </div>
        <h2 className="text-2xl font-bold text-slate-900">Таны сагс хоосон байна</h2>
        <Link href="/" className="mt-8 bg-slate-900 text-white px-8 py-3 rounded-2xl font-semibold">
          Дэлгүүр рүү буцах
        </Link>
      </div>
    );
  }

  return (
    <div className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Link href="/" className="flex items-center gap-2 text-stone-500 hover:text-slate-900 mb-8 group">
        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
        <span className="text-sm font-medium">Буцах</span>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-7 xl:col-span-8 space-y-12">
          {/* 1. Products */}
          <section>
            <div className="flex items-baseline justify-between mb-6 border-b border-stone-100 pb-4">
              <h2 className="text-2xl font-black text-slate-900">1. Захиалсан бараа</h2>
            </div>
            <div className="divide-y divide-stone-100 bg-white rounded-3xl border border-stone-100 overflow-hidden">
              {cartItems.map((item, index) => (
                <CartItem key={item.id || index} id={item.id} quantity={item.quantity} />
              ))}
            </div>
          </section>

          {/* 2. Delivery/Pickup Form */}
          <section>
            <div className="flex items-baseline mb-6 border-b border-stone-100 pb-4">
              <h2 className="text-2xl font-black text-slate-900">2. Хүлээн авах мэдээлэл</h2>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <button onClick={() => setIsPickup(false)} className={`p-4 rounded-2xl border-2 transition-all text-sm font-bold ${!isPickup ? "border-slate-900 bg-slate-900 text-white" : "border-stone-100 bg-stone-50 text-stone-500"}`}>Хүргүүлж авах</button>
              <button onClick={() => setIsPickup(true)} className={`p-4 rounded-2xl border-2 transition-all text-sm font-bold ${isPickup ? "border-slate-900 bg-slate-900 text-white" : "border-stone-100 bg-stone-50 text-stone-500"}`}>Очиж авах</button>
            </div>

            <div className="bg-stone-50/50 p-8 rounded-[2rem] border border-stone-100 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-stone-500 uppercase flex items-center gap-2"><User size={14}/> Хүлээн авагчийн нэр</label>
                  <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Нэрээ оруулна уу" className="w-full p-4 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-slate-900 transition-all bg-white" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-stone-500 uppercase flex items-center gap-2"><Phone size={14}/> Утасны дугаар</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="88******" className="w-full p-4 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-slate-900 transition-all bg-white" />
                </div>
              </div>

              {!isPickup ? (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-stone-500 uppercase flex items-center gap-2"><MapPin size={14}/> Дүүрэг</label>
                    <select name="district" value={formData.district} onChange={handleInputChange} className="w-full p-4 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-slate-900 bg-white">
                      <option>Сүхбаатар</option>
                      <option>Баянзүрх</option>
                      <option>Чингэлтэй</option>
                      <option>Хан-Уул</option>
                      <option>Баянгол</option>
                      <option>Сонгинохайрхан</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-stone-500 uppercase flex items-center gap-2"><MapPin size={14}/> Дэлгэрэнгүй хаяг</label>
                    <textarea name="address" value={formData.address} onChange={handleInputChange} rows={3} placeholder="Байр, орц, тоот..." className="w-full p-4 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-slate-900 bg-white" />
                  </div>
                </div>
              ) : (
                <div className="p-6 bg-green-50 rounded-2xl border border-green-100 text-sm text-green-800">
                  <p className="font-bold mb-1">Очиж авах хаяг:</p>
                  <p>Сүхбаатар дүүрэг, Саруул захын 1-р давхар, 3-р павильон</p>
                </div>
              )}

              <div className="space-y-2 pt-2 border-t border-stone-100">
                <label className="text-xs font-bold text-stone-500 uppercase flex items-center gap-2"><MessageSquare size={14}/> Нэмэлт тэмдэглэл (заавал биш)</label>
                <input type="text" name="note" value={formData.note} onChange={handleInputChange} placeholder="Код, хаалганы мэдээлэл г.м" className="w-full p-4 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-slate-900 bg-white" />
              </div>
            </div>
          </section>

          {/* 3. Payment Method */}
          <section className="mt-8">
            <h2 className="text-2xl font-black text-slate-900 mb-6 border-b border-stone-100 pb-4">3. Төлбөр төлөх</h2>
            <div className="grid grid-cols-3 gap-3">
              {["Бэлнээр", "Картаар", "QPay"].map((method) => (
                <button key={method} onClick={() => setSelectedPayment(method)} className={`py-4 border-2 rounded-2xl text-xs font-bold transition-all ${selectedPayment === method ? "border-slate-900 bg-slate-900 text-white shadow-lg" : "border-stone-100 bg-white text-stone-500"}`}>
                  {method}
                </button>
              ))}
            </div>
          </section>
        </div>

        {/* RIGHT COLUMN: Sticky Summary */}
        <div className="lg:col-span-5 xl:col-span-4">
          <div className="sticky top-28 bg-white border border-stone-200 shadow-xl rounded-[2.5rem] p-8">
            <h3 className="text-xl font-bold text-slate-900 mb-6">Захиалгын хураангуй</h3>
            <div className="space-y-4 mb-8">
              <div className="max-h-40 overflow-y-auto pr-2 space-y-3 mb-6 scrollbar-hide">
                {cartItems.map((item, index) => {
                  const product = allProducts.find((p) => p.id === item.id);
                  return (
                    <div key={item.id || index} className="flex justify-between text-xs">
                      <span className="text-stone-500">{product?.name} x {item.quantity}</span>
                      <span className="font-bold">{(product ? product.price * item.quantity : 0).toLocaleString()}₮</span>
                    </div>
                  );
                })}
              </div>
              <div className="flex justify-between text-stone-600 border-t border-dashed pt-4 text-sm">
                <span>Барааны дүн</span>
                <span className="font-bold">{subtotal.toLocaleString()}₮</span>
              </div>
              <div className="flex justify-between text-stone-600 text-sm">
                <span>Хүргэлт</span>
                <span className={`font-bold ${deliveryFee === 0 ? "text-green-600" : ""}`}>{deliveryFee === 0 ? "Үнэгүй" : `${deliveryFee.toLocaleString()}₮`}</span>
              </div>
            </div>
            <div className="pt-6 border-t border-stone-100 mb-8 flex justify-between items-end">
              <span className="text-slate-500 font-medium mb-1">Нийт төлөх</span>
              <span className="text-4xl font-black text-slate-900">{totalAmount.toLocaleString()}₮</span>
            </div>
            <button onClick={handleVerifyOrder} className="w-full bg-slate-900 text-white py-6 rounded-2xl font-bold hover:bg-green-600 transition-all text-lg shadow-xl shadow-slate-200 active:scale-95">
              Захиалга баталгаажуулах
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}