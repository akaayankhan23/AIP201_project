import { useState } from 'react';
import { ShoppingCart, Star, Eye } from 'lucide-react';
import { Product } from '../lib/supabase';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  index: number;
}

export default function ProductCard({ product, onAddToCart, index }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { ref, isVisible } = useScrollAnimation();

  return (
    <div
      ref={ref}
      className={`group relative transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
      }`}
      style={{
        transitionDelay: `${index * 100}ms`,
      }}
    >
      <div
        className="relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer"
        style={{
          transform: isHovered
            ? 'translateY(-12px) rotateX(5deg) rotateY(5deg) scale(1.02)'
            : 'translateY(0) rotateX(0) rotateY(0) scale(1)',
          transformStyle: 'preserve-3d',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-transparent to-cyan-500/0 group-hover:from-blue-500/10 group-hover:to-cyan-500/10 transition-all duration-500 z-10" />

        <div className="relative h-72 overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100">
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            style={{
              transform: isHovered ? 'scale(1.1) translateZ(20px)' : 'scale(1) translateZ(0)',
              transformStyle: 'preserve-3d',
            }}
          />

          <div
            className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-500 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          />

          <div
            className={`absolute top-4 right-4 flex gap-2 transition-all duration-500 ${
              isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
          >
            <button className="p-3 bg-white rounded-full shadow-lg hover:bg-blue-500 hover:text-white transition-all duration-300 hover:scale-110">
              <Eye className="w-5 h-5" />
            </button>
          </div>

          {product.featured && (
            <div className="absolute top-4 left-4 px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-sm font-bold rounded-full shadow-lg">
              Featured
            </div>
          )}
        </div>

        <div className="p-6 relative" style={{ transform: 'translateZ(40px)', transformStyle: 'preserve-3d' }}>
          <div className="flex items-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(product.rating)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-gray-300'
                }`}
              />
            ))}
            <span className="text-sm text-gray-600 ml-2">{product.rating}</span>
          </div>

          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
            {product.name}
          </h3>

          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>

          <div className="flex items-center justify-between">
            <div>
              <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                ${product.price}
              </span>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart(product);
              }}
              className="group/btn relative px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full font-semibold overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/50 hover:scale-105"
              style={{
                transform: isHovered ? 'translateZ(60px)' : 'translateZ(40px)',
                transformStyle: 'preserve-3d',
              }}
            >
              <span className="relative z-10 flex items-center gap-2">
                <ShoppingCart className="w-5 h-5" />
                Add
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
            </button>
          </div>

          {product.stock < 10 && product.stock > 0 && (
            <div className="mt-3 text-xs text-orange-600 font-semibold">
              Only {product.stock} left in stock!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
