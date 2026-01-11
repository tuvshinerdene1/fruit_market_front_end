import { Bundle } from "@/types/bundles";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

interface BundleCardProps {
  bundle: Bundle;
}

export default function BundleCard({ bundle }: BundleCardProps) {
  return (
    <Link href={`/bundle/${bundle.id}`}>
      <Card className="overflow-hidden hover:shadow-2xl transition-shadow">
        <div className="aspect-square bg-muted relative">
          <img
            src={bundle.image}
            alt={bundle.name}
            className="object-cover w-full h-full"
          />
        </div>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl">{bundle.name}</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold text-green-600">
            ${bundle.price.toFixed(2)}
          </p>
          <p className="text-sm text-gray-500">{bundle.fruits.join(", ")}</p>
        </CardContent>
        <CardFooter>
          <Button className="w-full" disabled={!bundle.instock}>
            {bundle.instock ? "Add to Cart" : "Notify Me"}
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}
