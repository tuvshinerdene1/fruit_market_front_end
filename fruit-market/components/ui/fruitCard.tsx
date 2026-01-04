import { Fruit } from "@/types/fruit";
import { Button } from "./button";
import {  Card, CardContent, CardFooter, CardHeader, CardTitle } from "./card";
import { Badge } from "lucide-react";

interface FruitCardProps{
    fruit:Fruit;
}

export default function FruitCard({ fruit }: FruitCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-square bg-muted relative">
         <img 
            src={fruit.image} 
            alt={fruit.name} 
            className="object-cover w-full h-full"
         />
      </div>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl">{fruit.name}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold text-green-600">
          ${fruit.price.toFixed(2)} <span className="text-sm font-normal text-gray-500">/ {fruit.unit}</span>
        </p>
      </CardContent>
      <CardFooter>
        <Button className="w-full" disabled={!fruit.inStock}>
          {fruit.inStock ? "Add to Cart" : "Notify Me"}
        </Button>
      </CardFooter>
    </Card>
  );
}