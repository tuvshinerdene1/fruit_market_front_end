import Link from "next/link";
import { AlertCircle, Phone, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface OrderNotFoundProps {
  phone: string;
}

export function OrderNotFound({ phone }: OrderNotFoundProps) {
  return (
    <Card className="border-destructive/20 bg-destructive/5 animate-in fade-in zoom-in duration-300">
      <CardContent className="flex flex-col items-center py-12 text-center space-y-6">
        <div className="p-4 bg-destructive/10 rounded-full text-destructive">
          <AlertCircle size={48} />
        </div>
        
        <div className="space-y-2 max-w-sm">
          <h2 className="text-2xl font-bold tracking-tight text-destructive">Order Not Found</h2>
          <p className="text-muted-foreground">
            We couldn't find any orders for <span className="font-bold text-foreground">{phone}</span>.
          </p>
        </div>
        
        <div className="flex flex-col gap-3 w-full max-w-xs">
          <Button asChild variant="outline">
            <Link href="/">
              <Home className="w-4 h-4 mr-2" /> Back to Home
            </Link>
          </Button>
          
          <div className="flex flex-col items-center gap-1 pt-4">
            <p className="text-xs text-muted-foreground uppercase font-bold tracking-widest">Need Help?</p>
            <div className="flex items-center gap-2 p-3 border rounded-lg bg-background shadow-sm w-full justify-center">
              <Phone className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-primary">Support: +84 999 000 111</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}