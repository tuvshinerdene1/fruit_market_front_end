import { MOCK_FRUITS, MOCK_BUNDLES } from "@/mock_data/mock_bundle";

export function OrderItemsList({ fruitItems, bundleItems, total }: any) {
  return (
    <div className="space-y-2">
      {Object.entries(fruitItems).map(([id, qty]: any) => {
        const fruit = MOCK_FRUITS.find((f) => f.id === id);
        return (
          <div key={id} className="flex justify-between text-sm">
            <span>
              {fruit?.name} x{qty}
            </span>
            <span>{((fruit?.price || 0) * qty).toLocaleString()} MNT</span>
          </div>
        );
      })}
      {Object.entries(bundleItems).map(([id, qty]: any) => {
        const fruit = MOCK_FRUITS.find((f) => f.id === id);
        return (
          <div key={id} className="flex justify-between text-sm">
            <span>
              {fruit?.name} x{qty}
            </span>
            <span>{((fruit?.price || 0) * qty).toLocaleString()} MNT</span>
          </div>
        );
      })}

      <div className="pt-2 border-t flex justify-between font-bold text-lg text-primary">
        <span>Total</span>
        <span>{total.toLocaleString()} MNT</span>
      </div>
    </div>
  );
}
