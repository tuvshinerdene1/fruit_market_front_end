import { Bundle } from "@/types/bundles";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface BundleCardProps {
  bundle: Bundle;
}
import { LikeButton } from "../like_button/LikeButton";
import AddCart from "../add_to_cart/add_cart";


export default function BundleCard({ bundle }: BundleCardProps) {
  return (
     <Link href={`/bundle/${bundle.id}`}>
      <div className="group bg-white rounded-2xl overflow-hidden border border-slate-100 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-slate-100">
          <img
            src={bundle.image}
            alt={bundle.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />

          {/* Like button */}
          <div className="absolute top-3 right-3">
            <LikeButton productId={bundle.id} />
          </div>
        </div>

        {/* Content */}
        <div className="p-4 md:p-6 text-center">
          <h3 className="text-sm md:text-base font-bold text-slate-800 mb-1 group-hover:text-green-600 transition-colors">
            {bundle.name}
          </h3>
          <div className="text-lg font-black text-slate-900">
            {bundle.price.toLocaleString()}₮
          </div>

          {/* <div className="mt-4 w-full bg-slate-900 text-white py-2 rounded-xl text-sm font-semibold hover:bg-green-600 transition-colors">
            Сагслах
          </div> */}
          <AddCart productId={bundle.id}></AddCart>
        </div>
      </div>
    </Link>
  );
}
