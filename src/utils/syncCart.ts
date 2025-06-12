import axios from 'axios';
import { useCartStore } from '../store/cartStore';
import { BASE_URL } from "../config/config";

export const syncCartToBackend = async (token, userId) => {
  const localCart = useCartStore.getState().cart;

  if (!localCart || localCart.length === 0) {
    console.log("No local cart items to sync");
    return;
  }

  try {
    // Get existing backend cart
    const res = await axios.get(`${BASE_URL}/api/cart`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const backendCart = res.data.items || [];

    // Create a map for efficient lookup
    const backendCartMap = new Map(backendCart.map(item => [item.productId, item.quantity]));

    // Sync each local cart item
    for (const item of localCart) {
      const backendQuantity = Number(backendCartMap.get(item.id)) || 0;
      const newQuantity = backendQuantity + Number(item.quantity);

      await axios.post(
        `${BASE_URL}/api/cart`,
        {
          productId: item.id,
          quantity: newQuantity,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    }

    console.log("Cart synced with backend successfully");
  } catch (error) {
    console.error("Failed to sync cart:", error);
    throw error; // Re-throw to handle in calling function if needed
  }
};

export const clearLocalCart = () => {
  useCartStore.getState().clearCart();
};