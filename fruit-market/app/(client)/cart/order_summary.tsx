import { CheckCircle2 } from "lucide-react";

interface OrderSummaryProps{
    cartItems: {id : string; quantity: number}[];
    allProducts: any[];
    subtotal: number;
    deliveryFee: number;
    totalAmount: number;
    onCheckout: () => void;
}

export default function OrderSummary({
    cartItems,
    allProducts,
    subtotal,
    deliveryFee,
    totalAmount,
    onCheckout,
}:OrderSummaryProps){
  return (
    <div className="sticky top-28 bg-white border border-stone-200 shadow-xl rounded-[2.5rem] p-8">
      <h3 className="text-xl font-bold text-slate-900 mb-6">Захиалгын хураангуй</h3>
      
      <div className="space-y-4 mb-8">
        <div className="max-h-40 overflow-y-auto pr-2 space-y-3 mb-6 scrollbar-hide">
          {cartItems.map((item, index) => {
            const product = allProducts.find((p) => p.id === item.id);
            return (
              <div key={item.id || index} className="flex justify-between text-xs">
                <span className="text-stone-500">
                  {product?.name} x {item.quantity}
                </span>
                <span className="font-bold">
                  {(product ? product.price * item.quantity : 0).toLocaleString()}₮
                </span>
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
          <span className={`font-bold ${deliveryFee === 0 ? "text-green-600" : ""}`}>
            {deliveryFee === 0 ? "Үнэгүй" : `${deliveryFee.toLocaleString()}₮`}
          </span>
        </div>
      </div>

      <div className="pt-6 border-t border-stone-100 mb-8 flex justify-between items-end">
        <span className="text-slate-500 font-medium mb-1">Нийт төлөх</span>
        <span className="text-4xl font-black text-slate-900">
          {totalAmount.toLocaleString()}₮
        </span>
      </div>

      <button
        onClick={onCheckout}
        className="w-full bg-slate-900 text-white py-6 rounded-2xl font-bold hover:bg-green-600 transition-all text-lg shadow-xl shadow-slate-200 active:scale-95"
      >
        Захиалга баталгаажуулах
      </button>
    </div>
  );
}