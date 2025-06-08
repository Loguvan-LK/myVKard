import axios from "axios";
import { useCartStore } from "../store/cartStore";
import { BASE_URL } from "../config/config";

export const loadCartFromBackend = async (token) => {
  try {
    const res = await axios.get(`${BASE_URL}api/cart`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const backendItems = res.data.items || [];

    if (backendItems.length === 0) {
      useCartStore.setState({ cart: [] }); // Ensure cart is empty if backend is empty
      return;
    }

    const formattedItems = backendItems.map((item) => ({
      id: item.productId,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      imageUrl: item.imageUrl,
    }));

    useCartStore.setState({ cart: formattedItems });
    
    console.log("Cart loaded from backend:", formattedItems);
  } catch (error) {
    console.error("Failed to load cart from backend:", error);
    useCartStore.setState({ cart: [] });
  }
};