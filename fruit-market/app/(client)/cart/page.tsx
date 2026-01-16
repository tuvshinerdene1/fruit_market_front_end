"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { MOCK_FRUITS, MOCK_BUNDLES } from "@/mock_data/mock_bundle";
import CartList from "./cart_list";
import DeliveryForm from "./delivery_form";
import OrderSummary from "./order_summary";
import { SuccessView, EmptyCartView } from "./checkout_states";

export default function CheckoutPage() {
  // --- STATE ---
  const [cartItems, setCartItems] = useState<{ id: string; quantity: number }[]>([]);
  const [isPickup, setIsPickup] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    district: "Сүхбаатар",
    address: "",
    note: "",
  });

  const allProducts = [...MOCK_FRUITS, ...MOCK_BUNDLES];

  // --- LOGIC ---
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
      toast.error("Мэдээллээ бүрэн бөглөнө үү (Please fill all fields)");
      return;
    }

    localStorage.removeItem("cart");
    window.dispatchEvent(new Event("cartUpdated"));
    setIsSuccess(true);
    toast.success("Захиалга амжилттай! (Order Successful)");
  };

  // --- CALCULATIONS ---
  const subtotal = cartItems.reduce((acc, item) => {
    const product = allProducts.find((p) => p.id === item.id);
    return acc + (product ? product.price * item.quantity : 0);
  }, 0);

  const deliveryFee = isPickup || subtotal > 50000 ? 0 : 5000;
  const totalAmount = subtotal + deliveryFee;

  // --- RENDER CONDITIONAL VIEWS ---
  if (isSuccess) return <SuccessView />;
  if (cartItems.length === 0) return <EmptyCartView />;

  // --- MAIN RENDER ---
  return (
    // Added pb-32 to body to ensure content isn't hidden behind the sticky footer
    <div className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-32 lg:pb-10">
      
      <Link href="/" className="flex items-center gap-2 text-stone-500 hover:text-slate-900 mb-8 group">
        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
        <span className="text-sm font-medium">Буцах</span>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* LEFT COLUMN: Cart & Form */}
        <div className="lg:col-span-7 xl:col-span-8 space-y-12">
          <CartList cartItems={cartItems} />
          
          <DeliveryForm 
            formData={formData} 
            handleInputChange={handleInputChange} 
            isPickUp={isPickup} 
            setIsPickup={setIsPickup} 
          />
        </div>

        {/* RIGHT COLUMN: Summary (Desktop Only essentially, or bottom of page on mobile) */}
        <div className="lg:col-span-5 xl:col-span-4">
          <OrderSummary 
            cartItems={cartItems}
            allProducts={allProducts}
            subtotal={subtotal}
            deliveryFee={deliveryFee}
            totalAmount={totalAmount}
            onCheckout={handleVerifyOrder}
            // Optional: You might want to hide the button inside OrderSummary on mobile 
            // via CSS classes if you pass className props, to avoid duplicate buttons.
          />
        </div>
      </div>

      {/* --- NEW: MOBILE STICKY FOOTER --- */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] lg:hidden z-50 safe-area-bottom">
        <div className="flex items-center justify-between gap-4 max-w-md mx-auto">
          <div className="flex flex-col">
            <span className="text-xs text-slate-500 font-medium">Нийт төлөх (Total)</span>
            <span className="text-xl font-black text-slate-900">{totalAmount.toLocaleString()}₮</span>
          </div>
        </div>
      </div>

    </div>
  );
}