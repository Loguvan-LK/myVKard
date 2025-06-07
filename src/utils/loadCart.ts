import axios from "axios";
import { useCartStore } from "../store/cartStore";

export const loadCartFromBackend = async (token) => {
  try {
    const res = await axios.get("http://localhost:5000/api/cart", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const backendItems = res.data.items || [];

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