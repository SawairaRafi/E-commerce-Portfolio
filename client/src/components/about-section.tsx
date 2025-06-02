import { Github, Linkedin, Twitter, Code, Smartphone } from 'lucide-react';

export function AboutSection() {
  return (
    <section id="about" className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div>
              <span className="text-primary font-semibold">About Sawaira</span>
              <h2 className="text-4xl font-bold text-slate-900 mt-2">Software Engineer & Tech Enthusiast</h2>
            </div>
            <p className="text-lg text-slate-600 leading-relaxed">
              With over 5 years of experience in software engineering, I've developed a keen eye for quality tech products. 
              This curated collection represents the perfect blend of innovation, functionality, and design that I personally use and recommend.
            </p>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Code className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900">Full-Stack Development</h4>
                  <p className="text-slate-600">React, TypeScript, Node.js Expert</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                  <Smartphone className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900">Tech Curation</h4>
                  <p className="text-slate-600">Handpicked premium gadgets & accessories</p>
                </div>
              </div>
            </div>
            <div className="flex space-x-4 pt-4">
              <a 
                href="https://linkedin.com/in/sawaira-rafi" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-600 hover:text-primary transition-colors"
              >
                <Linkedin className="w-6 h-6" />
              </a>
              <a 
                href="https://github.com/sawaira-rafi" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-600 hover:text-primary transition-colors"
              >
                <Github className="w-6 h-6" />
              </a>
              <a 
                href="https://twitter.com/sawaira_rafi" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-600 hover:text-primary transition-colors"
              >
                <Twitter className="w-6 h-6" />
              </a>
            </div>
          </div>
          
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-3xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
            <div className="relative">
              <img 
                src="/attached_assets/image_1748847359212.png" 
                alt="Sawaira Rafi - Software Engineer"
                className="rounded-2xl shadow-2xl w-full transform group-hover:scale-105 transition-all duration-500 group-hover:rotate-1"
                style={{
                  filter: 'drop-shadow(0 25px 25px rgba(0, 0, 0, 0.15))',
                  transform: 'perspective(1000px) rotateY(-5deg) rotateX(2deg)'
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-accent/10 rounded-2xl opacity-80" />
              
              {/* Floating elements for 3D effect */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-accent/20 rounded-full animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }}></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-primary/20 rounded-full animate-bounce" style={{ animationDelay: '1s', animationDuration: '4s' }}></div>
              <div className="absolute top-1/2 -right-2 w-4 h-4 bg-white/30 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
