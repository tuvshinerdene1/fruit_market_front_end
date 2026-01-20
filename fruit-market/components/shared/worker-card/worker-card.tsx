"use client";

import { useState } from "react";
import { Worker } from "@/types/worker";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

import { Phone, User, ShieldCheck, Truck, Package, X, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface WorkerCardProps {
  worker: Worker;
  onSave?: (updatedWorker: Worker) => void;
  onDelete?: (id: string) => void;
}

export function WorkerCard({ worker, onSave, onDelete }: WorkerCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Worker>(worker);

  const roleConfig = {
    admin: { label: "Админ", color: "bg-red-100 text-red-700 border-red-200", icon: ShieldCheck },
    packer: { label: "Савлагч", color: "bg-blue-100 text-blue-700 border-blue-200", icon: Package },
    driver: { label: "Жолооч", color: "bg-amber-100 text-amber-700 border-amber-200", icon: Truck },
  };

  const handleApply = () => {
    alert("Амжилттай зассан.");
    onSave?.(formData);
    setIsEditing(false);
  };

  const config = roleConfig[formData.role as keyof typeof roleConfig];
  const Icon = config.icon;

  return (
    <Card className="overflow-hidden border shadow-sm hover:shadow-md transition-shadow rounded-2xl bg-white">
      <CardContent className="p-5">
        {isEditing ? (
          /* EDIT MODE FORM */
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b pb-2">
              <span className="text-sm font-bold text-slate-500 uppercase">Засварлах</span>
              <Button variant="ghost" size="icon" onClick={() => setIsEditing(false)} className="h-8 w-8">
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Нэр</label>
                <Input 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="rounded-xl"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Утас</label>
                <Input 
                  value={formData.phone_number}
                  onChange={(e) => setFormData({...formData, phone_number: e.target.value})}
                  className="rounded-xl"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Эрх</label>
                <Select 
                  value={formData.role} 
                  onValueChange={(value) => setFormData({...formData, role: value as any})}
                >
                  <SelectTrigger className="rounded-xl">
                    <SelectValue placeholder="Role select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Админ</SelectItem>
                    <SelectItem value="packer">Савлагч</SelectItem>
                    <SelectItem value="driver">Жолооч</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button 
              className="w-full rounded-xl bg-green-600 hover:bg-green-700 mt-2 gap-2"
              onClick={handleApply}
            >
              <Check className="h-4 w-4" /> Хадгалах
            </Button>
          </div>
        ) : (
          /* DISPLAY MODE (Your Original Design) */
          <>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className={cn("h-12 w-12 rounded-2xl flex items-center justify-center font-bold text-lg", config.color)}>
                  {worker.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-lg">{worker.name}</h3>
                  <Badge variant="outline" className={cn("mt-1 font-medium", config.color)}>
                    <Icon className="h-3 w-3 mr-1" />
                    {config.label}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <div className="flex items-center text-sm text-slate-600 gap-3">
                <Phone className="h-4 w-4 text-slate-400" />
                <span className="font-medium">{worker.phone_number}</span>
              </div>
              <div className="flex items-center text-sm text-slate-600 gap-3">
                <User className="h-4 w-4 text-slate-400" />
                <span className="text-xs uppercase tracking-wider text-slate-400 font-bold">ID: {worker.id}</span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-50 flex gap-2">
              <Button 
                variant="outline" 
                className="flex-1 rounded-xl text-xs"
                onClick={() => setIsEditing(true)}
              >
                Засах
              </Button>
              <Button 
                variant="ghost" 
                className="flex-1 rounded-xl text-xs text-red-500 hover:text-red-600 hover:bg-red-50"
                onClick={() => onDelete?.(worker.id)}
              >
                Устгах
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}