// app/page.tsx
import FruitCard from "@/components/shared/fruit_card/fruitCard";
import BundleCard from "@/components/shared/bundle_card/BundleCard";
import { MOCK_FRUITS, MOCK_BUNDLES } from "@/mock_data/mock_bundle";
import { HighLightSlideShow } from "@/components/shared/slideshow/slideshow";
import Link from "next/link";
import { ArrowRight } from "lucide-react"; 
import { FadeIn } from "@/components/animations/fade-in";

export default function Home() {
  const featuredBundles = MOCK_BUNDLES.slice(0, 3);
  const featuredFruits = MOCK_FRUITS.slice(0, 4);

  return (
    <FadeIn delay={0.1}>
      <main className="min-h-screen pb-20">
        
        {/* 1. Hero / Slideshow Section 
            Removed extra wrappers, just let the component handle the size 
        */}
        <HighLightSlideShow />

        {/* 2. Featured Bundles */}
        <section className="bg-green-50 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-end mb-10">
              <div>
                <h2 className="text-3xl md:text-4xl font-black text-slate-900">
                  Онцлох <span className="text-green-600">Багцууд</span>
                </h2>
                <p className="text-slate-600 mt-2">
                  Гэр бүл, найз нөхөддөө өгөх хамгийн шилдэг бэлэг
                </p>
              </div>
              <Link
                href="/bundle"
                className="hidden md:flex items-center gap-2 text-green-700 font-bold hover:gap-3 transition-all"
              >
                Бүгдийг үзэх <ArrowRight size={20} />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredBundles.map((bundle) => (
                <FadeIn key={bundle.id} delay={parseInt(bundle.id) * 0.1}>
                  <BundleCard key={bundle.id} bundle={bundle} />
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* 3. Fresh Fruits */}
        <section className="container mx-auto px-4 py-16 md:py-24">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900">
                Шинэ <span className="text-orange-500">Ургац</span>
              </h2>
              <p className="text-slate-600 mt-2">
                Өнөөдөр ирсэн шинэхэн жимснүүд
              </p>
            </div>
            <Link
              href="/fruit"
              className="hidden md:flex items-center gap-2 text-orange-600 font-bold hover:gap-3 transition-all"
            >
              Бүгдийг үзэх <ArrowRight size={20} />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
            {featuredFruits.map((fruit) => (
              <FadeIn key={fruit.id} delay={parseInt(fruit.id) * 0.1}>
                <FruitCard key={fruit.id} fruit={fruit} />
              </FadeIn>
            ))}
          </div>
        </section>

        {/* 4. Mini Banner */}
        <section className="container mx-auto px-4">
          <div className="bg-slate-900 rounded-[2rem] p-8 md:p-16 flex flex-col md:flex-row items-center justify-between overflow-hidden relative">
            <div className="relative z-10 text-center md:text-left">
              <h2 className="text-white text-3xl md:text-5xl font-black mb-4">
                24 цагийн дотор <br /> таны хаалган дээр.
              </h2>
              <p className="text-slate-400 text-lg mb-8">
                Улаанбаатар хот доторх хамгийн хурдан хүргэлт.
              </p>
              <button className="bg-green-500 hover:bg-green-400 text-white px-8 py-4 rounded-2xl font-black transition-transform active:scale-95">
                Захиалга өгөх
              </button>
            </div>
            <div className="opacity-20 absolute right-[-10%] bottom-[-10%] rotate-12 pointer-events-none">
              <span className="text-[200px]">🍎</span>
            </div>
          </div>
        </section>
      </main>
    </FadeIn>
  );
}