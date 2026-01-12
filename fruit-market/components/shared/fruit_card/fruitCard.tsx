import { Fruit } from "@/types/fruit";
import Link from "next/link";
import { LikeButton } from "../like_button/LikeButton";
import AddCart from "../add_to_cart/add_cart";
interface FruitCardProps {
  fruit: Fruit;
}

export default function FruitCard({ fruit }: FruitCardProps) {
  return (
    <Link href={`/fruit/${fruit.id}`}>
      <div className="group bg-white rounded-2xl overflow-hidden border border-slate-100 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-slate-100">
          <img
            src={fruit.image}
            alt={fruit.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />

          {/* Like button */}
          <div className="absolute top-3 right-3">
            <LikeButton productId={fruit.id} />
          </div>
        </div>

        {/* Content */}
        <div className="p-4 md:p-6 text-center">
          <h3 className="text-sm md:text-base font-bold text-slate-800 mb-1 group-hover:text-green-600 transition-colors">
            {fruit.name}
          </h3>
          <p className="text-xs text-slate-500 mb-3">{fruit.unit || "1 кг"}</p>
          <div className="text-lg font-black text-slate-900">
            {fruit.price.toLocaleString()}₮
          </div>

          {/* <div className="mt-4 w-full bg-slate-900 text-white py-2 rounded-xl text-sm font-semibold hover:bg-green-600 transition-colors">
            Сагслах
          </div> */}
          <AddCart productId={fruit.id}></AddCart>
          <div className="mt-4 w-full bg-slate-900 text-white py-2 rounded-xl text-sm font-semibold hover:bg-green-600 transition-colors">
            Buy now 
          </div>
        </div>
      </div>
    </Link>
  );
}
