"use client";

import { Bundle } from "@/types/bundles";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit2, Trash2, ListChecks } from "lucide-react";

interface AdminBundleCardProps {
  bundle: Bundle;
  onEdit?: (bundle: Bundle) => void;
  onDelete?: (id: string) => void;
}

export function AdminBundleCard({ bundle, onEdit, onDelete }: AdminBundleCardProps) {
  return (
    <Card className="flex flex-col md:flex-row items-start md:items-center p-4 gap-4 border shadow-sm">
      <img 
        src={bundle.image} 
        alt={bundle.name} 
        className="h-20 w-full md:w-20 rounded-xl object-cover"
      />
      
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <h4 className="font-bold text-lg text-slate-900">{bundle.name}</h4>
          {!bundle.instock && <Badge variant="destructive">Захиалга хаагдсан</Badge>}
        </div>
        
        <p className="text-green-700 font-semibold mt-1">₮{bundle.price.toLocaleString()}</p>
        
        {/* List of fruits inside the bundle */}
        <div className="flex flex-wrap gap-1 mt-2">
          {bundle.fruits.map((f, i) => (
            <span key={i} className="text-[10px] bg-slate-100 px-2 py-0.5 rounded text-slate-600 border">
              {f}
            </span>
          ))}
        </div>
      </div>

      <div className="flex md:flex-col gap-2 w-full md:w-auto border-t md:border-t-0 pt-3 md:pt-0">
        <Button 
          variant="outline" 
          size="sm" 
          className="flex-1 md:w-24 gap-2 border-blue-200 text-blue-700 hover:bg-blue-50"
          onClick={() => onEdit?.(bundle)}
        >
          <Edit2 className="h-3.5 w-3.5" /> Засах
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className="flex-1 md:w-24 gap-2 border-red-200 text-red-600 hover:bg-red-50"
          onClick={() => onDelete?.(bundle.id)}
        >
          <Trash2 className="h-3.5 w-3.5" /> Устгах
        </Button>
      </div>
    </Card>
  );
}