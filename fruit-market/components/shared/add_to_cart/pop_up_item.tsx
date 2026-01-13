"use client"
import { MOCK_FRUITS, MOCK_BUNDLES } from "@/mock_data/mock_bundle"

export default function PopUpItem({id}:{id:string}){
    const product = [...MOCK_FRUITS, ...MOCK_BUNDLES].find((p) => p.id === id);
    
    if (!product ) return null;

    return (
          <div className="flex items-center gap-4 py-4 border-b border-stone-100 last:border-0 group">
      {/* Product Image */}
      <div className="h-20 w-20 rounded-2xl bg-stone-50 overflow-hidden flex-shrink-0 border border-stone-100">
        <img 
          src={product.image} 
          alt={product.name} 
          className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500" 
        />
      </div>

      {/* Info & Controls */}
      <div className="flex-1 flex flex-col justify-between h-20 py-1">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-slate-900 text-sm leading-tight">
              {product.name}
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              {product.price.toLocaleString()}₮ / ширхэг
            </p>
          </div>
        </div>
        </div>
      </div>

    )
}