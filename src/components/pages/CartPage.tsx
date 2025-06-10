import { useCartStore } from "../../store/cartStore";
import { FiTrash2, FiPlus, FiMinus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { BASE_URL } from "../../config/config";

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
      const response = await fetch(`${BASE_URL}/api/purchase`, {
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
      <div className="lg:col-span-2 space-y-6">
        <h2 className="text-3xl font-bold mb-4">🛒 Your Shopping Cart</h2>

        {cart.length === 0 ? (
          <div className="text-center text-gray-500 py-10">
            <img
              src="https://www.svgrepo.com/show/521741/empty-cart.svg"
              alt="Empty Cart"
              className="mx-auto w-40 h-40 mb-6 opacity-60"
            />
            <p className="text-lg">Your cart is currently empty.</p>
          </div>
        ) : (
          cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between border rounded-lg shadow-md p-4 bg-white"
            >
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center text-gray-400">
                  <span className="text-4xl">📦</span>
                </div>
                <div>
                  <p className="text-lg font-semibold">{item.name}</p>
                  <p className="text-sm text-gray-500">Unit Price: ${item.price.toFixed(2)}</p>
                  <div className="flex items-center mt-2 gap-2">
                    <button
                      className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                      onClick={() =>
                        updateQuantity(item.id, Math.max(item.quantity - 1, 1))
                      }
                    >
                      <FiMinus />
                    </button>
                    <input
                      type="number"
                      min={1}
                      value={item.quantity}
                      onChange={(e) =>
                        updateQuantity(item.id, parseInt(e.target.value) || 1)
                      }
                      className="border w-16 text-center rounded px-2 py-1"
                    />
                    <button
                      className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <FiPlus />
                    </button>
                  </div>
                </div>
              </div>

              <div className="text-right space-y-2">
                <p className="font-bold text-blue-600">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FiTrash2 size={20} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* ORDER SUMMARY */}
      <div className="bg-white border rounded-lg shadow-md p-6 h-fit sticky top-6">
        <h3 className="text-xl font-bold mb-4 border-b pb-2">🧾 Order Summary</h3>
        <div className="flex justify-between text-gray-600 mb-2">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-600 mb-2">
          <span>Shipping</span>
          <span className="text-green-600 font-medium">FREE</span>
        </div>
        <div className="flex justify-between text-lg font-semibold mt-4 border-t pt-4">
          <span>Total</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <button
          onClick={handleCheckout}
          className="mt-6 w-full bg-blue-600 hover:bg-blue-700 transition text-white py-3 rounded-lg font-medium"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default CartPage;
