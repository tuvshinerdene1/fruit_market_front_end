import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface SearchFormProps{
    value: string;
    onChange:(val:string)=> void;
    onSearch:(e: React.FormEvent) => void;
}

export function OrderSearchForm({ value, onChange, onSearch }: SearchFormProps) {
  return (
    <Card className="shadow-lg border-primary/10">
      <CardContent className="pt-6">
        <form onSubmit={onSearch} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Enter phone number..."
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button type="submit" size="lg">Track Order</Button>
        </form>
      </CardContent>
    </Card>
  );
}