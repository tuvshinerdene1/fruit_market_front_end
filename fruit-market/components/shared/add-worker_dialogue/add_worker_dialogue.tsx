"use client";

import { useState } from "react";
import { Worker } from "@/types/worker";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";

interface AddWorkerDialogProps {
  onAdd: (worker: Worker) => void;
}

export function AddWorkerDialog({ onAdd }: AddWorkerDialogProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<Worker>>({
    name: "",
    phone_number: "",
    role: "packer",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create a new worker object with a random ID for now
    const newWorker: Worker = {
      id: `w${Math.floor(Math.random() * 1000)}`,
      name: formData.name || "Шинэ ажилтан",
      phone_number: formData.phone_number || "",
      role: formData.role as any,
      password: formData.password || "1234", // Default password
    };

    onAdd(newWorker);
    setOpen(false); // Close modal
    setFormData({ name: "", phone_number: "", role: "packer", password: "" }); // Reset form
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-green-600 hover:bg-green-700 rounded-xl gap-2">
          <Plus className="h-4 w-4" /> Ажилтан нэмэх
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] rounded-2xl">
        <DialogHeader>
          <DialogTitle className="font-serif text-xl">Шинэ ажилтан бүртгэх</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 ml-1">НЭР</label>
            <Input
              placeholder="Жишээ: Дорж"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="rounded-xl"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 ml-1">УТАСНЫ ДУГААР</label>
            <Input
              placeholder="9911..."
              value={formData.phone_number}
              onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
              required
              className="rounded-xl"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 ml-1">АЛБАН ТУШААЛ</label>
            <Select
              value={formData.role}
              onValueChange={(val) => setFormData({ ...formData, role: val as any })}
            >
              <SelectTrigger className="rounded-xl">
                <SelectValue placeholder="Сонгох" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Админ</SelectItem>
                <SelectItem value="packer">Савлагч</SelectItem>
                <SelectItem value="driver">Жолооч</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 ml-1">НЭВТРЭХ НУУЦ ҮГ</label>
            <Input
              type="password"
              placeholder="****"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
              className="rounded-xl"
            />
          </div>
          <DialogFooter className="pt-4">
            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 rounded-xl">
              Бүртгэх
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}