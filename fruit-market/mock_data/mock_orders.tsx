import { Order } from "@/types/order";

export const MOCK_ORDERS: Order[] = [
  {
    id: "ORD-001",
    phone_number: "090-1111-2222",
    district: "District 1",
    building: "Saigon Center",
    floor: "25",
    door: 2501,
    status: "delivered",
    fruit_items: { "1": 2, "2": 1 }, // 2kg Fuji, 1 box Strawberries
    bundle_items: { "b1": 1 }, // Lunar Year Special
    total_price: 190000,
    order_date: "2024-03-10T08:30:00Z"
  },
  {
    id: "ORD-002",
    phone_number: "090-3333-4444",
    district: "District 7",
    building: "Sunrise City",
    floor: "10",
    door: 1005,
    status: "shipping",
    fruit_items: { "3": 4, "7": 2 }, // 4 Mangoes, 2 Avocados
    bundle_items: { "b2": 2 }, // 2 Zen Morning Boxes
    total_price: 272000,
    order_date: "2024-03-20T14:20:00Z"
  },
  {
    id: "ORD-003",
    phone_number: "090-5555-6666",
    district: "Binh Thanh",
    building: "Landmark 81",
    floor: "45",
    door: 4502,
    status: "preparing",
    fruit_items: { "4": 1, "10": 2 }, // 1kg Grapes, 2 box Blueberries
    bundle_items: { "b7": 1 }, // Berry Delight
    total_price: 259000,
    order_date: "2024-03-21T09:15:00Z"
  },
  {
    id: "ORD-004",
    phone_number: "090-7777-8888",
    district: "District 2",
    building: "The Vista",
    floor: "3",
    door: 312,
    status: "pending",
    fruit_items: { "6": 10, "8": 3 }, // 10 Lemons, 3kg Oranges
    bundle_items: { "b4": 1 }, // Immunity Booster
    total_price: 144000,
    order_date: "2024-03-21T11:45:00Z"
  },
  {
    id: "ORD-005",
    phone_number: "090-9999-0000",
    district: "District 3",
    building: "Leman Luxury",
    floor: "8",
    door: 808,
    status: "delivered",
    fruit_items: { "9": 4 }, // 4 White Peaches
    bundle_items: { "b10": 1 }, // Chef's Exotic
    total_price: 368000,
    order_date: "2024-03-15T16:00:00Z"
  },
  {
    id: "ORD-006",
    phone_number: "080-1234-1234",
    district: "District 1",
    building: "Vincom Retro",
    floor: "G",
    door: 101,
    status: "shipping",
    fruit_items: { "1": 5 }, // 5kg Apples
    bundle_items: { "b6": 2 }, // 2 Family Packs
    total_price: 252500,
    order_date: "2024-03-20T17:30:00Z"
  },
  {
    id: "ORD-007",
    phone_number: "080-4321-4321",
    district: "Phu Nhuan",
    building: "Orchard Parkview",
    floor: "15",
    door: 1509,
    status: "preparing",
    fruit_items: { "2": 3 }, // 3 boxes Strawberries
    bundle_items: { "b3": 1 }, // Tropical Sunset
    total_price: 285000,
    order_date: "2024-03-21T07:00:00Z"
  },
  {
    id: "ORD-008",
    phone_number: "070-5555-4444",
    district: "District 4",
    building: "Icon 56",
    floor: "20",
    door: 2002,
    status: "pending",
    fruit_items: { "7": 4, "3": 2 }, // 4 Avocados, 2 Mangoes
    bundle_items: { "b8": 1 }, // Executive Citrus
    total_price: 151000,
    order_date: "2024-03-21T12:00:00Z"
  },
  {
    id: "ORD-009",
    phone_number: "090-2222-3333",
    district: "District 7",
    building: "Midtown",
    floor: "5",
    door: 504,
    status: "delivered",
    fruit_items: { "4": 2 }, // 2kg Muscat Grapes
    bundle_items: { "b9": 1 }, // Summer Picnic
    total_price: 305000,
    order_date: "2024-03-12T10:00:00Z"
  },
  {
    id: "ORD-010",
    phone_number: "090-6666-7777",
    district: "District 1",
    building: "Bitexco",
    floor: "50",
    door: 5001,
    status: "preparing",
    fruit_items: { "1": 1, "6": 5 }, // 1kg Apple, 5 Lemons
    bundle_items: { "b5": 1 }, // Premium Red Gift (Even if out of stock, mock order exists)
    total_price: 240000,
    order_date: "2024-03-21T08:45:00Z"
  }
];