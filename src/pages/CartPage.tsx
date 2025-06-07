import { useCartStore } from "../store/cartStore";
import { FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity } = useCartStore();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    if (!token) {
      toast.error("Please login to proceed");
      navigate("/login");
      return;
    }

    const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);
    if (totalQuantity === 0) {
      toast.error("Cart is empty");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/purchase", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ quantity: totalQuantity }),
      });

      const data = await response.json();
      if (data.success && data.url) {
        window.location.href = data.url;
      } else {
        throw new Error(data.message || "Something went wrong");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to redirect to Stripe checkout");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
      <div className="lg:col-span-2 space-y-4">
        <h2 className="text-2xl font-bold">Your Cart</h2>
        {cart.length === 0 ? (
          <p className="text-gray-500">Your cart is currently empty.</p>
        ) : (
          cart.map((item) => (
            <div key={item.id} className="flex justify-between items-center border p-4 rounded-md shadow-sm">
              <div>
                <p className="font-semibold text-lg">{item.name}</p>
                <div className="text-gray-600 text-sm">Price: ${item.price}</div>
                <div className="text-sm mt-1">
                  Qty:{" "}
                  <input
                    type="number"
                    min={1}
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                    className="border px-2 py-1 w-16 rounded"
                  />
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <p className="text-right font-medium">${item.price * item.quantity}</p>
                <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700">
                  <FiTrash2 size={20} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="border p-6 rounded-md shadow-lg h-fit bg-gray-50">
        <h3 className="text-xl font-bold mb-4">Order Summary</h3>
        <div className="flex justify-between mb-2">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between mb-4">
          <span>Total</span>
          <span className="font-semibold text-lg">${subtotal.toFixed(2)}</span>
        </div>
        <button
          onClick={handleCheckout}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default CartPage;