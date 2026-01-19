"use client";
import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

export function HighLightSlideShow() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  const highlights = [
    { title: "Fresh Organic Apples", desc: "Straight from the local farm", color: "bg-red-100" },
    { title: "Summer Mango Sale", desc: "Up to 50% off this week", color: "bg-yellow-100" },
    { title: "Free Delivery", desc: "On orders over 50,000₮", color: "bg-green-100" },
  ];

  // Initialize API for dots and count
  React.useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    // FIX 1: Changed height from fixed pixels to h-screen (Full Viewport Height)
    <section className="relative w-full h-screen min-h-[600px] overflow-hidden">
      <Carousel
        setApi={setApi}
        plugins={[Autoplay({ delay: 5000 })]}
        opts={{ loop: true }}
        className="w-full h-full"
      >
        <CarouselContent className="h-full ml-0">
          {highlights.map((item, index) => (
            <CarouselItem key={index} className="pl-0 h-full">
              <div
                className={cn(
                  // FIX 2: Added 'pt-20' so the content centers nicely below the navbar
                  "h-screen w-full flex flex-col items-center justify-center p-8 pt-24 transition-colors",
                  item.color
                )}
              >
                <div className="max-w-4xl px-6 text-center animate-in fade-in zoom-in duration-700">
                  <h2 className="text-5xl md:text-8xl font-black text-slate-900 mb-6 tracking-tighter leading-tight">
                    {item.title}
                  </h2>
                  <p className="text-xl md:text-3xl text-slate-700 font-medium max-w-2xl mx-auto">
                    {item.desc}
                  </p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Dots - kept at bottom */}
        <div className="absolute bottom-10 left-0 right-0 flex justify-center gap-3 z-10">
          {Array.from({ length: count }).map((_, i) => (
            <button
              key={i}
              onClick={() => api?.scrollTo(i)}
              className={cn(
                "h-2 transition-all duration-300 rounded-full shadow-sm",
                current === i
                  ? "w-10 bg-slate-900"
                  : "w-2 bg-slate-900/20 hover:bg-slate-900/40"
              )}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </Carousel>
    </section>
  );
}