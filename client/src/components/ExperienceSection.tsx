import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { MapPin, Calendar } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import portfolioData from '@/data/portfolio-data';
import { useEnhancedScrollAnimation, useContainerHoverEffect } from '@/hooks/useBidirectionalScroll';

export default function ExperienceSection() {
  const { experiences } = portfolioData;
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down');
  const [lastScrollY, setLastScrollY] = useState(0);
  const containerHover = useContainerHoverEffect();
  
  // Track scroll direction
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY) {
        setScrollDirection('down');
      } else {
        setScrollDirection('up');
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);
  
  // Enhanced 3D Scroll effects
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  // Smooth spring animations for unique background effects
  const y = useSpring(useTransform(scrollYProgress, [0, 1], [200, -200]));
  const rotateX = useSpring(useTransform(scrollYProgress, [0, 0.5, 1], [30, 0, -30]));
  const rotateY = useSpring(useTransform(scrollYProgress, [0, 1], [-20, 20]));
  const opacity = useSpring(useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.1, 1, 1, 0.1]));

  return (
    <section 
      id="experience" 
      ref={containerRef}
      className="py-20 px-6 bg-gradient-to-br from-gray-50 via-indigo-50 to-cyan-100 dark:from-slate-900 dark:via-indigo-900 dark:to-cyan-900 relative overflow-hidden"
      style={{ perspective: '1500px' }}
    >
      {/* Unique Geometric Background Effects */}
      <motion.div 
        className="absolute inset-0 overflow-hidden"
        style={{
          rotateX,
          rotateY: rotateY.get() * 0.3,
          y: y.get() * 0.1,
          opacity
        }}
      >
        {/* Floating Geometric Shapes */}
        <motion.div 
          className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-cyan-400/20 to-blue-600/20"
          style={{
            y: useTransform(scrollYProgress, [0, 1], [100, -300]),
            x: useTransform(scrollYProgress, [0, 1], [-20, 80]),
            rotate: useTransform(scrollYProgress, [0, 1], [0, 180]),
            clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'
          }}
        />
        
        <motion.div 
          className="absolute top-1/4 right-16 w-24 h-24 bg-gradient-to-r from-purple-400/25 to-pink-600/25 rounded-full blur-xl"
          style={{
            y: useTransform(scrollYProgress, [0, 1], [-50, 250]),
            x: useTransform(scrollYProgress, [0, 1], [30, -100]),
            scale: useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1.5, 0.3])
          }}
        />
        
        <motion.div 
          className="absolute bottom-1/4 left-1/4 w-40 h-40 bg-gradient-to-r from-emerald-400/15 to-teal-600/15"
          style={{
            y: useTransform(scrollYProgress, [0, 1], [80, -200]),
            x: useTransform(scrollYProgress, [0, 1], [-40, 120]),
            rotate: useTransform(scrollYProgress, [0, 1], [45, 225]),
            clipPath: 'polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%)'
          }}
        />
        
        <motion.div 
          className="absolute top-3/4 right-1/3 w-28 h-28 bg-gradient-to-r from-yellow-400/20 to-orange-600/20 rounded-lg blur-sm"
          style={{
            y: useTransform(scrollYProgress, [0, 1], [-100, 150]),
            x: useTransform(scrollYProgress, [0, 1], [50, -150]),
            rotate: useTransform(scrollYProgress, [0, 1], [0, -90]),
            scale: useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.2, 1.8])
          }}
        />
        
        {/* Animated Grid Lines */}
        <motion.div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            y: useTransform(scrollYProgress, [0, 1], [0, 100]),
            x: useTransform(scrollYProgress, [0, 1], [0, -50])
          }}
        />
      </motion.div>
      
      <motion.div 
        className="max-w-6xl mx-auto relative z-10"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <motion.div
          initial={{ opacity: 0, y: 40, rotateX: 45 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
          viewport={{ once: true }}
          className="text-center mb-16"
          style={{
            transform: 'translateZ(80px)',
            transformStyle: 'preserve-3d'
          }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Work Experience
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">My professional journey</p>
        </motion.div>
        
        {/* Interactive Timeline with Bidirectional Animations */}
        <div className="relative" style={{ transformStyle: 'preserve-3d' }}>
          {/* Enhanced Timeline Line */}
          <motion.div 
            className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-cyan-600 via-blue-600 to-purple-600 h-full rounded-full shadow-lg"
            style={{
              boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)',
              transform: 'translateZ(20px)'
            }}
          />
          
          {experiences.map((exp, index) => {
            const isLeft = index % 2 === 0;
            const experienceAnimation = useEnhancedScrollAnimation(containerRef, index, experiences.length);
            
            return (
              <motion.div
                key={exp.id}
                style={{
                  y: experienceAnimation.y,
                  opacity: experienceAnimation.opacity,
                  scale: experienceAnimation.scale
                }}
                initial={{ 
                  opacity: 0, 
                  y: scrollDirection === 'down' ? 120 : -120,
                  x: isLeft ? -150 : 150,
                  rotateY: isLeft ? -45 : 45,
                  rotateX: 30,
                  scale: 0.6,
                  rotateZ: isLeft ? -10 : 10
                }}
                whileInView={{ 
                  opacity: 1, 
                  y: 0,
                  x: 0,
                  rotateY: 0,
                  rotateX: 0,
                  scale: 1,
                  rotateZ: 0
                }}
                transition={{ 
                  duration: 1.8, 
                  delay: index * 0.3,
                  type: "spring",
                  stiffness: 40,
                  damping: 20,
                  mass: 1.5
                }}
                viewport={{ 
                  once: false,
                  margin: "-150px"
                }}
                whileHover={{ 
                  scale: 1.05,
                  y: -10,
                  rotateY: isLeft ? 5 : -5,
                  z: 50,
                  transition: { 
                    duration: 0.6,
                    ease: "easeOut",
                    type: "spring",
                    stiffness: 150,
                    damping: 20
                  }
                }}
                className="relative flex items-center mb-12"
                data-id={exp.id}
              >
              {/* Enhanced Timeline Dot */}
              <motion.div 
                className={`absolute left-1/2 transform -translate-x-1/2 w-6 h-6 ${exp.current ? 'bg-cyan-500' : 'bg-purple-600'} rounded-full border-4 border-white dark:border-slate-800 shadow-xl z-10`}
                whileHover={{ 
                  scale: 1.15,
                  boxShadow: exp.current ? '0 0 20px rgba(6, 182, 212, 0.6)' : '0 0 20px rgba(147, 51, 234, 0.6)'
                }}
                transition={{ duration: 0.3 }}
                style={{
                  transform: 'translateZ(40px)',
                  boxShadow: exp.current ? '0 0 15px rgba(6, 182, 212, 0.5)' : '0 0 15px rgba(147, 51, 234, 0.5)'
                }}
              />
              
              {/* Enhanced Experience Card with Subtle Hover Effects */}
              <motion.div 
                className={`w-5/12 ${index % 2 === 0 ? 'mr-auto' : 'ml-auto'} bg-white/90 dark:bg-slate-700/90 backdrop-blur-sm border border-white/30 dark:border-slate-600/40 rounded-xl p-6 transition-all duration-500 cursor-pointer group`}
                whileHover={{ 
                  scale: 1.08,
                  y: -15,
                  rotateY: index % 2 === 0 ? 8 : -8,
                  rotateX: -5,
                  z: 80,
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.35)'
                }}
                transition={{ 
                  duration: 0.6, 
                  ease: "easeOut",
                  type: "spring",
                  stiffness: 150,
                  damping: 20
                }}
                style={{
                  transformStyle: 'preserve-3d',
                  boxShadow: '0 10px 25px -12px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.1)',
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.8) 100%)',
                  transform: `translateZ(30px)`
                }}
              >
                <div className="flex items-center justify-between mb-2" style={{ transform: 'translateZ(20px)' }}>
                  <div className="text-sm text-cyan-600 dark:text-cyan-400 font-semibold flex items-center group-hover:scale-105 transition-transform duration-300">
                    <Calendar className="mr-1 h-4 w-4" />
                    {exp.duration}
                  </div>
                  {exp.current && (
                    <div className="group-hover:scale-105 transition-transform duration-300" style={{ transform: 'translateZ(10px)' }}>
                      <Badge variant="secondary" className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 shadow-lg">
                        Current
                      </Badge>
                    </div>
                  )}
                </div>
                
                <h3 
                  className="text-xl font-bold mb-2 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors duration-300"
                  style={{ transform: 'translateZ(15px)' }}
                >
                  {exp.title}
                </h3>
                
                <div 
                  className="flex items-center text-purple-600 dark:text-purple-400 font-medium mb-1 group-hover:scale-105 transition-transform duration-300"
                  style={{ transform: 'translateZ(10px)' }}
                >
                  <span>{exp.company}</span>
                </div>
                
                <div 
                  className="flex items-center text-gray-500 dark:text-gray-400 text-sm mb-3 group-hover:scale-105 transition-transform duration-300"
                  style={{ transform: 'translateZ(8px)' }}
                >
                  <MapPin className="mr-1 h-4 w-4" />
                  {exp.location} • {exp.type}
                </div>
                
                <p 
                  className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300"
                  style={{ transform: 'translateZ(5px)' }}
                >
                  {exp.description}
                </p>
                
                <div 
                  className="flex flex-wrap gap-2"
                  style={{ transform: 'translateZ(12px)' }}
                >
                  {exp.skills.map((skill, skillIndex) => (
                    <div
                      key={skill}
                      className="group-hover:scale-105 transition-transform duration-300"
                      style={{ transformStyle: 'preserve-3d' }}
                    >
                      <Badge variant="outline" className="text-xs shadow-sm group-hover:shadow-md group-hover:border-blue-300 transition-all duration-300">
                        {skill}
                      </Badge>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
