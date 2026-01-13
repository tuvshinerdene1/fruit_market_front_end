import CartItem from "@/components/shared/checkout/CartItem";

interface CartListProps {
  cartItems: { id: string; quantity: number }[];
}

export default function CartList({ cartItems }: CartListProps) {
  return (
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
  );
}