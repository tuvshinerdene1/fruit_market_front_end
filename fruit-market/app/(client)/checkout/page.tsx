"use client";
import { useState, useEffect } from "react";
import CartItem from "@/components/shared/checkout/CartItem";
import { MOCK_FRUITS, MOCK_BUNDLES } from "@/mock_data/mock_bundle";
import {
  ArrowLeft,
  ShoppingBag,
  Truck,
  MapPin,
  Phone,
  User,
} from "lucide-react";
import Link from "next/link";

export default function CheckoutList() {
  const [cartItems, setCartItems] = useState<
    { id: string; quantity: number }[]
  >([]);
  const [isPickup, setIsPickup] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState("Бэлнээр");

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    district: "",
    address: "",
    note: "",
    paymentMethod: "cash",
  });

  const allProducts = [...MOCK_FRUITS, ...MOCK_BUNDLES];

  const loadCart = () => {
    const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(savedCart);
  };

  const handlePaymentChange = (method: string) => {
    setFormData((prev) => ({ ...prev, paymentMethod: method }));
    setSelectedPayment(method);
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

  const deliveryFee = isPickup || subtotal > 50000 ? 0 : 5000;
  const totalAmount = subtotal + deliveryFee;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
        <div className="bg-stone-100 p-6 rounded-full mb-6 text-stone-300">
          <ShoppingBag size={48} />
        </div>
        <h2 className="text-2xl font-bold text-slate-900">
          Таны сагс хоосон байна
        </h2>
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
    <div className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Link
        href="/"
        className="flex items-center gap-2 text-stone-500 hover:text-slate-900 transition-colors mb-8 group"
      >
        <ArrowLeft
          size={18}
          className="group-hover:-translate-x-1 transition-transform"
        />
        <span className="text-sm font-medium">Буцах</span>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* LEFT COLUMN: Items + Shipping Form */}
        <div className="lg:col-span-7 xl:col-span-8 space-y-12">
          {/* 1. Products Section */}
          <section>
            <div className="flex items-baseline justify-between mb-6 border-b border-stone-100 pb-4">
              <h2 className="text-2xl font-black text-slate-900">
                1. Захиалсан бараа
              </h2>
              <span className="text-stone-400 text-sm font-medium">
                {cartItems.length - 1 > 0 ? (
                  <div>{cartItems.length - 1} бүтээгдэхүүн</div>
                ) : (
                  <div>Бүтээгдэхүүн сонгоогүй байна.</div>
                )}
              </span>
            </div>
            <div className="divide-y divide-stone-100 bg-white rounded-3xl">
              {cartItems.map((item, index) => (
                <CartItem
                  key={item.id || index}
                  id={item.id}
                  quantity={item.quantity}
                />
              ))}
            </div>
          </section>

          {/* 2. Shipping Form Section */}
          {/* 2. Order Options */}
          <section>
            <div className="flex items-baseline mb-6 border-b border-stone-100 pb-4">
              <h2 className="text-2xl font-black text-slate-900">
                2. Хүлээн авах төрөл
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <button
                onClick={() => setIsPickup(false)}
                className={`p-4 rounded-2xl border-2 transition-all text-sm font-bold ${
                  !isPickup
                    ? "border-slate-900 bg-slate-900 text-white"
                    : "border-stone-100 bg-stone-50 text-stone-500"
                }`}
              >
                Хүргүүлж авах
              </button>
              <button
                onClick={() => setIsPickup(true)}
                className={`p-4 rounded-2xl border-2 transition-all text-sm font-bold ${
                  isPickup
                    ? "border-slate-900 bg-slate-900 text-white"
                    : "border-stone-100 bg-stone-50 text-stone-500"
                }`}
              >
                Очиж авах (Pickup)
              </button>
            </div>

            {!isPickup ? (
              /* DELIVERY FORM (The one you already wrote) */
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-stone-50/50 p-8 rounded-[2rem] border border-stone-100 animate-in fade-in duration-300">
                {/* ... your existing inputs (Name, Phone, Address) ... */}
              </div>
            ) : (
              /* PICKUP INFO */
              <div className="p-8 bg-green-50 rounded-[2rem] border border-green-100 animate-in slide-in-from-top-2 duration-300">
                <h4 className="font-bold text-green-800 mb-2">Байршил:</h4>
                <p className="text-green-700 text-sm">
                  Сүхбаатар дүүрэг, Саруул захын 1-р давхар, 3-р павильон
                </p>
                <p className="text-green-600 text-xs mt-4 italic">
                  * Захиалга бэлдэж дуусвал танд мэдэгдэх болно.
                </p>
              </div>
            )}
          </section>

          {/* Payment Method Selection (Add before the final button) */}
          <section className="mt-8">
            <label className="text-xs font-bold uppercase tracking-wider text-stone-500 ml-1">
              Төлбөрийн хэлбэр
            </label>
            <div className="grid grid-cols-3 gap-3 mt-2">
              {["Бэлнээр", "Картаар", "Шилжүүлэх"].map((method) => {
                const isActive = selectedPayment === method;
                return (
                  <button
                    key={method}
                    onClick={() => handlePaymentChange(method)}
                    type="button" // Important to prevent form submission
                    className={`py-3 px-2 border-2 rounded-xl text-xs font-bold transition-all ${
                      isActive
                        ? "border-slate-900 bg-slate-900 text-white shadow-md"
                        : "border-stone-100 bg-white text-stone-500 hover:border-stone-300"
                    }`}
                  >
                    {method}
                  </button>
                );
              })}
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
                {cartItems.map((item, index) => {
                  const product = allProducts.find((p) => p.id === item.id);
                  const uniqueKey = item.id
                    ? `summary-${item.id}`
                    : `summary-fallback-${index}`;
                  return (
                    <div
                      key={uniqueKey}
                      className="flex justify-between text-xs"
                    >
                      <span className="text-stone-500">
                        {product?.name} x {item.quantity}
                      </span>
                      <span className="font-bold">
                        {(product
                          ? product.price * item.quantity
                          : 0
                        ).toLocaleString()}
                        ₮
                      </span>
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
            </div>

            <div className="pt-6 border-t border-stone-100 mb-8">
              <div className="flex justify-between items-end">
                <span className="text-slate-500 font-medium mb-1">
                  Нийт төлөх
                </span>
                <span className="text-4xl font-black text-slate-900 tracking-tighter">
                  {totalAmount.toLocaleString()}₮
                </span>
              </div>
            </div>

            <button className="w-full bg-slate-900 text-white py-6 rounded-2xl font-bold hover:bg-green-600 transition-all active:scale-[0.98] shadow-lg shadow-slate-200 text-lg">
              Захиалга баталгаажуулах
            </button>
            <p className="text-center text-[10px] text-stone-400 mt-4 px-4">
              * Таны захиалга шууд бүртгэгдэх бөгөөд жолооч/борлуулагч тантай
              утсаар холбогдож баталгаажуулна.
            </p>

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
