import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { Zap, Shield, Truck, HeadphonesIcon } from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Experience instant loading and smooth interactions',
    color: 'from-yellow-400 to-orange-500',
  },
  {
    icon: Shield,
    title: 'Secure Checkout',
    description: 'Your payments are protected with bank-level security',
    color: 'from-green-400 to-emerald-500',
  },
  {
    icon: Truck,
    title: 'Free Shipping',
    description: 'Enjoy free delivery on all orders above $50',
    color: 'from-blue-400 to-cyan-500',
  },
  {
    icon: HeadphonesIcon,
    title: '24/7 Support',
    description: 'Get help anytime with our dedicated support team',
    color: 'from-purple-400 to-pink-500',
  },
];

export default function FeaturedSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section ref={ref} className="py-32 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative">
        <div
          className={`text-center mb-20 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
            Why Choose Us
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We provide an unmatched shopping experience with cutting-edge technology
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className={`group relative transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
                }`}
                style={{
                  transitionDelay: `${index * 150}ms`,
                }}
              >
                <div
                  className="relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer h-full"
                  style={{
                    transformStyle: 'preserve-3d',
                  }}
                >
                  <div
                    className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity duration-500"
                    style={{
                      backgroundImage: `linear-gradient(to bottom right, var(--tw-gradient-stops))`,
                    }}
                  />

                  <div
                    className={`inline-flex p-4 bg-gradient-to-br ${feature.color} rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-500`}
                    style={{
                      transform: 'translateZ(40px)',
                      transformStyle: 'preserve-3d',
                    }}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                    {feature.title}
                  </h3>

                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>

                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-b-3xl"
                    style={{
                      backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))`,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
