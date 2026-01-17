"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { XCircle } from "lucide-react";
import { OrderStatus } from "@/types/order";

interface CancelOrderButtonProps {
  status: OrderStatus;
  orderId: string;
}

export function CancelOrderButton({ status, orderId }: CancelOrderButtonProps) {
  // Logic: Only allow cancellation if order is still 'pending'
  if (status !== "pending") return null;

  const handleCancel = () => {
    // In a real app, you would call your API here
    console.log(`Order ${orderId} has been cancelled`);
    alert("Order cancellation request sent!");
  };

  return (
    <div className="pt-4 border-t mt-6">
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive" className="w-full">
            <XCircle className="w-4 h-4 mr-2" />
            Cancel Order
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will cancel your order for fresh fruits. This action cannot
              be undone once confirmed by our staff.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Keep Order</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleCancel}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Confirm Cancellation
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}