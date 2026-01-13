"use client"

export const useCart = () => {
    const addToCart = (productId: string, quantity: number) => {
        const cart = JSON.parse(localStorage.getItem("cart") || "[]");

        const existingItemIndex = cart.findIndex((item: any) => item.id === productId);
        let newCart = [...cart];

        if (existingItemIndex !== -1) {
            // Update quantity
            newCart[existingItemIndex].quantity += quantity;
        } else {
            // Add new item
            newCart.push({ id: productId, quantity: quantity });
        }
        // 3. Save back to storage
        localStorage.setItem("cart", JSON.stringify(newCart));

        // 4. Trigger event so Navbar updates immediately
        window.dispatchEvent(new Event("cartUpdated"));
    };

    return { addToCart };

}
