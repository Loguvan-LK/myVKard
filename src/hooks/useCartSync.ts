// src/hooks/useCartSync.ts
import { useCartStore } from '../store/cartStore';
import { useEffect } from 'react';
import axios from 'axios';

export const useCartSync = (profileId: string | null) => {
  const cartItems = useCartStore((state) => state.cart); // ✅ updated path

  useEffect(() => {
    if (!profileId) return;
    const sync = setTimeout(() => {
      axios.post('/cart/sync', {
        profileId,
        items: cartItems,
      });
    }, 500); // debounce

    return () => clearTimeout(sync);
  }, [cartItems, profileId]);
};
