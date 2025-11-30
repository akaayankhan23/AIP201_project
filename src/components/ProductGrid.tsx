import { useEffect, useState } from 'react';
import { supabase, Product } from '../lib/supabase';
import ProductCard from './ProductCard';
import { Loader2 } from 'lucide-react';

interface ProductGridProps {
  onAddToCart: (product: Product) => void;
  categoryFilter?: string;
}

export default function ProductGrid({ onAddToCart, categoryFilter }: ProductGridProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, [categoryFilter]);

  const loadProducts = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (categoryFilter) {
        const { data: category } = await supabase
          .from('categories')
          .select('id')
          .eq('slug', categoryFilter)
          .maybeSingle();

        if (category) {
          query = query.eq('category_id', category.id);
        }
      }

      const { data, error } = await query;

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-xl text-gray-500">No products found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {products.map((product, index) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
          index={index}
        />
      ))}
    </div>
  );
}
