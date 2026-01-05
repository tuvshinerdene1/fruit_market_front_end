import FruitCard from "@/components/shared/fruitCard";
import BundleCard from "@/components/shared/bundle_card/BundleCard";
import { Fruit } from "@/types/fruit";
import { Bundle } from "@/types/bundles";
import { HighLightSlideShow } from "@/components/shared/slideshow/slideshow";

const MOCK_BUNDLES: Bundle[] = [
  {
    id: "1",
    name: "Lunar year special",
    price: 100,
    image: "https://picsum.photos/400/300",
    fruits: ["banana", "apple", "pineapple"],
    instock: true,
  },
  {
    id: "2",
    name: "Lunar year special",
    price: 100,
    image: "https://picsum.photos/400/300",
    fruits: ["banana", "apple", "pineapple"],
    instock: true,
  },
  {
    id: "3",
    name: "Lunar year special",
    price: 100,
    image: "https://picsum.photos/400/300",
    fruits: ["banana", "apple", "pineapple"],
    instock: true,
  },
  {
    id: "4",
    name: "Lunar year special",
    price: 100,
    image: "https://picsum.photos/400/300",
    fruits: ["banana", "apple", "pineapple"],
    instock: true,
  },
];

const MOCK_FRUITS: Fruit[] = [
  {
    id: "1",
    name: "Organic Honeycrisp Apple",
    price: 4.5,
    unit: "kg",
    image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6bcd6",
    category: "pome",
    inStock: true,
  },
  {
    id: "2",
    name: "Fresh Strawberries",
    price: 3.0,
    unit: "piece",
    image: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6",
    category: "berry",
    inStock: false,
  },
];

export default function Home() {
  return (
    <main className="container mx-auto py-10">
      <HighLightSlideShow></HighLightSlideShow>

      <h1 className="text-4xl font-bold mb-8">Bundles</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {MOCK_BUNDLES.map((bundle) => (
          <BundleCard key={bundle.id} bundle={bundle}></BundleCard>
        ))}
      </div>
      
      <h1 className="text-4xl font-bold mb-8">Fruits</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {MOCK_FRUITS.map((fruit) => (
          <FruitCard key={fruit.id} fruit={fruit} />
        ))}
      </div>
    </main>
  );
}
