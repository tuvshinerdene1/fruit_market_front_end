"use client"
import {useState, useEffect} from "react";
import {Heart} from "lucide-react";
import { cn } from "@/lib/utils";

interface LikeButtonProps {
    productId: String;
}

export function LikeButton({productId}: LikeButtonProps){
    const [isLiked, setIsLiked] = useState(false);

    // checking local storage on load
    useEffect(()=>{
        const favourites = JSON.parse(localStorage.getItem("favourites") || "[]");
        setIsLiked(favourites.includes(productId));
    },[productId]);

    const toggleLike = (e: React.MouseEvent) => {
        {/** preventing bubbling up to parent and preventing default wrapper behaviour */}
        e.preventDefault();
        e.stopPropagation();

        const favourites = JSON.parse(localStorage.getItem("favourites") || "[]");
        let newFavourites;

        if (isLiked) {
            newFavourites = favourites.filter((id:string) => id !== productId);
        }else{
            newFavourites = [...favourites, productId];
        }

        localStorage.setItem("favourites", JSON.stringify(newFavourites));
        setIsLiked(!isLiked);
    
        window.dispatchEvent(new Event("favouritesUpdated"));
    };

    return (
        <button
            onClick={toggleLike}
            className="group p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-sm hover:scale-110 transition-transform">
            <Heart
             className={cn(
          "h-5 w-5 transition-colors",
          isLiked ? "fill-red-500 text-red-500" : "text-slate-400 group-hover:text-red-400"
        )}>

            </Heart>
        </button>
    )

}