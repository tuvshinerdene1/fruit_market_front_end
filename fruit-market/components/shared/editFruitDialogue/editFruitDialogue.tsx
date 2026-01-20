"use client";

import { useState, useEffect } from "react";
import { Fruit } from "@/types/fruit";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface EditFruitDialogProps {
  fruit: Fruit | null; // If null, dialog is closed
  onClose: () => void;
  onSave: (updatedFruit: Fruit) => void;
}

export function EditFruitDialog({ fruit, onClose, onSave }: EditFruitDialogProps) {
  const [formData, setFormData] = useState<Fruit | null>(null);

  // When a fruit is passed in, set the form state
  useEffect(() => {
    if (fruit) setFormData(fruit);
  }, [fruit]);

  if (!formData) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <Dialog open={!!fruit} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px] rounded-2xl">
        <DialogHeader>
          <DialogTitle className="font-serif text-xl">Мэдээлэл засах: {fruit?.name}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500">НЭР</label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="rounded-xl"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500">ҮНЭ</label>
              <Input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                className="rounded-xl"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500">НЭГЖ</label>
              <Select 
                value={formData.unit}
                onValueChange={(val) => setFormData({ ...formData, unit: val as any })}
              >
                <SelectTrigger className="rounded-xl"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="kg">кг</SelectItem>
                  <SelectItem value="piece">ш</SelectItem>
                  <SelectItem value="box">хайрцаг</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 rounded-xl">Өөрчлөлтийг хадгалах</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}