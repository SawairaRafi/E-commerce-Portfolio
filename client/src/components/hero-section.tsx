import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface HeroSectionProps {
  onExploreProducts: () => void;
  onViewPortfolio: () => void;
}

export function HeroSection({ onExploreProducts, onViewPortfolio }: HeroSectionProps) {
  return (
    <section className="pt-24 pb-16 relative overflow-hidden">
      {/* Tech Grid Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-slate-100">
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(37, 99, 235, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(37, 99, 235, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px'
          }}
        />
      </div>
      
      <div className="container mx-auto px-6 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[600px]">
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                Software Engineer & Tech Curator
              </Badge>
              <h1 className="text-5xl lg:text-6xl font-bold text-slate-900 leading-tight">
                Premium Tech
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                  Collection
                </span>
              </h1>
              <p className="text-xl text-slate-600 leading-relaxed">
                Curated selection of cutting-edge gadgets, smartwatches, and wireless accessories for the modern tech enthusiast.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg"
                onClick={onExploreProducts}
                className="px-8 py-4 bg-gradient-to-r from-primary to-accent text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                Explore Collection
              </Button>
              <Button 
                variant="outline"
                size="lg"
                onClick={onViewPortfolio}
                className="px-8 py-4 border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300"
              >
                View Portfolio
              </Button>
            </div>
            
            <div className="flex items-center space-x-6 pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-slate-900">50+</div>
                <div className="text-sm text-slate-600">Premium Products</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-slate-900">1000+</div>
                <div className="text-sm text-slate-600">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-slate-900">5★</div>
                <div className="text-sm text-slate-600">Average Rating</div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            {/* 3D Product Showcase */}
            <div className="relative w-full h-96 bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl shadow-2xl overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                alt="Premium wireless headphones"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-xl font-semibold">Featured: Wireless Pro</h3>
                <p className="text-white/80">Interactive 3D Preview</p>
              </div>
              <div className="absolute top-4 right-4">
                <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-full flex items-center justify-center animate-pulse">
                  <span className="text-white text-lg">🔄</span>
                </div>
              </div>
            </div>
            
            {/* Floating Product Cards */}
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-white rounded-xl shadow-lg p-4 animate-bounce" style={{ animationDuration: '3s' }}>
              <img 
                src="https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100" 
                alt="Smartwatch"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-white rounded-xl shadow-lg p-4 animate-bounce" style={{ animationDelay: '1s', animationDuration: '3s' }}>
              <img 
                src="https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150" 
                alt="Tech accessories"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
