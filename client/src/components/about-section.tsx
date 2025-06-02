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
          
          <div className="relative group perspective-1000">
            {/* Animated glow border */}
            <div className="absolute -inset-2 bg-gradient-to-r from-primary via-accent to-primary rounded-3xl blur-lg opacity-60 group-hover:opacity-100 transition duration-1000 animate-pulse bg-[length:200%_200%] animate-gradient-shift"></div>
            
            {/* 3D container */}
            <div className="relative transform-gpu transition-all duration-700 group-hover:scale-110 preserve-3d">
              <div 
                className="relative overflow-hidden rounded-3xl shadow-2xl transform transition-all duration-500 group-hover:rotate-y-12 group-hover:rotate-x-6"
                style={{
                  transformStyle: 'preserve-3d',
                  transform: 'perspective(1200px) rotateY(-8deg) rotateX(4deg) translateZ(0)'
                }}
              >
                <img 
                  src="https://images.unsplash.com/photo-1494790108755-2616b612b47c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&h=687&q=80" 
                  alt="Sawaira Rafi - Software Engineer"
                  className="w-full h-auto transition-all duration-700 group-hover:scale-105"
                  style={{
                    filter: 'drop-shadow(0 30px 40px rgba(0, 0, 0, 0.3)) brightness(1.05) contrast(1.1)',
                  }}
                />
                
                {/* Holographic overlay */}
                <div 
                  className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 via-transparent to-purple-400/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500"
                  style={{
                    background: 'linear-gradient(45deg, rgba(6, 182, 212, 0.1) 0%, transparent 30%, rgba(147, 51, 234, 0.1) 70%, rgba(37, 99, 235, 0.1) 100%)'
                  }}
                />
                
                {/* Depth layer */}
                <div 
                  className="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-accent/20 rounded-3xl opacity-70 group-hover:opacity-90 transition-all duration-500"
                  style={{
                    transform: 'translateZ(-10px)'
                  }}
                />
              </div>
              
              {/* Dynamic floating elements */}
              <div className="absolute -top-6 -right-6 w-12 h-12 bg-gradient-to-r from-accent to-primary rounded-full animate-bounce opacity-80 group-hover:opacity-100 transition-opacity" style={{ animationDelay: '0s', animationDuration: '3s', transform: 'translateZ(50px)' }}>
                <div className="w-full h-full rounded-full bg-white/30 animate-ping"></div>
              </div>
              
              <div className="absolute -bottom-6 -left-6 w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-full animate-bounce opacity-80 group-hover:opacity-100 transition-opacity" style={{ animationDelay: '1s', animationDuration: '4s', transform: 'translateZ(30px)' }}>
                <div className="w-full h-full rounded-full bg-white/40 animate-pulse"></div>
              </div>
              
              <div className="absolute top-1/4 -right-4 w-6 h-6 bg-white/40 rounded-full animate-pulse group-hover:animate-bounce" style={{ transform: 'translateZ(40px)' }}></div>
              
              <div className="absolute bottom-1/4 -left-4 w-4 h-4 bg-accent/60 rounded-full animate-ping" style={{ animationDelay: '2s', transform: 'translateZ(20px)' }}></div>
              
              {/* Particle effect */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/3 left-1/4 w-2 h-2 bg-white/60 rounded-full animate-float opacity-0 group-hover:opacity-100 transition-opacity" style={{ animationDelay: '0.5s' }}></div>
                <div className="absolute bottom-1/3 right-1/4 w-1 h-1 bg-accent/80 rounded-full animate-float opacity-0 group-hover:opacity-100 transition-opacity" style={{ animationDelay: '1.5s' }}></div>
                <div className="absolute top-1/2 left-1/3 w-1.5 h-1.5 bg-primary/70 rounded-full animate-float opacity-0 group-hover:opacity-100 transition-opacity" style={{ animationDelay: '2.5s' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
