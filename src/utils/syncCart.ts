import axios from 'axios';
import { useCartStore } from '../store/cartStore';

export const syncCartToBackend = async (token, userId) => {
  const localCart = useCartStore.getState().cart;

  try {
    const res = await axios.get('http://localhost:5000/api/cart', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const backendCart = res.data.items || [];

    const backendCartMap = new Map(backendCart.map(item => [item.productId, item.quantity]));

    for (const item of localCart) {
      const backendQuantity = Number(backendCartMap.get(item.id)) || 0;
      const newQuantity = backendQuantity + Number(item.quantity);

      await axios.post(
        'http://localhost:5000/api/cart',
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
  }
};

export const clearLocalCart = () => {
  useCartStore.getState().clearCart();
};