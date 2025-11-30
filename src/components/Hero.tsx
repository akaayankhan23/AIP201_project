import { useParallax } from '../hooks/useScrollAnimation';
import { ShoppingBag, Sparkles, Zap } from 'lucide-react';

export default function Hero() {
  const offset = useParallax();

  return (
    <div className="relative h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div
        className="absolute inset-0 opacity-20"
        style={{
          transform: `translateY(${offset * 0.5}px)`,
          backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3), transparent 50%), radial-gradient(circle at 80% 80%, rgba(59, 130, 246, 0.3), transparent 50%)',
        }}
      />

      <div className="container mx-auto px-4 h-full flex items-center relative z-10">
        <div className="max-w-4xl">
          <div
            className="inline-block mb-6 animate-float"
            style={{
              transform: `translateY(${Math.sin(offset * 0.01) * 20}px)`,
            }}
          >
            <div className="flex items-center gap-2 bg-blue-500/20 backdrop-blur-sm border border-blue-400/30 rounded-full px-4 py-2">
              <Sparkles className="w-4 h-4 text-blue-300" />
              <span className="text-blue-100 text-sm font-medium">New Collection 2026</span>
            </div>
          </div>

          <h1
            className="text-7xl md:text-8xl font-bold mb-6 leading-tight"
            style={{
              transform: `translateZ(${offset * 0.1}px) rotateX(${offset * 0.02}deg)`,
              transformStyle: 'preserve-3d',
            }}
          >
            <span className="bg-gradient-to-r from-blue-200 via-cyan-200 to-blue-200 bg-clip-text text-transparent animate-gradient">
              Experience
            </span>
            <br />
            <span className="text-white drop-shadow-2xl">The Future</span>
          </h1>

          <p
            className="text-xl md:text-2xl text-blue-100 mb-8 max-w-2xl leading-relaxed"
            style={{
              transform: `translateX(${offset * 0.05}px)`,
            }}
          >
            Discover a revolutionary shopping experience with cutting-edge 3D visuals and immersive interactions
          </p>

          <div className="flex flex-wrap gap-4">
            <button
              className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full font-semibold text-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/50"
              style={{
                transform: 'translateZ(50px)',
                transformStyle: 'preserve-3d',
              }}
            >
              <span className="relative z-10 flex items-center gap-2">
                <ShoppingBag className="w-5 h-5" />
                Shop Now
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>

            <button
              className="group px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-full font-semibold text-lg border-2 border-white/20 transition-all duration-300 hover:bg-white/20 hover:scale-105 hover:border-white/40"
              style={{
                transform: 'translateZ(30px)',
                transformStyle: 'preserve-3d',
              }}
            >
              <span className="flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Explore
              </span>
            </button>
          </div>
        </div>

        <div
          className="absolute right-0 top-1/2 -translate-y-1/2 w-1/2 h-full hidden lg:block"
          style={{
            transform: `translateZ(${offset * 0.2}px) rotateY(${offset * 0.05}deg)`,
            transformStyle: 'preserve-3d',
          }}
        >
          <div className="relative w-full h-full flex items-center justify-center">
            <div
              className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-blue-500/30 to-cyan-500/30 blur-3xl animate-pulse"
              style={{ animationDuration: '4s' }}
            />
            <div
              className="relative grid grid-cols-2 gap-6"
              style={{
                transform: `rotateY(${offset * 0.1}deg) rotateX(${offset * 0.05}deg)`,
                transformStyle: 'preserve-3d',
              }}
            >
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-32 h-32 bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl hover:scale-110 transition-transform duration-300"
                  style={{
                    transform: `translateZ(${i * 20}px) rotateZ(${i * 5}deg)`,
                    transformStyle: 'preserve-3d',
                    animationDelay: `${i * 0.2}s`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/40 rounded-full p-1">
          <div className="w-1.5 h-3 bg-white/60 rounded-full mx-auto animate-scroll" />
        </div>
      </div>
    </div>
  );
}
