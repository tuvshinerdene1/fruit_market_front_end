import FruitCard from "@/components/ui/fruitCard";
import { Fruit } from "@/types/fruit";

const MOCK_FRUITS: Fruit[] = [
  {
    id: "1",
    name: "Organic Honeycrisp Apple",
    price: 4.50,
    unit: "kg",
    image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6bcd6",
    category: "pome",
    inStock: true
  },
  {
    id: "2",
    name: "Fresh Strawberries",
    price: 3.00,
    unit: "piece",
    image: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6",
    category: "berry",
    inStock: false
  }
];

export default function Home() {
  return (
    <main className="container mx-auto py-10">
      <h1 className="text-4xl font-bold mb-8">Fruit Market</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {MOCK_FRUITS.map((fruit) => (
          <FruitCard key={fruit.id} fruit={fruit} />
        ))}
      </div>
    </main>
  );
}