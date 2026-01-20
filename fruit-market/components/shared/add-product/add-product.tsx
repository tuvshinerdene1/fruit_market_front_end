"use client";

import { useState } from "react";
import { Fruit } from "@/types/fruit";
import { Bundle } from "@/types/bundles";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Apple, Package } from "lucide-react";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
interface AddProductProps{
    onAddFruit:(fruit:Fruit) => void;
    onAddBundle:(bundle:Bundle)=>void;
}

export default function AddProduct({onAddFruit, onAddBundle}:AddProductProps){
    const [open, setOpen] = useState(false);
    // Fruit Form State
  const [fruitData, setFruitData] = useState<Partial<Fruit>>({
    name: "",
    price: 0,
    unit: "kg",
    category:"berry",
    inStock: true,
  });

  // Bundle Form State
  const [bundleData, setBundleData] = useState<Partial<Bundle>>({
    name: "",
    price: 0,
    fruits: [],
    instock: true,
  });

  const handleFruitSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newFruit: Fruit = {
      ...fruitData,
      id: `f${Date.now()}`,
      image: "https://images.unsplash.com/photo-1610832958506-aa56338406cd?auto=format&fit=crop&w=300",
    } as Fruit;
    onAddFruit(newFruit);
    setOpen(false);
  };
return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-green-600 hover:bg-green-700 rounded-xl gap-2">
          <Plus className="h-4 w-4" /> Бараа нэмэх
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] rounded-2xl">
        <DialogHeader>
          <DialogTitle className="font-serif text-xl">Шинэ бараа бүртгэх</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="fruit" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="fruit" className="gap-2">
              <Apple className="h-4 w-4" /> Жимс
            </TabsTrigger>
            <TabsTrigger value="bundle" className="gap-2">
              <Package className="h-4 w-4" /> Багц
            </TabsTrigger>
          </TabsList>

          <TabsContent value="fruit">
            <form onSubmit={handleFruitSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 ml-1">ЖИМСНИЙ НЭР</label>
                <Input
                  placeholder="Жишээ: Улаан алим"
                  onChange={(e) => setFruitData({ ...fruitData, name: e.target.value })}
                  className="rounded-xl"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 ml-1">ҮНЭ (₮)</label>
                  <Input
                    type="number"
                    placeholder="12000"
                    onChange={(e) => setFruitData({ ...fruitData, price: Number(e.target.value) })}
                    className="rounded-xl"
                    required
                  />
                </div>
<div className="space-y-1">
  <label className="text-xs font-bold text-slate-500 ml-1">ХЭМЖИХ НЭГЖ</label>
  <Select 
    onValueChange={(val) => setFruitData({ ...fruitData, unit: val as any })}
    defaultValue="kg"
  >
    <SelectTrigger className="rounded-xl">
      <SelectValue placeholder="Сонгох" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="kg">кг (Kilogram)</SelectItem>
      <SelectItem value="piece">ш (Piece)</SelectItem>
      <SelectItem value="box">хайрцаг (Box)</SelectItem>
    </SelectContent>
  </Select>
</div>
              </div>
              <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 rounded-xl mt-4">
                Жимс хадгалах
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="bundle">
            {/* Similar form for Bundles could go here */}
            <div className="p-4 text-center text-sm text-slate-500 italic">
              Багцын нэр болон үнэ оруулах хэсэг...
            </div>
            <Button className="w-full bg-blue-600 hover:bg-blue-700 rounded-xl">
               Багц хадгалах
            </Button>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}