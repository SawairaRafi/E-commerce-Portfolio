import { Smartphone, Box, TrendingUp } from 'lucide-react';

export function PortfolioSection() {
  const projects = [
    {
      title: 'Mobile Commerce App',
      description: 'React Native e-commerce platform with real-time inventory and payment processing.',
      technologies: ['React Native', 'TypeScript', 'Node.js'],
      icon: Smartphone,
      gradient: 'from-primary/5 to-accent/5',
      iconGradient: 'from-primary to-accent',
      linkColor: 'text-primary hover:text-primary/80',
    },
    {
      title: '3D Product Visualizer', 
      description: 'Three.js-powered product viewer with interactive 3D models and AR preview.',
      technologies: ['Three.js', 'WebGL', 'React'],
      icon: Box,
      gradient: 'from-accent/5 to-primary/5',
      iconGradient: 'from-accent to-primary',
      linkColor: 'text-accent hover:text-accent/80',
    },
    {
      title: 'Analytics Dashboard',
      description: 'Real-time data visualization platform with custom charts and reporting tools.',
      technologies: ['D3.js', 'Python', 'PostgreSQL'],
      icon: TrendingUp,
      gradient: 'from-slate-100 to-slate-200',
      iconGradient: 'from-slate-600 to-slate-800',
      linkColor: 'text-slate-700 hover:text-slate-600',
    },
  ];

  return (
    <section id="portfolio" className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Portfolio Highlights</h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            A showcase of my software engineering projects and tech expertise.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {projects.map((project, index) => {
            const IconComponent = project.icon;
            return (
              <div 
                key={index}
                className={`bg-gradient-to-br ${project.gradient} rounded-2xl p-8 hover:shadow-lg transition-shadow duration-300`}
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${project.iconGradient} rounded-xl flex items-center justify-center mb-6`}>
                  <IconComponent className="text-white text-2xl w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">{project.title}</h3>
                <p className="text-slate-600 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, techIndex) => (
                    <span 
                      key={techIndex}
                      className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <a href="#" className={`${project.linkColor} font-semibold transition-colors`}>
                  View Project →
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
