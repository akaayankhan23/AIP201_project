import { X, ShoppingBag, Minus, Plus, Trash2 } from 'lucide-react';
import { Product } from '../lib/supabase';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: Array<{ product: Product; quantity: number }>;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
}

export default function Cart({ isOpen, onClose, items, onUpdateQuantity, onRemoveItem }: CartProps) {
  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      <div
        className={`fixed right-0 top-0 h-full w-full md:w-[480px] bg-white shadow-2xl z-50 transition-all duration-500 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{
          transformStyle: 'preserve-3d',
        }}
      >
        <div className="h-full flex flex-col">
          <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-500 to-cyan-500">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-6 h-6 text-white" />
                <h2 className="text-2xl font-bold text-white">Shopping Cart</h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/20 rounded-full transition-colors duration-200"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </div>
            <p className="text-white/90 mt-2">{items.length} items</p>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <ShoppingBag className="w-20 h-20 text-gray-300 mb-4" />
                <p className="text-xl text-gray-500 mb-2">Your cart is empty</p>
                <p className="text-gray-400">Add some products to get started</p>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item, index) => (
                  <div
                    key={item.product.id}
                    className="group relative bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300"
                    style={{
                      transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
                      transitionDelay: `${index * 50}ms`,
                    }}
                  >
                    <div className="flex gap-4 p-4">
                      <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100 flex-shrink-0">
                        <img
                          src={item.product.image_url}
                          alt={item.product.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 mb-1 truncate">
                          {item.product.name}
                        </h3>
                        <p className="text-lg font-bold text-blue-600">
                          ${item.product.price}
                        </p>

                        <div className="flex items-center gap-3 mt-3">
                          <div className="flex items-center gap-2 bg-gray-100 rounded-full p-1">
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                              className="p-1.5 hover:bg-white rounded-full transition-colors duration-200"
                            >
                              <Minus className="w-4 h-4 text-gray-600" />
                            </button>
                            <span className="w-8 text-center font-semibold text-gray-900">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                              className="p-1.5 hover:bg-white rounded-full transition-colors duration-200"
                            >
                              <Plus className="w-4 h-4 text-gray-600" />
                            </button>
                          </div>

                          <button
                            onClick={() => onRemoveItem(item.product.id)}
                            className="p-2 hover:bg-red-50 rounded-full transition-colors duration-200 group/delete"
                          >
                            <Trash2 className="w-4 h-4 text-gray-400 group-hover/delete:text-red-500 transition-colors duration-200" />
                          </button>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="text-lg font-bold text-gray-900">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {items.length > 0 && (
            <div className="border-t border-gray-200 p-6 bg-gradient-to-b from-white to-slate-50">
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
                <div className="flex justify-between text-xl font-bold text-gray-900">
                  <span>Total</span>
                  <span className="text-blue-600">${total.toFixed(2)}</span>
                </div>
              </div>

              <button className="w-full py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full font-bold text-lg hover:shadow-xl hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105">
                Checkout Now
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
