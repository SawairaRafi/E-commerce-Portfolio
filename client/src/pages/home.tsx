import { useState } from 'react';
import { Header } from '@/components/header';
import { HeroSection } from '@/components/hero-section';
import { AboutSection } from '@/components/about-section';
import { ProductCatalog } from '@/components/product-catalog';
import { PortfolioSection } from '@/components/portfolio-section';
import { ContactSection } from '@/components/contact-section';
import { Footer } from '@/components/footer';
import { FloatingCart } from '@/components/floating-cart';

export default function Home() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    scrollToSection('products');
  };

  const handleExploreProducts = () => {
    scrollToSection('products');
  };

  const handleViewPortfolio = () => {
    scrollToSection('portfolio');
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header onToggleCart={toggleCart} onSearch={handleSearch} />
      
      <main>
        <HeroSection 
          onExploreProducts={handleExploreProducts}
          onViewPortfolio={handleViewPortfolio}
        />
        <AboutSection />
        <ProductCatalog searchQuery={searchQuery} />
        <PortfolioSection />
        <ContactSection />
      </main>
      
      <Footer />
      
      <FloatingCart 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
      />
    </div>
  );
}
