import { useEffect, useState } from 'react';
import { supabase, Category } from '../lib/supabase';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

interface CategoriesProps {
  onCategorySelect: (slug: string) => void;
  selectedCategory?: string;
}

export default function Categories({ onCategorySelect, selectedCategory }: CategoriesProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const { ref, isVisible } = useScrollAnimation();

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name');

    if (error) {
      console.error('Error loading categories:', error);
      return;
    }

    setCategories(data || []);
  };

  return (
    <section ref={ref} className="py-20 bg-gradient-to-b from-white to-slate-50">
      <div className="container mx-auto px-4">
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
            Shop by Category
          </h2>
          <p className="text-xl text-gray-600">Explore our curated collections</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <button
            onClick={() => onCategorySelect('')}
            className={`group relative h-64 rounded-3xl overflow-hidden transition-all duration-500 hover:shadow-2xl ${
              !selectedCategory ? 'ring-4 ring-blue-500' : ''
            } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
            style={{
              transitionDelay: '0ms',
              transform: !selectedCategory ? 'translateY(-8px) scale(1.05)' : '',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-cyan-600" />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
            <div className="relative h-full flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">All</div>
                <div className="text-white/90">View Everything</div>
              </div>
            </div>
          </button>

          {categories.map((category, index) => (
            <button
              key={category.id}
              onClick={() => onCategorySelect(category.slug)}
              className={`group relative h-64 rounded-3xl overflow-hidden transition-all duration-500 hover:shadow-2xl ${
                selectedCategory === category.slug ? 'ring-4 ring-blue-500' : ''
              } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
              style={{
                transitionDelay: `${(index + 1) * 100}ms`,
                transform: selectedCategory === category.slug ? 'translateY(-8px) scale(1.05)' : '',
              }}
            >
              <img
                src={category.image_url}
                alt={category.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent group-hover:from-black/90 transition-all duration-300" />

              <div className="relative h-full flex items-end p-6">
                <div className="text-left">
                  <h3 className="text-2xl font-bold text-white mb-1">{category.name}</h3>
                  <p className="text-white/80 text-sm">{category.description}</p>
                </div>
              </div>

              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
