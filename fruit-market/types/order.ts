import { Bundle } from "./bundles";
import { Fruit } from "./fruit";



export type OrderStatus = 'pending' | 'preparing' | 'shipping' | 'delivered';

export interface Order {
  id: string;
  phone_number: string;
  district: string;
  building: string;
  floor: string;
  door: number;
  status: OrderStatus;
  fruit_items: Record<string, number>;
  bundle_items: Record<string, number>;
  total_price: number;
  order_date: string;
}