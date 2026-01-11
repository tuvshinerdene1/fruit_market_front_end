export interface Fruit {
  id: string;
  name: string;
  price: number;
  unit: 'kg' | 'lb' | 'piece'| 'box';
  image: string;
  category: 'citrus' | 'berry' | 'tropical' | 'pome';
  inStock: boolean;
}