import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function HighLightSlideShow() {
  const highlights = [
    {
      title: "Fresh Organic Apples",
      desc: "Straight from the local farm",
      color: "bg-red-100",
    },
    {
      title: "Summer Mango Sale",
      desc: "Up to 50% off this week",
      color: "bg-yellow-100",
    },
    {
      title: "Free Delivery",
      desc: "On orders over 50,000₮",
      color: "bg-green-100",
    },
  ];
  return (
    <div className="flex justify-center w-full px-12 py-10">
      <Carousel className="w-full max-w-4xl">
        <CarouselContent>
          {highlights.map((item, index) => (
            <CarouselItem key={index}>
              <Card className={`border-none shadow-sm ${item.color}`}>
                <CardContent className="flex flex-col items-center justify-center p-12 text-center h-[300px]">
                  <h2 className="text-3xl font-bold text-gray-800 mb-2">
                    {item.title}
                  </h2>
                  <p className="text-lg text-gray-600">{item.desc}</p>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        {/* Navigation Buttons */}
        <CarouselPrevious className="hidden md:flex" />
        <CarouselNext className="hidden md:flex" />
      </Carousel>
    </div>
  );
}
