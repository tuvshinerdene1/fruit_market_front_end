import FruitCard from "@/components/shared/fruitCard";
import { MOCK_FRUITS } from "@/mock_data/mock_bundle";

export default function Fruitpage() {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {MOCK_FRUITS.map((fruit) => (
          <FruitCard key={fruit.id} fruit={fruit} />
        ))}
      </div>
    </div>
  );
}
