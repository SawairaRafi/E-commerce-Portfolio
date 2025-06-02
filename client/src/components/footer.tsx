import { Mail, ArrowRight, Github, Linkedin, Twitter, Heart, Star } from 'lucide-react';
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
    <footer className="relative overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-secondary"></div>
      
      {/* Geometric Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 50%, rgba(37, 99, 235, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(6, 182, 212, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 40% 80%, rgba(37, 99, 235, 0.2) 0%, transparent 50%)
          `
        }}
      />
      
      <div className="relative container mx-auto px-6 py-16 text-white">
        <div className="grid lg:grid-cols-5 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 bg-gradient-to-r from-primary to-accent rounded-2xl flex items-center justify-center shadow-xl">
                <span className="text-white font-bold text-xl">SR</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold">Sawaira Rafi</h3>
                <p className="text-primary text-sm font-medium">Tech Curator & Engineer</p>
              </div>
            </div>
            <p className="text-slate-300 text-lg leading-relaxed">
              Handpicked premium tech products curated by a passionate software engineer for fellow tech enthusiasts who appreciate quality and innovation.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              <a 
                href="https://github.com/sawaira-rafi" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-white/10 backdrop-blur rounded-xl flex items-center justify-center hover:bg-white/20 transition-all duration-300 group"
              >
                <Github className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </a>
              <a 
                href="https://linkedin.com/in/sawaira-rafi" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-white/10 backdrop-blur rounded-xl flex items-center justify-center hover:bg-white/20 transition-all duration-300 group"
              >
                <Linkedin className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </a>
              <a 
                href="https://twitter.com/sawaira_rafi" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-white/10 backdrop-blur rounded-xl flex items-center justify-center hover:bg-white/20 transition-all duration-300 group"
              >
                <Twitter className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-white flex items-center space-x-2">
              <Star className="w-5 h-5 text-accent" />
              <span>Products</span>
            </h4>
            <ul className="space-y-3">
              {footerLinks.products.map((link, index) => (
                <li key={index}>
                  <a href="#" className="text-slate-300 hover:text-accent transition-all duration-300 hover:translate-x-1 inline-block">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-white flex items-center space-x-2">
              <Heart className="w-5 h-5 text-primary" />
              <span>Support</span>
            </h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link, index) => (
                <li key={index}>
                  <a href="#" className="text-slate-300 hover:text-primary transition-all duration-300 hover:translate-x-1 inline-block">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Newsletter */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-white flex items-center space-x-2">
              <Mail className="w-5 h-5 text-accent" />
              <span>Stay Updated</span>
            </h4>
            <p className="text-slate-300">Get exclusive tech insights and product launches first.</p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-3">
              <div className="relative">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-4 pr-12 py-3 bg-white/10 backdrop-blur border border-white/20 rounded-xl text-white placeholder:text-slate-400 focus:bg-white/20 focus:border-accent transition-all"
                  required
                />
                <Button 
                  type="submit"
                  className="absolute right-1 top-1 bottom-1 px-4 bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:scale-105 transition-all duration-300 rounded-lg"
                >
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-xs text-slate-400">Join 1000+ tech enthusiasts. No spam, ever.</p>
            </form>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-slate-300">
              <span>© 2024 Sawaira Rafi. Made with</span>
              <Heart className="w-4 h-4 text-red-400 animate-pulse" />
              <span>for tech lovers.</span>
            </div>
            <div className="flex space-x-8">
              <a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">
                Privacy Policy
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">
                Terms of Service
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
