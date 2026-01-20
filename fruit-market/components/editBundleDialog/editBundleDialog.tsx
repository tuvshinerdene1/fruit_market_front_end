"use client";

import { useState, useEffect } from "react";
import { Bundle } from "@/types/bundles";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface EditBundleDialogProps {
  bundle: Bundle | null;
  onClose: () => void;
  onSave: (updatedBundle: Bundle) => void;
}

export function EditBundleDialog({ bundle, onClose, onSave }: EditBundleDialogProps) {
  const [formData, setFormData] = useState<Bundle | null>(null);

  useEffect(() => {
    if (bundle) setFormData(bundle);
  }, [bundle]);

  if (!formData) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Dialog open={!!bundle} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px] rounded-2xl">
        <DialogHeader>
          <DialogTitle className="font-serif text-xl">Багц засах: {bundle?.name}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500">БАГЦЫН НЭР</label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="rounded-xl"
            />
          </div>
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
            <label className="text-xs font-bold text-slate-500">ОРСОН ЖИМСНҮҮД (Таслалаар тусгаарлах)</label>
            <Input
              value={formData.fruits.join(", ")}
              onChange={(e) => setFormData({ 
                ...formData, 
                fruits: e.target.value.split(",").map(item => item.trim()) 
              })}
              className="rounded-xl"
              placeholder="Алим, Банана..."
            />
          </div>
          <DialogFooter>
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 rounded-xl">
              Хадгалах
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}