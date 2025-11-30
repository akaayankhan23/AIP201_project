import { useState, useEffect } from 'react';
import { ShoppingCart, User, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

interface NavbarProps {
  cartItemCount: number;
  onCartClick: () => void;
  onAuthClick: () => void;
}

export default function Navbar({ cartItemCount, onCartClick, onAuthClick }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-lg shadow-lg py-4'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div
            className="flex items-center gap-2 cursor-pointer group"
            style={{
              transform: 'translateZ(20px)',
              transformStyle: 'preserve-3d',
            }}
          >
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl rotate-6 group-hover:rotate-12 transition-transform duration-300" />
              <div className="absolute inset-0 w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl -rotate-6 group-hover:-rotate-12 transition-transform duration-300" />
            </div>
            <span
              className={`text-2xl font-bold transition-colors duration-300 ${
                scrolled ? 'text-gray-900' : 'text-white'
              }`}
            >
              FutureShop
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a
              href="#products"
              className={`font-semibold transition-colors duration-300 hover:text-blue-500 ${
                scrolled ? 'text-gray-700' : 'text-white'
              }`}
            >
              Products
            </a>
            <a
              href="#categories"
              className={`font-semibold transition-colors duration-300 hover:text-blue-500 ${
                scrolled ? 'text-gray-700' : 'text-white'
              }`}
            >
              Categories
            </a>
            <a
              href="#about"
              className={`font-semibold transition-colors duration-300 hover:text-blue-500 ${
                scrolled ? 'text-gray-700' : 'text-white'
              }`}
            >
              About
            </a>
          </div>

          <div className="flex items-center gap-4">
            {user ? (
              <button
                onClick={() => signOut()}
                className={`hidden md:flex items-center gap-2 px-4 py-2 rounded-full font-semibold transition-all duration-300 hover:scale-105 ${
                  scrolled
                    ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            ) : (
              <button
                onClick={onAuthClick}
                className={`hidden md:flex items-center gap-2 px-4 py-2 rounded-full font-semibold transition-all duration-300 hover:scale-105 ${
                  scrolled
                    ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                <User className="w-4 h-4" />
                Sign In
              </button>
            )}

            <button
              onClick={onCartClick}
              className="relative p-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 hover:scale-110"
              style={{
                transform: 'translateZ(30px)',
                transformStyle: 'preserve-3d',
              }}
            >
              <ShoppingCart className="w-5 h-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center animate-pulse">
                  {cartItemCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`md:hidden p-2 rounded-lg transition-colors duration-300 ${
                scrolled ? 'text-gray-900' : 'text-white'
              }`}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden mt-4 py-4 bg-white/95 backdrop-blur-lg rounded-2xl shadow-lg">
            <div className="flex flex-col gap-2 px-4">
              <a
                href="#products"
                className="py-2 text-gray-700 font-semibold hover:text-blue-500 transition-colors duration-300"
              >
                Products
              </a>
              <a
                href="#categories"
                className="py-2 text-gray-700 font-semibold hover:text-blue-500 transition-colors duration-300"
              >
                Categories
              </a>
              <a
                href="#about"
                className="py-2 text-gray-700 font-semibold hover:text-blue-500 transition-colors duration-300"
              >
                About
              </a>
              <div className="h-px bg-gray-200 my-2" />
              {user ? (
                <button
                  onClick={() => signOut()}
                  className="flex items-center gap-2 py-2 text-gray-700 font-semibold hover:text-blue-500 transition-colors duration-300"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              ) : (
                <button
                  onClick={onAuthClick}
                  className="flex items-center gap-2 py-2 text-gray-700 font-semibold hover:text-blue-500 transition-colors duration-300"
                >
                  <User className="w-4 h-4" />
                  Sign In
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
