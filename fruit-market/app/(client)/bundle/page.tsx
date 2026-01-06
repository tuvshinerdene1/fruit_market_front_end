// app/(client)/fruit/page.tsx
import FruitCard from "@/components/shared/fruit_card/fruitCard";
import { MOCK_FRUITS } from "@/mock_data/mock_bundle";

import BundleCard from "@/components/shared/bundle_card/BundleCard";
import {MOCK_BUNDLES} from "@/mock_data/mock_bundle"



export default function FruitPage() {
  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Header Section */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Жимсний  <span className="text-green-600">Багцууд</span>
          </h1>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl leading-relaxed">
            Бид өдөр бүр хамгийн чанартай, амттай жимсийг таны гар дээр хүргэж байна. 
            Төрөл бүрийн витаминаар баялаг жимснүүдээс сонголтоо хийгээрэй.
          </p>
        </div>
      </div>

      {/* Grid Section */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Changed to grid-cols-2 on mobile so users see more items at once */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
          {MOCK_BUNDLES.map((bundle) => (
            <BundleCard key={bundle.id} bundle={bundle} />
          ))}
        </div>
      </main>
    </div>
  );
}