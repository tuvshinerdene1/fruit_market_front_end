"use client";
import { useState, useEffect, useCallback } from "react";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";

interface LikeButtonProps {
  productId: string;
}

export function LikeButton({ productId }: LikeButtonProps) {
  const [isLiked, setIsLiked] = useState(false);

  // 1. Move the check logic to a reusable function
  const checkLikeStatus = useCallback(() => {
    if (typeof window !== "undefined") {
      const favourites = JSON.parse(localStorage.getItem("favourites") || "[]");
      setIsLiked(favourites.includes(productId));
    }
  }, [productId]);

  useEffect(() => {
    // 2. Check status on mount
    checkLikeStatus();

    // 3. Listen for the custom event we dispatch
    window.addEventListener("favouritesUpdated", checkLikeStatus);

    // 4. Also listen for storage changes (handles sync across different browser tabs)
    window.addEventListener("storage", checkLikeStatus);

    return () => {
      window.removeEventListener("favouritesUpdated", checkLikeStatus);
      window.removeEventListener("storage", checkLikeStatus);
    };
  }, [checkLikeStatus]);

  const toggleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const favourites = JSON.parse(localStorage.getItem("favourites") || "[]");
    let newFavourites;

    if (isLiked) {
      newFavourites = favourites.filter((id: string) => id !== productId);
    } else {
      newFavourites = [...favourites, productId];
    }

    localStorage.setItem("favourites", JSON.stringify(newFavourites));
    
    // 5. This triggers the event listeners in ALL LikeButton instances
    window.dispatchEvent(new Event("favouritesUpdated"));
  };

  return (
    <button
      onClick={toggleLike}
      className="group p-2.5 rounded-full bg-slate-50 border border-slate-100 shadow-sm hover:scale-110 active:scale-95 transition-all flex items-center justify-center"
    >
      <Heart
        className={cn(
          "h-5 w-5 transition-colors duration-300",
          isLiked ? "fill-red-500 text-red-500" : "text-slate-400 group-hover:text-red-400"
        )}
      />
    </button>
  );
}