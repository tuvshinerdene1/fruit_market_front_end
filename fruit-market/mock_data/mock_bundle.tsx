import { Fruit } from "@/types/fruit";
import { Bundle } from "@/types/bundles";

export const  MOCK_BUNDLES: Bundle[] = [
  {
    id: "1",
    name: "Lunar year special",
    price: 100,
    image: "/mock_image/fruit_bundle.jpg",
    fruits: ["banana", "apple", "pineapple"],
    instock: true,
  },
  {
    id: "2",
    name: "Lunar year special",
    price: 100,
    image: "/mock_image/fruit_bundle.jpg",
    fruits: ["banana", "apple", "pineapple"],
    instock: true,
  },
  {
    id: "3",
    name: "Lunar year special",
    price: 100,
    image: "/mock_image/fruit_bundle.jpg",
    fruits: ["banana", "apple", "pineapple"],
    instock: true,
  },
  {
    id: "4",
    name: "Lunar year special",
    price: 100,
    image: "/mock_image/fruit_bundle.jpg",
    fruits: ["banana", "apple", "pineapple"],
    instock: true,
  },
];

export const MOCK_FRUITS: Fruit[] = [
  {
    id: "1",
    name: "Organic Honeycrisp Apple",
    price: 4.5,
    unit: "kg",
    image: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6",
    category: "pome",
    inStock: true,
  },
  {
    id: "2",
    name: "Fresh Strawberries",
    price: 3.0,
    unit: "piece",
    image: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6",
    category: "berry",
    inStock: false,
  },
];