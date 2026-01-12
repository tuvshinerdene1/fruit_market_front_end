"use client";

import { useState, useEffect } from "react";
import FruitCard from "@/components/shared/fruit_card/fruitCard";
import BundleCard from "@/components/shared/bundle_card/BundleCard";
import { MOCK_FRUITS, MOCK_BUNDLES } from "@/mock_data/mock_bundle";
import { FadeIn } from "@/components/animations/fade-in";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function LikedPage() {
  const [likedIds, setLikedIds] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // useEffect(() =>{
  //     const saved = JSON.parse(localStorage.getItem('favourites')|| "[]");
  //     setLikedIds(saved);
  //     setIsLoaded(true);
  // }, [])

  useEffect(() => {
    const handleUpdate = () => {
      const saved = JSON.parse(localStorage.getItem("favourites") || "[}");
      setLikedIds(saved);
    };

    window.addEventListener("favouritesUpdated", handleUpdate);
    handleUpdate();
    setIsLoaded(true);

    return () => window.removeEventListener("favouritesUpdated", handleUpdate);
  }, []);

  const likedFruits = MOCK_FRUITS.filter((fruit) =>
    likedIds.includes(fruit.id)
  );
  const likedBundles = MOCK_BUNDLES.filter((bundle) =>
    likedIds.includes(bundle.id)
  );

  const hasLikes = likedFruits.length > 0 || likedBundles.length > 0;

  if (!isLoaded) return null;

  return (
    <div className="container mx-auto px-6 py-12 lg:py-24 min-h-[70vh]">
      <FadeIn delay={0.1}>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <h1 className="text-4xl font-serif font-bold text-slate-900">
              Таалагдсан бүтээгдэхүүнүүд
            </h1>
            <p className="text-slate-500 mt-2">
              Таны хадгалсан шинэхэн жимс болон багцууд.
            </p>
          </div>
          <span className="text-sm font-medium bg-slate-100 px-4 py-2 rounded-full text-slate-600">
            Нийт {likedFruits.length + likedBundles.length} бүтээгдэхүүн
          </span>
        </div>
      </FadeIn>

      {!hasLikes ? (
        <FadeIn delay={0.3}>
          <div className="text-center py-20 bg-stone-50 rounded-3xl border-2 border-dashed border-stone-200">
            <p className="text-slate-400 mb-6">
              Одоогоор танд таалагдсан бүтээгдэхүүн алга.
            </p>
            <Link href="/">
              <Button className="rounded-full bg-slate-900 px-8">
                Дэлгүүр хэсэх
              </Button>
            </Link>
          </div>
        </FadeIn>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Render Bundles first (High Margin items) */}
          {likedBundles.map((bundle, index) => (
            <FadeIn key={bundle.id} delay={index * 0.1}>
              <BundleCard bundle={bundle} />
            </FadeIn>
          ))}

          {/* Render Individual Fruits */}
          {likedFruits.map((fruit, index) => (
            <FadeIn key={fruit.id} delay={(index + likedBundles.length) * 0.1}>
              <FruitCard fruit={fruit} />
            </FadeIn>
          ))}
        </div>
      )}
    </div>
  );
}
