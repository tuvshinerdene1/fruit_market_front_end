import { MOCK_FRUITS } from "@/mock_data/mock_bundle";
import { Button } from "@/components/ui/button";
import {ShoppingCart, Zap} from "lucide-react"
import { Badge } from "@/components/ui/badge";

export default async function FruitDetailPage({params}:{params:Promise<{id:string}>}){
    const resolvedParams = await params;
    const id = resolvedParams.id;
    const fruit = MOCK_FRUITS.find((f)=> f.id === id);

    if (!fruit) return <div>Fruit not found</div>

    return(
        <div className="container mx-auto px-6 py-12 lg:py-24">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items center">
                {/** large image */}
                <div className="bg-stone-50 rounded-3xl p-8 flex justify-center">
                    <img src={fruit.image} alt={fruit.name} className="max-h-[500px] object-contain drop-shadow-2xl"/>
                </div>

                {/** product details and actions  */}
<div className="space-y-6">
          <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
            {fruit.category.toUpperCase()}
          </Badge>
          <h1 className="text-4xl font-serif text-slate-900">{fruit.name}</h1>
          <p className="text-2xl font-bold text-slate-800">{fruit.price}₮ / {fruit.unit}</p>
          
          <p className="text-slate-500 leading-relaxed">
            Freshly picked and delivered to your doorstep. This premium quality 
            {fruit.name} is selected for its peak ripeness and flavor.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            {/* Logic: Adds to LocalStorage/Cart State */}
            <Button size="lg" variant="outline" className="flex-1 rounded-full border-2 border-slate-900 h-14">
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Cart
            </Button>

            {/* Logic: Adds to Cart AND pushes to /checkout */}
            <Button size="lg" className="flex-1 rounded-full bg-slate-900 hover:bg-green-600 h-14">
              <Zap className="mr-2 h-5 w-5 fill-current" />
              Buy It Now
            </Button>
          </div>
        </div>


            </div>
        </div>
    )
}