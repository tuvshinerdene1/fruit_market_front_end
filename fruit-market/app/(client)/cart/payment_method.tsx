interface PaymentMethodProps {
  selectedPayment: string;
  setSelectedPayment: (method: string) => void;
}

export default function PaymentMethod({ selectedPayment, setSelectedPayment }: PaymentMethodProps) {
  const methods = ["Бэлнээр", "Картаар", "QPay"];

  return (
    <section className="mt-8">
      <h2 className="text-2xl font-black text-slate-900 mb-6 border-b border-stone-100 pb-4">
        3. Төлбөр төлөх
      </h2>
      <div className="grid grid-cols-3 gap-3">
        {methods.map((method) => (
          <button
            key={method}
            onClick={() => setSelectedPayment(method)}
            className={`py-4 border-2 rounded-2xl text-xs font-bold transition-all ${
              selectedPayment === method
                ? "border-slate-900 bg-slate-900 text-white shadow-lg"
                : "border-stone-100 bg-white text-stone-500"
            }`}
          >
            {method}
          </button>
        ))}
      </div>
    </section>
  );
}