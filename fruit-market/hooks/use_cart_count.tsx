import { useState, useEffect } from "react";

export function useCartCount() {
  const [count, setCount] = useState(0);

  const updateCount = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const total = cart.reduce((acc: number, item: any) => acc + item.quantity, 0);
    setCount(total);
  };

  useEffect(() => {
    updateCount();
    window.addEventListener("cartUpdated", updateCount);
    // Also listen for storage changes from other tabs
    window.addEventListener("storage", updateCount); 
    return () => {
      window.removeEventListener("cartUpdated", updateCount);
      window.removeEventListener("storage", updateCount);
    };
  }, []);

  return count;
}