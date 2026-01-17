import { Fruit } from "@/types/fruit";
import { Bundle } from "@/types/bundles";

export const MOCK_BUNDLES: Bundle[] = [
  { id: "b1", name: "Lunar Year Special", price: 120000, image: "https://images.unsplash.com/photo-1543528176-61b2395143a4?q=80&w=1000&auto=format&fit=crop", fruits: ["Apple", "Orange", "Mango"], instock: true },
  { id: "b2", name: "Zen Morning Box", price: 85000, image: "https://images.unsplash.com/photo-1519996529931-28324d5a630e?q=80&w=1000&auto=format&fit=crop", fruits: ["Avocado", "Kiwi", "Green Apple"], instock: true },
  { id: "b3", name: "Tropical Sunset", price: 150000, image: "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?q=80&w=1000&auto=format&fit=crop", fruits: ["Pineapple", "Mango", "Dragonfruit"], instock: true },
  { id: "b4", name: "Immunity Booster", price: 65000, image: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?q=80&w=1000&auto=format&fit=crop", fruits: ["Lemon", "Ginger", "Orange"], instock: true },
  { id: "b5", name: "Premium Red Gift Box", price: 200000, image: "https://images.unsplash.com/photo-1610832958506-aa56338406cd?q=80&w=1000&auto=format&fit=crop", fruits: ["Cherry", "Strawberry", "Red Apple"], instock: false },
  { id: "b6", name: "Family Weekly Pack", price: 95000, image: "https://images.unsplash.com/photo-1490818387583-1baba5e6382b?q=80&w=1000&auto=format&fit=crop", fruits: ["Banana", "Apple", "Orange", "Grapes"], instock: true },
  { id: "b7", name: "Berry Delight", price: 110000, image: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?q=80&w=1000&auto=format&fit=crop", fruits: ["Blueberry", "Strawberry", "Raspberry"], instock: true },
  { id: "b8", name: "Executive Citrus Mix", price: 55000, image: "https://images.unsplash.com/photo-1557800636-894a64c1696f?q=80&w=1000&auto=format&fit=crop", fruits: ["Grapefruit", "Orange", "Lemon"], instock: true },
  { id: "b9", name: "Summer Picnic Box", price: 135000, image: "https://images.unsplash.com/photo-1596333522248-10146b4f383f?q=80&w=1000&auto=format&fit=crop", fruits: ["Watermelon", "Peach", "Plum"], instock: true },
  { id: "b10", name: "Chef's Exotic Selection", price: 280000, image: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?q=80&w=1000&auto=format&fit=crop", fruits: ["Passionfruit", "Lychee", "Durian"], instock: true },
];

export const MOCK_FRUITS: Fruit[] = [
  { id: "1", name: "Premium Fuji Apple", price: 12500, unit: "kg", image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?q=80&w=1000&auto=format&fit=crop", category: "pome", inStock: true },
  { id: "2", name: "Amaou Strawberries", price: 45000, unit: "box", image: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?q=80&w=1000&auto=format&fit=crop", category: "berry", inStock: true },
  { id: "3", name: "Alphonso Mango", price: 18000, unit: "piece", image: "https://images.unsplash.com/photo-1553279768-865429fa0078?q=80&w=1000&auto=format&fit=crop", category: "tropical", inStock: true },
  { id: "4", name: "Shine Muscat Grapes", price: 85000, unit: "kg", image: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?q=80&w=1000&auto=format&fit=crop", category: "berry", inStock: true },
  { id: "5", name: "Golden Pineapple", price: 25000, unit: "piece", image: "https://images.unsplash.com/photo-1550258987-190a2d41a8ba?q=80&w=1000&auto=format&fit=crop", category: "tropical", inStock: false },
  { id: "6", name: "Sicilian Lemons", price: 5500, unit: "piece", image: "https://images.unsplash.com/photo-1585059895324-5828125f7544?q=80&w=1000&auto=format&fit=crop", category: "citrus", inStock: true },
  { id: "7", name: "Hass Avocado", price: 15000, unit: "piece", image: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?q=80&w=1000&auto=format&fit=crop", category: "tropical", inStock: true },
  { id: "8", name: "Navel Oranges", price: 8000, unit: "kg", image: "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?q=80&w=1000&auto=format&fit=crop", category: "citrus", inStock: true },
  { id: "9", name: "White Peach", price: 22000, unit: "piece", image: "https://images.unsplash.com/photo-1528821128474-27f963b062bf?q=80&w=1000&auto=format&fit=crop", category: "citrus", inStock: true },
  { id: "10", name: "Blueberries", price: 32000, unit: "box", image: "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?q=80&w=1000&auto=format&fit=crop", category: "berry", inStock: true },
];