import { useState } from 'react';
import { AuthProvider } from './hooks/useAuth';
import { Product } from './lib/supabase';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Categories from './components/Categories';
import ProductGrid from './components/ProductGrid';
import FeaturedSection from './components/FeaturedSection';
import Cart from './components/Cart';
import AuthModal from './components/AuthModal';

function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [cartItems, setCartItems] = useState<Array<{ product: Product; quantity: number }>>([]);

  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    setCartOpen(true);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  return (
    <AuthProvider>
      <div className="min-h-screen bg-white">
        <Navbar
          cartItemCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
          onCartClick={() => setCartOpen(true)}
          onAuthClick={() => setAuthModalOpen(true)}
        />

        <Hero />

        <div id="categories">
          <Categories
            onCategorySelect={setSelectedCategory}
            selectedCategory={selectedCategory}
          />
        </div>

        <section id="products" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                {selectedCategory ? 'Filtered Products' : 'All Products'}
              </h2>
              <p className="text-xl text-gray-600">Discover amazing products at great prices</p>
            </div>

            <ProductGrid
              onAddToCart={handleAddToCart}
              categoryFilter={selectedCategory}
            />
          </div>
        </section>

        <FeaturedSection />

        <Cart
          isOpen={cartOpen}
          onClose={() => setCartOpen(false)}
          items={cartItems}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
        />

        <AuthModal
          isOpen={authModalOpen}
          onClose={() => setAuthModalOpen(false)}
        />
      </div>
    </AuthProvider>
  );
}

export default App;
