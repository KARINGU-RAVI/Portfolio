import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ExternalLink, Github, Calendar } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import portfolioData from '@/data/portfolio-data';
import { useEnhancedScrollAnimation } from '@/hooks/useBidirectionalScroll';

export default function ProjectsSection() {
  const { projects } = portfolioData;
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Enhanced bidirectional scroll animations
  const { scrollYProgress, scrollDirection } = useEnhancedScrollAnimation(containerRef, 0, projects.length);
  
  // Smooth spring animations for 3D effects with bidirectional behavior
  const y = useSpring(useTransform(scrollYProgress, [0, 1], [100, -100]));
  const rotateX = useSpring(useTransform(scrollYProgress, [0, 0.5, 1], [25, 0, -25]));
  const rotateY = useSpring(useTransform(scrollYProgress, [0, 1], [-15, 15]));
  const opacity = useSpring(useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]));
  
  // Mouse tracking for 3D tilt effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const x = (e.clientX - centerX) / (rect.width / 2);
        const y = (e.clientY - centerY) / (rect.height / 2);
        setMousePosition({ x: x * 8, y: y * 8 });
      }
    };

    const handleMouseLeave = () => {
      setMousePosition({ x: 0, y: 0 });
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mouseleave', handleMouseLeave);
      
      return () => {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, []);

  return (
    <section 
      id="projects" 
      ref={containerRef}
      className="py-20 px-6 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 dark:from-indigo-900 dark:via-slate-800 dark:to-purple-900 relative overflow-hidden"
      style={{ perspective: '1200px' }}
    >
      {/* Enhanced 3D Background decoration */}
      <motion.div 
        className="absolute inset-0 overflow-hidden"
        style={{
          rotateX,
          rotateY: rotateY.get() * 0.5,
          y: y.get() * 0.2,
          opacity
        }}
      >
        <motion.div 
          className="absolute top-16 left-16 w-80 h-80 bg-gradient-to-r from-blue-400/15 to-indigo-600/15 rounded-full blur-3xl"
          style={{
            y: useTransform(scrollYProgress, [0, 1], [80, -150]),
            x: useTransform(scrollYProgress, [0, 1], [-50, 120]),
            scale: useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 1.4, 0.8])
          }}
        />
        <motion.div 
          className="absolute bottom-16 right-16 w-80 h-80 bg-gradient-to-r from-purple-400/15 to-pink-600/15 rounded-full blur-3xl"
          style={{
            y: useTransform(scrollYProgress, [0, 1], [-80, 150]),
            x: useTransform(scrollYProgress, [0, 1], [50, -120]),
            scale: useTransform(scrollYProgress, [0, 0.5, 1], [1.2, 0.7, 1.5])
          }}
        />
        <motion.div 
          className="absolute top-1/3 right-1/3 w-48 h-48 bg-gradient-to-r from-cyan-400/20 to-teal-600/20 rounded-full blur-2xl"
          style={{
            scale: useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.6, 0.9]),
            rotate: useTransform(scrollYProgress, [0, 1], [0, 180])
          }}
        />
      </motion.div>
      
      <motion.div 
        className="max-w-6xl mx-auto relative z-10"
        style={{
          rotateX: mousePosition.y * 0.08,
          rotateY: mousePosition.x * 0.08,
          transformStyle: 'preserve-3d'
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30, rotateX: 30 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 80 }}
          viewport={{ once: true }}
          className="text-center mb-16"
          style={{
            transform: 'translateZ(60px)',
            transformStyle: 'preserve-3d'
          }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">Some of my recent work</p>
        </motion.div>
        
        <div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-10"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {projects.map((project, index) => {
            // Enhanced bidirectional animation for each project
            const projectAnimation = useEnhancedScrollAnimation(containerRef, index, projects.length);
            const { angle, initialPosition, delay } = projectAnimation;
            const depthOffset = Math.sin(angle) * 40;
            
            return (
              <motion.div
                key={project.id}
                initial={{ 
                  opacity: 0, 
                  x: initialPosition.x,
                  y: initialPosition.y + 100,
                  rotateY: Math.cos(angle) * 45,
                  rotateX: 35,
                  scale: 0.7
                }}
                animate={{
                  opacity: projectAnimation.opacity.get(),
                  y: scrollDirection.direction === 'up' && scrollDirection.isScrolling ? 
                     initialPosition.y + 100 : 0,
                  x: scrollDirection.direction === 'up' && scrollDirection.isScrolling ? 
                     initialPosition.x : 0,
                  rotateY: scrollDirection.direction === 'up' && scrollDirection.isScrolling ? 
                          Math.cos(angle) * 45 : 0,
                  rotateX: scrollDirection.direction === 'up' && scrollDirection.isScrolling ? 35 : 0,
                  scale: scrollDirection.direction === 'up' && scrollDirection.isScrolling ? 0.7 : 1
                }}
                whileInView={{ 
                  opacity: 1, 
                  x: 0,
                  y: 0,
                  rotateY: 0,
                  rotateX: 0,
                  scale: 1
                }}
                transition={{ 
                  duration: scrollDirection.direction === 'up' ? 1.2 : 1.8, 
                  delay: scrollDirection.direction === 'up' ? (projects.length - index - 1) * 0.2 : delay,
                  type: "spring",
                  stiffness: 40,
                  damping: 20,
                  mass: 1.5,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
                viewport={{ once: false, amount: 0.3 }}

                style={{
                  transformStyle: 'preserve-3d',
                  transform: `translateZ(${depthOffset}px)`,
                }}
                data-testid={`project-card-${project.id}`}
              >
              <motion.div
                className="h-full"
              >
                <Card className="h-full overflow-hidden hover:shadow-2xl transition-all duration-500 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border border-white/30 dark:border-slate-700/30 hover:bg-white/95 dark:hover:bg-slate-800/95 hover:border-blue-200/50 dark:hover:border-blue-400/30"
                  style={{
                    transformStyle: 'preserve-3d',
                    boxShadow: '0 30px 60px -12px rgba(0, 0, 0, 0.25), 0 18px 36px -18px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.05)',
                  }}
                  data-testid={`project-card-content-${project.id}`}
                >
                <motion.div 
                  className="relative overflow-hidden"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <motion.img 
                    src={project.image}
                    alt={`${project.title} preview`}
                    className="w-full h-48 object-cover"
                    style={{ transformStyle: 'preserve-3d' }}
                  />
                  <motion.div 
                    className="absolute top-4 right-4"
                    whileHover={{ 
                      scale: 1.1,
                      rotateY: 10,
                      z: 30
                    }}
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <Badge variant="secondary" className="bg-white/90 text-gray-800 shadow-lg">
                      {project.category}
                    </Badge>
                  </motion.div>
                </motion.div>
                
                <CardHeader style={{ transform: 'translateZ(25px)' }}>
                  <motion.div
                    whileHover={{ scale: 1.02, z: 10 }}
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <CardTitle className="text-xl font-bold leading-tight">
                      {project.title}
                    </CardTitle>
                  </motion.div>
                  <motion.div
                    whileHover={{ 
                      color: 'rgb(59, 130, 246)',
                      transition: { duration: 0.3 }
                    }}
                  >
                    <CardDescription className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {project.description}
                    </CardDescription>
                  </motion.div>
                </CardHeader>
                
                <CardContent className="space-y-4" style={{ transform: 'translateZ(15px)' }}>
                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  
                  {/* Key Features */}
                  <div>
                    <h4 className="font-medium mb-2 text-sm">Key Features:</h4>
                    <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                      {project.features.slice(0, 3).map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <div className="w-1 h-1 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                      {project.features.length > 3 && (
                        <li className="text-blue-600 dark:text-blue-400 text-xs">
                          +{project.features.length - 3} more features
                        </li>
                      )}
                    </ul>
                  </div>
                </CardContent>
                
                <CardFooter className="flex space-x-2 pt-4" style={{ transform: 'translateZ(35px)' }}>
                  <motion.div
                    className="flex-1"
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <Button 
                      asChild
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg"
                    >
                      <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Live Demo
                      </a>
                    </Button>
                  </motion.div>
                  
                  <motion.div
                    className="flex-1"
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <Button 
                      asChild
                      variant="outline"
                      className="w-full shadow-lg"
                    >
                      <a href={project.codeUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="mr-2 h-4 w-4" />
                        View Code
                      </a>
                    </Button>
                  </motion.div>
                </CardFooter>
                </Card>
              </motion.div>
            </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
