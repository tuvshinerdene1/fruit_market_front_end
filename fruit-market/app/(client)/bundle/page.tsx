import BundleCard from "@/components/shared/bundle_card/BundleCard";
import { MOCK_BUNDLES } from "@/mock_data/mock_bundle";

export default function Bundlepage() {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {MOCK_BUNDLES.map((bundle) => (
          <BundleCard key={bundle.id} bundle={bundle} />
        ))}
      </div>
    </div>
  );
}
