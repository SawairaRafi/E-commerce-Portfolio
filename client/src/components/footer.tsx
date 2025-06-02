import { Mail, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

export function Footer() {
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Newsletter subscription for ${email} would be processed here.`);
    setEmail('');
  };

  const footerLinks = {
    products: [
      'Smartwatches',
      'Headphones', 
      'Accessories',
      'New Arrivals'
    ],
    support: [
      'Customer Service',
      'Returns',
      'Shipping Info',
      'FAQ'
    ]
  };

  return (
    <footer className="bg-secondary text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">SR</span>
              </div>
              <span className="text-xl font-bold">Sawaira Rafi</span>
            </div>
            <p className="text-slate-300">
              Premium tech products curated by a software engineer for tech enthusiasts.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Products</h4>
            <ul className="space-y-2 text-slate-300">
              {footerLinks.products.map((link, index) => (
                <li key={index}>
                  <a href="#" className="hover:text-white transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-slate-300">
              {footerLinks.support.map((link, index) => (
                <li key={index}>
                  <a href="#" className="hover:text-white transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Newsletter</h4>
            <p className="text-slate-300 mb-4">Get updates on new products and tech insights.</p>
            <form onSubmit={handleNewsletterSubmit} className="flex">
              <Input
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 rounded-r-none border-slate-600 bg-slate-700 text-white placeholder:text-slate-400"
                required
              />
              <Button 
                type="submit"
                className="rounded-l-none bg-primary hover:bg-primary/90"
              >
                <ArrowRight className="w-4 h-4" />
              </Button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-slate-600 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-300">© 2024 Sawaira Rafi. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-slate-300 hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-slate-300 hover:text-white transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
