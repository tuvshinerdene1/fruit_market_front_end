import FruitCard from "@/components/shared/fruitCard";
import BundleCard from "@/components/shared/bundle_card/BundleCard";
import {MOCK_FRUITS, MOCK_BUNDLES} from "@/mock_data/mock_bundle"
import { HighLightSlideShow } from "@/components/shared/slideshow/slideshow";





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
