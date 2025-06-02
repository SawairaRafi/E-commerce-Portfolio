import { useState } from 'react';
import { Product } from '@shared/schema';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, Star, Box } from 'lucide-react';
import { useCart } from '@/hooks/use-cart';
import { ProductViewer3D } from './product-viewer-3d';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart, isAddingToCart } = useCart();
  const [showWishlist, setShowWishlist] = useState(false);
  const [show3DViewer, setShow3DViewer] = useState(false);

  const handleAddToCart = () => {
    addToCart({ productId: product.id, quantity: 1 });
  };

  const getBadgeVariant = (badge: string | null) => {
    switch (badge) {
      case 'Hot': return 'destructive';
      case 'Limited': return 'secondary';
      case 'New': return 'default';
      default: return 'outline';
    }
  };

  const getStockStatus = () => {
    if (!product.inStock) return { label: 'Out of Stock', className: 'bg-red-500' };
    if (product.stockCount && product.stockCount < 10) return { label: 'Low Stock', className: 'bg-orange-500' };
    return { label: 'In Stock', className: 'bg-green-500' };
  };

  const stockStatus = getStockStatus();

  return (
    <>
      <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
        <div className="relative h-64 bg-gradient-to-br from-slate-100 to-slate-200">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          <div className="absolute top-4 right-4">
            <Badge variant={getBadgeVariant(product.badge)} className={`${stockStatus.className} text-white px-2 py-1 text-xs font-medium`}>
              {product.badge || stockStatus.label}
            </Badge>
          </div>
          
          <button 
            className={`absolute top-4 left-4 w-10 h-10 bg-white/80 backdrop-blur rounded-full flex items-center justify-center transition-all duration-300 ${showWishlist ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
            onClick={() => setShowWishlist(!showWishlist)}
          >
            <Heart className={`w-5 h-5 ${showWishlist ? 'fill-red-500 text-red-500' : 'text-slate-600'}`} />
          </button>
          
          <button 
            className="absolute bottom-4 right-4 px-3 py-2 bg-primary text-white rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center space-x-1"
            onClick={() => setShow3DViewer(true)}
          >
            <Box className="w-4 h-4" />
            <span>3D View</span>
          </button>
        </div>
        
        <div className="p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-primary font-medium capitalize">{product.category}</span>
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm text-slate-600">{product.rating}</span>
              <span className="text-xs text-slate-400">({product.reviewCount})</span>
            </div>
          </div>
          
          <h3 className="text-lg font-semibold text-slate-900 mb-2">{product.name}</h3>
          <p className="text-slate-600 text-sm mb-4 line-clamp-2">{product.description}</p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-slate-900">${product.price}</span>
              {product.originalPrice && (
                <span className="text-lg text-slate-500 line-through">${product.originalPrice}</span>
              )}
            </div>
            <Button 
              onClick={handleAddToCart}
              disabled={!product.inStock || isAddingToCart}
              className="px-4 py-2 font-medium"
            >
              {isAddingToCart ? 'Adding...' : product.inStock ? 'Add to Cart' : 'Out of Stock'}
            </Button>
          </div>
        </div>
      </div>

      <ProductViewer3D
        productName={product.name}
        productImage={product.image}
        isOpen={show3DViewer}
        onClose={() => setShow3DViewer(false)}
      />
    </>
  );
}
