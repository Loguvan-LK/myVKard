import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiShoppingCart, FiMenu, FiX } from "react-icons/fi";
import { useCartStore } from "../store/cartStore";
import { useAuthStore } from "../store/authStore";
import toast from "react-hot-toast";
import { useState } from "react";
import { BASE_URL } from "../config/config";
const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const { cart, isCartOpen, setCartOpen, clearCart, getTotalQuantity } = useCartStore();
  const { user, logout } = useAuthStore();
  const token = localStorage.getItem("token");

  const isActive = (path) => location.pathname === path;

  const cartCount = getTotalQuantity();

  const handleProceedToCheckout = async () => {
    if (!token || !user) {
      toast.error("Please log in to proceed");
      setCartOpen(false);
      navigate("/login");
      return;
    }

    const totalQuantity = getTotalQuantity();
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
        body: JSON.stringify({ 
          quantity: totalQuantity,
          email: user.email 
        }),
      });

      const data = await response.json();
      if (data.success && data.url) {
        // Store checkout session info for later cleanup
        localStorage.setItem('checkout_session', JSON.stringify({
          sessionId: data.sessionId,
          quantity: totalQuantity
        }));
        window.location.href = data.url;
      } else {
        throw new Error(data.message || "Something went wrong");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to initiate purchase");
    }
  };

  const handleLogout = () => {
    logout();
    clearCart();
    toast.success("Logged out successfully");
    navigate("/");
    setDropdownOpen(false);
  };

  return (
    <header className="bg-[#004672] w-full top-0 z-50 shadow-md relative">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="h-20 md:h-24 flex items-center justify-between relative">
          {/* Mobile: Hamburger */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white focus:outline-none"
            >
              {mobileMenuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
            </button>
          </div>

          {/* Mobile: Logo */}
          <div className="md:hidden flex justify-center flex-1">
            <Link to="/">
              <img src="/assets/Logo.svg" alt="Logo" className="h-10 w-auto" />
            </Link>
          </div>

          {/* Desktop: Navigation Links */}
          <div className="hidden md:flex space-x-10 items-center z-20">
            {["/", "/nfc-business-cards", "/blog", "/contact"].map((path) => (
              <Link
                key={path}
                to={path}
                className={`text-base font-medium ${
                  isActive(path)
                    ? "text-orange-500"
                    : "text-white hover:text-orange-400"
                } transition`}
              >
                {getLinkLabel(path)}
              </Link>
            ))}
          </div>

          {/* Desktop: Logo */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 z-10 pointer-events-none">
            <img src="/assets/Logo.svg" alt="Logo" className="h-16 w-auto" />
          </div>

          {/* Right: Cart and Login/Logout */}
          <div className="flex items-center space-x-4 z-20">
            <div
              className="relative cursor-pointer"
              onClick={() => setCartOpen(!isCartOpen)}
            >
              <FiShoppingCart className="text-white" size={24} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </div>
            <div className="hidden md:flex items-center space-x-6">
              {token && user ? (
                <div className="relative">
                  <button
                    onClick={() => setDropdownOpen((prev) => !prev)}
                    className="text-white text-base flex items-center space-x-1"
                  >
                    <span>Hello, {user.email.split('@')[0]}</span>
                    <span>▼</span>
                  </button>

                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50">
                      <Link
                        to="/dashboard"
                        className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
                        onClick={() => setDropdownOpen(false)}
                      >
                        Dashboard
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="bg-[#ff850a] hover:bg-[#e67600] text-white px-6 py-3 rounded-lg text-base"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="bg-[#ff850a] hover:bg-[#e67600] text-white px-6 py-3 rounded-lg text-base"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 w-full bg-[#004672] z-40">
            <div className="flex flex-col items-center py-4">
              {["/", "/nfc-business-cards", "/blog", "/contact"].map((path) => (
                <Link
                  key={path}
                  to={path}
                  className="text-white py-2 text-base"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {getLinkLabel(path)}
                </Link>
              ))}
              {token && user && (
                <Link
                  to="/dashboard"
                  className="text-white py-2 text-base"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
              )}
              {token && user ? (
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="text-white py-2 text-base"
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-white py-2 text-base"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="text-white py-2 text-base"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        )}

        {/* Cart Modal */}
        {isCartOpen && (
          <div className="absolute right-4 top-20 bg-white text-black shadow-lg rounded-lg w-80 p-4 z-50">
            <button
              onClick={() => setCartOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              <FiX size={20} />
            </button>
            <h3 className="text-lg font-semibold mb-2">Your Cart</h3>
            {cart.length === 0 ? (
              <p className="text-gray-500">Cart is empty.</p>
            ) : (
              <>
                <ul className="space-y-2 mb-4">
                  {cart.map((item) => (
                    <li
                      key={item.id}
                      className="flex justify-between border-b pb-2"
                    >
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-600">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <p className="font-semibold">${item.price * item.quantity}</p>
                    </li>
                  ))}
                </ul>
                <div className="border-t pt-2 mb-4">
                  <p className="text-lg font-bold">
                    Total: ${cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)}
                  </p>
                </div>
                <div className="space-y-2">
                  <Link
                    to="/cart"
                    onClick={() => setCartOpen(false)}
                    className="bg-gray-600 text-white px-4 py-2 rounded w-full text-center block hover:bg-gray-700"
                  >
                    View Cart
                  </Link>
                  <button
                    onClick={handleProceedToCheckout}
                    className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700"
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

function getLinkLabel(path) {
  switch (path) {
    case "/":
      return "Home";
    case "/nfc-business-cards":
      return "NFC Business Cards";
    case "/blog":
      return "Blog";
    case "/contact":
      return "Contact";
    default:
      return "";
  }
}

export default Header;