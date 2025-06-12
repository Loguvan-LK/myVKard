import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiShoppingCart, FiMenu, FiX, FiChevronDown } from "react-icons/fi";
import { useCartStore } from "../store/cartStore";
import { useAuthStore } from "../store/authStore";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import { BASE_URL } from "../config/config";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showCartNotification, setShowCartNotification] = useState(false);

  const { cart, clearCart, getTotalQuantity } = useCartStore();
  const { user, logout } = useAuthStore();
  const token = localStorage.getItem("token");

  const isActive = (path) => location.pathname === path;
  const cartCount = getTotalQuantity();
  const isHeaderFixed = cartCount > 0;

  // Handle scroll effect for glass morphism
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Show cart notification when items are added
  useEffect(() => {
    if (cartCount > 0 && isHeaderFixed) {
      setShowCartNotification(true);
      const timer = setTimeout(() => setShowCartNotification(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [cartCount, isHeaderFixed]);

  const handleProceedToCheckout = async () => {
    if (!token || !user) {
      toast.error("Please log in to proceed");
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
          email: user.email,
        }),
      });

      const data = await response.json();
      if (data.success && data.url) {
        localStorage.setItem(
          "checkout_session",
          JSON.stringify({
            sessionId: data.sessionId,
            quantity: totalQuantity,
          })
        );
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
    <>
      {/* Spacer for fixed header */}
      <div className={`transition-all duration-500 ${isHeaderFixed ? 'h-20 md:h-24' : 'h-0'}`} />
      
      {/* Floating Cart Notification */}
      <div className={`fixed top-4 right-4 z-[60] transform transition-all duration-700 ease-out ${
        showCartNotification && isHeaderFixed 
          ? 'translate-y-0 opacity-100 scale-100' 
          : '-translate-y-full opacity-0 scale-95'
      }`}>
        <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-full shadow-2xl backdrop-blur-lg border border-white/20">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            <span className="font-medium">🛒 {cartCount} item{cartCount > 1 ? 's' : ''} added!</span>
          </div>
        </div>
      </div>

      <header className={`
        ${isHeaderFixed ? 'fixed' : 'relative'} 
        top-0 w-full z-50 
        transition-all duration-700 ease-out
        ${isHeaderFixed && isScrolled 
          ? 'bg-[#004672]/95 backdrop-blur-xl border-b border-white/10 shadow-2xl' 
          : 'bg-[#004672]'
        }
        ${isHeaderFixed ? 'animate-slideDown' : ''}
      `}>
        
        {/* Animated background gradient overlay */}
        <div className={`absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 transition-opacity duration-1000 ${
          isHeaderFixed ? 'opacity-100' : 'opacity-0'
        }`} />
        
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <nav className="h-20 md:h-24 flex items-center justify-between relative">
            
            {/* Mobile: Hamburger */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-white focus:outline-none group transition-all duration-300 hover:scale-110"
              >
                <div className="relative">
                  {mobileMenuOpen ? (
                    <FiX size={28} className="transform rotate-0 transition-transform duration-300" />
                  ) : (
                    <FiMenu size={28} className="transform rotate-0 transition-transform duration-300 group-hover:rotate-180" />
                  )}
                </div>
              </button>
            </div>

            {/* Mobile: Logo */}
            <div className="md:hidden flex justify-center flex-1">
              <Link to="/" className="transform transition-all duration-300 hover:scale-105">
                <img src="/assets/Logo.svg" alt="Logo" className="h-10 w-auto" />
              </Link>
            </div>

            {/* Desktop: Navigation Links */}
            <div className="hidden md:flex space-x-10 items-center z-20">
              {["/", "/nfc-business-cards", "/blog", "/contact"].map((path, index) => (
                <Link
                  key={path}
                  to={path}
                  className={`
                    text-base font-medium relative group
                    ${isActive(path) ? "text-orange-500" : "text-white hover:text-orange-400"}
                    transition-all duration-300 transform hover:scale-110
                  `}
                  style={{
                    animationDelay: isHeaderFixed ? `${index * 100}ms` : '0ms'
                  }}
                >
                  {getLinkLabel(path)}
                  <span className={`
                    absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-orange-400 to-orange-600
                    transition-all duration-300 transform origin-left
                    ${isActive(path) ? 'w-full scale-x-100' : 'w-0 group-hover:w-full group-hover:scale-x-100'}
                  `} />
                </Link>
              ))}
            </div>

            {/* Desktop: Logo with pulsing effect when cart has items */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 z-10 pointer-events-none">
              <div className={`
                transition-all duration-500 transform
                ${isHeaderFixed ? 'scale-95 animate-pulse' : 'scale-100'}
              `}>
                <img src="/assets/Logo.svg" alt="Logo" className="h-16 w-auto" />
              </div>
            </div>

            {/* Right: Enhanced Cart and Auth Section */}
            <div className="flex items-center space-x-4 z-20">
              
              {/* Animated Cart Icon */}
              <Link 
                to="/nfc-business-cards" 
                className="relative cursor-pointer group transform transition-all duration-300 hover:scale-110"
              >
                <div className="relative">
                  <FiShoppingCart 
                    className={`
                      text-white transition-all duration-300 
                      ${cartCount > 0 ? 'animate-bounce' : ''}
                    `} 
                    size={24} 
                  />
                  
                  {/* Enhanced cart badge with multiple animations */}
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold shadow-lg transform transition-all duration-300 animate-pulse group-hover:scale-125">
                      {cartCount}
                      <span className="absolute inset-0 rounded-full bg-red-400 animate-ping opacity-75"></span>
                    </span>
                  )}
                  
                  {/* Floating particles effect */}
                  {cartCount > 0 && (
                    <>
                      <div className="absolute -top-1 -right-1 w-1 h-1 bg-yellow-400 rounded-full animate-ping" style={{animationDelay: '0.5s'}}></div>
                      <div className="absolute -top-2 right-0 w-1 h-1 bg-blue-400 rounded-full animate-ping" style={{animationDelay: '1s'}}></div>
                      <div className="absolute top-0 -right-2 w-1 h-1 bg-green-400 rounded-full animate-ping" style={{animationDelay: '1.5s'}}></div>
                    </>
                  )}
                </div>
              </Link>

              {/* Enhanced Auth Section */}
              <div className="hidden md:flex items-center space-x-6">
                {token && user ? (
                  <div className="relative">
                    <button
                      onClick={() => setDropdownOpen((prev) => !prev)}
                      className="text-white text-base flex items-center space-x-2 group transition-all duration-300 hover:text-orange-400 transform hover:scale-105"
                    >
                      <span className="relative">
                        Hello, {user.email.split('@')[0]}
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-400 transition-all duration-300 group-hover:w-full"></span>
                      </span>
                      <FiChevronDown className={`transition-transform duration-300 ${dropdownOpen ? 'rotate-180' : 'rotate-0'}`} />
                    </button>

                    {/* Enhanced Dropdown */}
                    {dropdownOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-white/95 backdrop-blur-xl rounded-xl shadow-2xl py-2 z-50 border border-white/20 transform transition-all duration-300 animate-slideDown">
                        <Link
                          to="/dashboard"
                          className="block px-4 py-3 text-sm text-gray-800 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-200 transform hover:scale-105 rounded-lg mx-2"
                          onClick={() => setDropdownOpen(false)}
                        >
                          📊 Dashboard
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 transition-all duration-200 transform hover:scale-105 rounded-lg mx-2"
                        >
                          🚀 Logout
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="bg-gradient-to-r from-[#ff850a] to-[#ff6b35] hover:from-[#e67600] hover:to-[#e55a2b] text-white px-6 py-3 rounded-xl text-base font-medium shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:-translate-y-1"
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-3 rounded-xl text-base font-medium shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:-translate-y-1"
                    >
                      Register
                    </Link>
                  </>
                )}
              </div>
            </div>
          </nav>

          {/* Enhanced Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden absolute top-20 left-0 w-full bg-[#004672]/95 backdrop-blur-xl z-40 border-t border-white/10 shadow-2xl">
              <div className="flex flex-col items-center py-6 space-y-4">
                {["/", "/nfc-business-cards", "/blog", "/contact"].map((path, index) => (
                  <Link
                    key={path}
                    to={path}
                    className="text-white py-3 text-base font-medium transform transition-all duration-300 hover:text-orange-400 hover:scale-110 relative group"
                    onClick={() => setMobileMenuOpen(false)}
                    style={{
                      animationDelay: `${index * 100}ms`
                    }}
                  >
                    {getLinkLabel(path)}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-400 transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                ))}
                
                {token && user && (
                  <Link
                    to="/dashboard"
                    className="text-white py-3 text-base font-medium transform transition-all duration-300 hover:text-orange-400 hover:scale-110"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    📊 Dashboard
                  </Link>
                )}
                
                <div className="pt-4 border-t border-white/20 w-full flex flex-col items-center space-y-3">
                  {token && user ? (
                    <button
                      onClick={() => {
                        handleLogout();
                        setMobileMenuOpen(false);
                      }}
                      className="bg-gradient-to-r from-red-500 to-pink-500 text-white py-3 px-8 rounded-xl font-medium transform transition-all duration-300 hover:scale-105 shadow-lg"
                    >
                      🚀 Logout
                    </button>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        className="bg-gradient-to-r from-[#ff850a] to-[#ff6b35] text-white py-3 px-8 rounded-xl font-medium transform transition-all duration-300 hover:scale-105 shadow-lg"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Login
                      </Link>
                      <Link
                        to="/register"
                        className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-8 rounded-xl font-medium transform transition-all duration-300 hover:scale-105 shadow-lg"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Register
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Animated bottom border when fixed */}
          <div className={`
            absolute bottom-0 left-0 h-1 bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600
            transition-all duration-1000 transform origin-left
            ${isHeaderFixed ? 'w-full scale-x-100' : 'w-0 scale-x-0'}
          `} />
        </div>
      </header>

      {/* Custom CSS for animations */}
      <style>{`
        @keyframes slideDown {
          from {
            transform: translateY(-100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        
        .animate-slideDown {
          animation: slideDown 0.7s ease-out;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </>
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