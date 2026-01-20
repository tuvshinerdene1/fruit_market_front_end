"use client";

import { Fruit } from "@/types/fruit";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit2, Trash2 } from "lucide-react";

interface AdminFruitCardProps {
  fruit: Fruit;
  onEdit?: (fruit: Fruit) => void;
  onDelete?: (id: string) => void;
}

export function AdminFruitCard({ fruit, onEdit, onDelete }: AdminFruitCardProps) {
  return (
    <Card className="flex flex-col md:flex-row items-start md:items-center p-4 gap-4 border shadow-sm hover:shadow-md transition-shadow">
      {/* Larger image with rounded-xl to match Bundle Card */}
      <img 
        src={fruit.image} 
        alt={fruit.name} 
        className="h-20 w-full md:w-20 rounded-xl object-cover bg-slate-100"
      />
      
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <h4 className="font-bold text-lg text-slate-900">{fruit.name}</h4>
          {!fruit.inStock && (
            <Badge variant="destructive" className="text-[10px]">
              Дууссан
            </Badge>
          )}
        </div>
        
        {/* Price and Unit details formatted like the bundle price */}
        <p className="text-green-700 font-semibold mt-1">
          ₮{fruit.price.toLocaleString()} <span className="text-slate-400 text-sm font-normal">/ {fruit.unit}</span>
        </p>
        
        {/* Category Badge - Matches the position of bundle items */}
        <div className="mt-2">
          <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded text-slate-600 border uppercase tracking-wider font-medium">
            {fruit.category}
          </span>
        </div>
      </div>

      {/* Action Buttons: Standardized to the vertical/horizontal responsive stack */}
      <div className="flex md:flex-col gap-2 w-full md:w-auto border-t md:border-t-0 pt-3 md:pt-0">
        <Button 
          variant="outline" 
          size="sm" 
          className="flex-1 md:w-24 gap-2 border-blue-200 text-blue-700 hover:bg-blue-50 transition-colors"
          onClick={() => onEdit?.(fruit)}
        >
          <Edit2 className="h-3.5 w-3.5" /> Засах
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className="flex-1 md:w-24 gap-2 border-red-200 text-red-600 hover:bg-red-50 transition-colors"
          onClick={() => onDelete?.(fruit.id)}
        >
          <Trash2 className="h-3.5 w-3.5" /> Устгах
        </Button>
      </div>
    </Card>
  );
}