"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { MOCK_FRUITS, MOCK_BUNDLES } from "@/mock_data/mock_bundle";


import CartList from "./cart_list";
import DeliveryForm from "./delivery_form";
import PaymentMethod from "./payment_method";
import OrderSummary from "./order_summary";
import { SuccessView, EmptyCartView } from "./checkout_states";

export default function CheckoutPage() {
  // --- STATE ---
  const [cartItems, setCartItems] = useState<{ id: string; quantity: number }[]>([]);
  const [isPickup, setIsPickup] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState("Бэлнээр");
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
      toast.error("Мэдээллээ бүрэн бөглөнө үү");
      return;
    }

    localStorage.removeItem("cart");
    window.dispatchEvent(new Event("cartUpdated"));
    setIsSuccess(true);
    toast.success("Захиалга амжилттай!");
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
    <div className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Link href="/" className="flex items-center gap-2 text-stone-500 hover:text-slate-900 mb-8 group">
        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
        <span className="text-sm font-medium">Буцах</span>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* LEFT COLUMN: Inputs */}
        <div className="lg:col-span-7 xl:col-span-8 space-y-12">
          <CartList cartItems={cartItems} />
          
          <DeliveryForm 
            formData={formData} 
            handleInputChange={handleInputChange} 
            isPickUp={isPickup} 
            setIsPickup={setIsPickup} 
          />
          
          <PaymentMethod 
            selectedPayment={selectedPayment} 
            setSelectedPayment={setSelectedPayment} 
          />
        </div>

        {/* RIGHT COLUMN: Summary */}
        <div className="lg:col-span-5 xl:col-span-4">
          <OrderSummary 
            cartItems={cartItems}
            allProducts={allProducts}
            subtotal={subtotal}
            deliveryFee={deliveryFee}
            totalAmount={totalAmount}
            onCheckout={handleVerifyOrder}
          />
        </div>
      </div>
    </div>
  );
}