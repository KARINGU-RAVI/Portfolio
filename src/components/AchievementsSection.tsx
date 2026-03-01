import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Trophy, Award, Medal, Star } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import portfolioData from '@/data/portfolio-data';
import { useEnhancedScrollAnimation, useContainerHoverEffect } from '@/hooks/useBidirectionalScroll';

const achievementIcons = {
  trophy: Trophy,
  award: Award,
  medal: Medal,
  star: Star,
};

const getAchievementIcon = (title: string) => {
  if (title.toLowerCase().includes('topper')) return 'trophy';
  if (title.toLowerCase().includes('champion')) return 'medal';
  if (title.toLowerCase().includes('gold')) return 'medal';
  if (title.toLowerCase().includes('publication')) return 'star';
  return 'award';
};

const getAchievementColor = (title: string) => {
  if (title.toLowerCase().includes('topper')) return 'from-yellow-500 to-orange-500';
  if (title.toLowerCase().includes('champion')) return 'from-blue-500 to-purple-500';
  if (title.toLowerCase().includes('gold')) return 'from-yellow-400 to-yellow-600';
  if (title.toLowerCase().includes('publication')) return 'from-green-500 to-emerald-500';
  return 'from-purple-500 to-pink-500';
};

export default function AchievementsSection() {
  const { achievements } = portfolioData;
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerHover = useContainerHoverEffect();
  
  // Enhanced bidirectional scroll animations
  const { scrollYProgress, scrollDirection } = useEnhancedScrollAnimation(containerRef, 0, achievements.length);
  
  // Smooth spring animations for 3D effects with bidirectional behavior
  const y = useSpring(useTransform(scrollYProgress, [0, 1], [100, -100]));
  const rotateX = useSpring(useTransform(scrollYProgress, [0, 0.5, 1], [15, 0, -15]));
  const rotateY = useSpring(useTransform(scrollYProgress, [0, 1], [-5, 5]));
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
        setMousePosition({ x: x * 10, y: y * 10 });
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
      id="achievements" 
      ref={containerRef}
      className="py-20 px-6 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900 relative overflow-hidden"
      style={{ perspective: '1000px' }}
    >
      {/* Enhanced 3D Background decoration */}
      <motion.div 
        className="absolute inset-0 overflow-hidden"
        style={{
          rotateX,
          rotateY,
          y: y.get() * 0.3,
          opacity
        }}
      >
        <motion.div 
          className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-blue-400/20 to-purple-600/20 rounded-full blur-3xl"
          style={{
            y: useTransform(scrollYProgress, [0, 1], [50, -200]),
            x: useTransform(scrollYProgress, [0, 1], [0, 100]),
            scale: useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.2, 0.6])
          }}
        />
        <motion.div 
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-green-400/20 to-blue-600/20 rounded-full blur-3xl"
          style={{
            y: useTransform(scrollYProgress, [0, 1], [-50, 200]),
            x: useTransform(scrollYProgress, [0, 1], [0, -100]),
            scale: useTransform(scrollYProgress, [0, 0.5, 1], [1.2, 0.8, 1.4])
          }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-purple-400/10 to-pink-600/10 rounded-full blur-3xl"
          style={{
            scale: useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1.5, 0.7]),
            rotate: useTransform(scrollYProgress, [0, 1], [0, 360])
          }}
        />
      </motion.div>
      
      <motion.div 
        className="max-w-6xl mx-auto relative z-10"
        style={{
          rotateX: mousePosition.y * 0.1,
          rotateY: mousePosition.x * 0.1,
          transformStyle: 'preserve-3d'
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20, rotateX: 45 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
          viewport={{ once: true }}
          className="text-center mb-16"
          style={{
            transform: 'translateZ(50px)',
            transformStyle: 'preserve-3d'
          }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Achievements & Awards
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">Recognition for excellence and dedication</p>
        </motion.div>
        
        <div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {achievements.map((achievement, index) => {
            const iconType = getAchievementIcon(achievement.title);
            const IconComponent = achievementIcons[iconType as keyof typeof achievementIcons];
            const colorGradient = getAchievementColor(achievement.title);
            
            // Enhanced bidirectional animation for each achievement
            const achievementAnimation = useEnhancedScrollAnimation(containerRef, index, achievements.length);
            const { angle, initialPosition, delay } = achievementAnimation;
            
            // Calculate 3D positioning based on grid position
            const gridRow = Math.floor(index / 3);
            const gridCol = index % 3;
            const depthOffset = (gridRow % 2 === 0 ? gridCol : 2 - gridCol) * 20;
            
            return (
              <motion.div
                key={achievement.id}
                initial={{ 
                  opacity: 0, 
                  y: 100, 
                  rotateY: -45,
                  rotateX: 25,
                  scale: 0.8
                }}
                animate={{
                  opacity: achievementAnimation.opacity.get(),
                  y: scrollDirection.direction === 'up' && scrollDirection.isScrolling ? 100 : 0,
                  rotateY: scrollDirection.direction === 'up' && scrollDirection.isScrolling ? -45 : 0,
                  rotateX: scrollDirection.direction === 'up' && scrollDirection.isScrolling ? 25 : 0,
                  scale: scrollDirection.direction === 'up' && scrollDirection.isScrolling ? 0.8 : 1
                }}
                whileInView={{ 
                  opacity: 1, 
                  y: 0, 
                  rotateY: 0,
                  rotateX: 0,
                  scale: 1
                }}
                transition={{ 
                  duration: scrollDirection.direction === 'up' ? 1.0 : 1.4, 
                  delay: scrollDirection.direction === 'up' ? (achievements.length - index - 1) * 0.15 : delay,
                  type: "spring",
                  stiffness: 60,
                  damping: 18,
                  mass: 1.3
                }}
                viewport={{ once: false, amount: 0.3 }}

                style={{
                  transformStyle: 'preserve-3d',
                  transform: `translateZ(${depthOffset}px)`,
                }}
                data-testid={`achievement-card-${achievement.id}`}
              >
                <motion.div
                  className="h-full"
                >
                  <Card className="h-full hover:shadow-2xl transition-all duration-500 border border-white/20 dark:border-slate-700/50 bg-gradient-to-br from-white/90 via-white/70 to-white/50 dark:from-slate-800/90 dark:via-slate-800/70 dark:to-slate-900/50 backdrop-blur-xl overflow-hidden hover:border-blue-200/40 dark:hover:border-blue-400/30"
                    style={{
                      transformStyle: 'preserve-3d',
                      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.05)',
                    }}
                    data-testid={`achievement-card-content-${achievement.id}`}
                  >
                  {/* Enhanced 3D Achievement Image */}
                  {achievement.image && (
                    <motion.div 
                      className="relative h-48 w-full overflow-hidden"
                      style={{ transformStyle: 'preserve-3d' }}
                    >
                      <motion.img 
                        src={achievement.image}
                        alt={achievement.title}
                        className="w-full h-full object-cover"
                        style={{ transformStyle: 'preserve-3d' }}
                      />
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
                      />
                      <motion.div 
                        className="absolute bottom-4 left-4"
                        style={{ transformStyle: 'preserve-3d' }}
                      >
                        <div className={`w-12 h-12 bg-gradient-to-r ${colorGradient} rounded-full flex items-center justify-center shadow-lg`}
                          style={{
                            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)'
                          }}
                        >
                          <IconComponent className="text-white h-6 w-6" />
                        </div>
                      </motion.div>
                    </motion.div>
                  )}
                  
                  <CardHeader 
                    className="text-center pb-4"
                    style={{ transform: 'translateZ(30px)' }}
                  >
                    {!achievement.image && (
                      <motion.div 
                        className="flex justify-center mb-4"
                        style={{ transformStyle: 'preserve-3d' }}
                      >
                        <div className={`w-16 h-16 bg-gradient-to-r ${colorGradient} rounded-full flex items-center justify-center shadow-lg`}
                          style={{
                            boxShadow: '0 15px 35px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.1)'
                          }}
                        >
                          <IconComponent className="text-white h-8 w-8" />
                        </div>
                      </motion.div>
                    )}
                    
                    <Badge variant="secondary" className="self-center mb-2 text-xs">
                      {achievement.date}
                    </Badge>
                    
                    <CardTitle className="text-lg font-bold leading-tight">
                      {achievement.title}
                    </CardTitle>
                    
                    <CardDescription className="text-sm font-medium text-blue-600 dark:text-blue-400">
                      {achievement.issuer}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent style={{ transform: 'translateZ(20px)' }}>
                    <motion.p 
                      className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed"
                      whileHover={{ 
                        color: 'rgb(59, 130, 246)',
                        transition: { duration: 0.3 }
                      }}
                    >
                      {achievement.description}
                    </motion.p>
                  </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
        
        {/* Enhanced 3D Achievement Stats */}
        <motion.div
          initial={{ opacity: 0, y: 50, rotateX: 45 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.8, delay: 0.5, type: "spring" }}
          viewport={{ once: true }}
          className="mt-20 text-center"
          style={{ 
            transform: 'translateZ(80px)',
            transformStyle: 'preserve-3d'
          }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "5+", label: "Awards Won", color: "blue" },
              { value: "1", label: "Research Publication", color: "green" },
              { value: "90%", label: "NPTEL Score", color: "yellow" },
              { value: "500+", label: "Competitors Beaten", color: "purple" }
            ].map((stat, index) => (
              <motion.div 
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, y: 30, rotateY: -20 }}
                whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                whileHover={{ 
                  scale: 1.1,
                  rotateY: 10,
                  y: -10,
                  z: 30
                }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <motion.div 
                  className={`text-3xl font-bold text-${stat.color}-600 dark:text-${stat.color}-400 mb-2`}
                  whileHover={{ 
                    scale: 1.2,
                    rotateZ: 5
                  }}
                  style={{ transform: 'translateZ(20px)' }}
                >
                  {stat.value}
                </motion.div>
                <div 
                  className="text-sm text-gray-600 dark:text-gray-400"
                  style={{ transform: 'translateZ(10px)' }}
                >
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}