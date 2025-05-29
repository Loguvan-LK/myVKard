import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';

const Header = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  return (
    <header className="bg-[#004672] w-full top-0 z-50 shadow-md">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="h-20 md:h-24 flex items-center justify-between relative">
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white focus:outline-none mr-2"
            >
              {mobileMenuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
            </button>
            {/* Mobile Logo */}
            <Link to="/" className="md:hidden">
              <img 
                src="/assets/Logo.svg" 
                alt="MyVkard Logo" 
                className="h-10 w-auto"
              />
            </Link>
          </div>
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-10 items-center z-20">
            {['/', '/nfc-business-cards', '/blog', '/contact'].map((path) => (
              <Link
                key={path}
                to={path}
                className={`text-base font-medium ${
                  isActive(path)
                    ? 'text-orange-500'
                    : 'text-white hover:text-orange-400'
                } transition`}
              >
                {getLinkLabel(path)}
              </Link>
            ))}
          </div>
          {/* Center Logo - Desktop only */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 z-10 pointer-events-none">
            <img 
              src="/assets/Logo.svg" 
              alt="MyVkard Logo" 
              className="h-16 w-auto"
            />
          </div>
          {/* Login / Register */}
          <div className="hidden md:flex items-center space-x-6 z-20">
            <Link 
              to="/login" 
              className="bg-[#ff850a] hover:bg-[#e67600] text-white px-6 py-3 rounded-lg shadow-[6px_6px_0_rgba(0,0,0,1)] text-base transition-transform duration-300"
            >
              Login
            </Link>
            <Link 
              to="/register" 
              className="bg-[#ff850a] hover:bg-[#e67600] text-white px-6 py-3 rounded-lg shadow-[6px_6px_0_rgba(0,0,0,1)] text-base transition-transform duration-300"
            >
              Register
            </Link>
          </div>
        </nav>
        {/* Mobile Dropdown */}
        <div
          className={`md:hidden bg-[#004672] overflow-hidden transition-all duration-300 ease-in-out ${
            mobileMenuOpen ? 'max-h-[1000px] py-4 border-t border-blue-800' : 'max-h-0'
          }`}
        >
          <div className="flex flex-col space-y-6 px-6">
            {['/', '/nfc-business-cards', '/blog', '/contact'].map((path) => (
              <Link
                key={path}
                to={path}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-lg px-4 py-3 ${
                  isActive(path)
                    ? 'text-orange-500 bg-blue-900 rounded-lg'
                    : 'text-white hover:text-orange-400'
                } transition`}
              >
                {getLinkLabel(path)}
              </Link>
            ))}
            <div className="flex flex-col space-y-4 pt-4 border-t border-blue-800">
              <Link 
                to="/login" 
                className="bg-[#ff860b] hover:bg-[#e67600] text-white px-6 py-3 rounded-lg shadow-[6px_6px_0_rgba(0,0,0,1)] text-base"
              >
                Login
              </Link>
              <Link 
                to="/register" 
                className="bg-[#ff860b] hover:bg-[#e67600] text-white px-6 py-3 rounded-lg shadow-[6px_6px_0_rgba(0,0,0,1)] text-base"
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

function getLinkLabel(path) {
  switch(path) {
    case '/': return 'Home';
    case '/nfc-business-cards': return 'NFC Business Cards';
    case '/blog': return 'Blog';
    case '/contact': return 'Contact';
    default: return '';
  }
}

export default Header;