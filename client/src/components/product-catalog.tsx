import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useProducts } from '@/hooks/use-products';
import { ProductCard } from './product-card';
import { ProductFilter } from '@/lib/types';
import { Loader2 } from 'lucide-react';

interface ProductCatalogProps {
  searchQuery?: string;
}

export function ProductCatalog({ searchQuery }: ProductCatalogProps) {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('featured');
  
  const filter: ProductFilter = useMemo(() => ({
    category: activeFilter === 'all' ? undefined : activeFilter,
    search: searchQuery || undefined,
  }), [activeFilter, searchQuery]);

  const { data: products = [], isLoading } = useProducts(filter);

  const sortedProducts = useMemo(() => {
    const sorted = [...products];
    
    switch (sortBy) {
      case 'price-asc':
        return sorted.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
      case 'price-desc':
        return sorted.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
      case 'rating':
        return sorted.sort((a, b) => parseFloat(b.rating || '0') - parseFloat(a.rating || '0'));
      case 'newest':
        return sorted.reverse(); // Assuming newer products have higher IDs
      default:
        return sorted;
    }
  }, [products, sortBy]);

  const categories = [
    { value: 'all', label: 'All Products' },
    { value: 'smartwatches', label: 'Smartwatches' },
    { value: 'headphones', label: 'Headphones' },
    { value: 'accessories', label: 'Accessories' },
  ];

  if (isLoading) {
    return (
      <section id="products" className="py-16 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-center h-64">
            <div className="flex items-center space-x-2">
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
              <span className="text-slate-600">Loading products...</span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="products" className="py-16 bg-slate-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Premium Tech Collection</h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Discover cutting-edge gadgets, smartwatches, and wireless accessories carefully selected for performance and style.
          </p>
        </div>
        
        {/* Filters and Sorting */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 space-y-4 md:space-y-0">
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <Button
                key={category.value}
                variant={activeFilter === category.value ? "default" : "outline"}
                onClick={() => setActiveFilter(category.value)}
                className={activeFilter === category.value ? "bg-primary text-white" : ""}
              >
                {category.label}
              </Button>
            ))}
          </div>
          
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Sort by: Featured</SelectItem>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
              <SelectItem value="rating">Customer Rating</SelectItem>
              <SelectItem value="newest">Newest First</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Product Grid */}
        {sortedProducts.length === 0 ? (
          <div className="text-center py-16">
            <h3 className="text-xl font-semibold text-slate-900 mb-2">No products found</h3>
            <p className="text-slate-600">
              {searchQuery 
                ? `No products match "${searchQuery}". Try a different search term.`
                : 'No products available in this category.'
              }
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
        
        {sortedProducts.length > 0 && sortedProducts.length >= 6 && (
          <div className="text-center mt-12">
            <Button 
              variant="outline" 
              size="lg"
              className="px-8 py-4 border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300"
            >
              Load More Products
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
