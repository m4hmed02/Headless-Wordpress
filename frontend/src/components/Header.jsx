import { Link } from 'react-router-dom';
import cartIcon from '../assets/cart.svg';
import userIcon from '../assets/user.svg';

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Brand Name */}
          <Link to="/" className="flex items-center space-x-2 flex-shrink-0">
            <span className="bg-blue-600 text-white p-2 rounded-lg font-black text-sm">WP</span>
            <span className="font-semibold text-gray-900">Headless Store</span>
          </Link>

          {/* Navigation Menu */}
          <nav className="hidden md:flex space-x-6 items-center">
            <Link
              to="/"
              className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors py-2"
            >
              Home
            </Link>
            <Link
              to="/cart"
              className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors py-2"
            >
              Cart
            </Link>
            <Link
              to="/checkout"
              className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors py-2"
            >
              Checkout
            </Link>
            <Link
              to="/my-account"
              className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors py-2"
            >
              My Account
            </Link>
          </nav>

          {/* Actions / Utilities */}
          <div className="flex items-center space-x-4">
            <Link
              to="/cart"
              className="text-gray-700 hover:text-blue-600 p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Cart"
            >
              <img src={cartIcon} alt="Cart" className="w-6 h-6" />
            </Link>
            <Link
              to="/my-account"
              className="text-gray-700 hover:text-blue-600 p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Account"
            >
              <img src={userIcon} alt="Account" className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}


