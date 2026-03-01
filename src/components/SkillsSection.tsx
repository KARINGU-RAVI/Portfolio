import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useEnhancedScrollAnimation, useContainerHoverEffect } from '@/hooks/useBidirectionalScroll';
import { Code, Server, Brain, ChevronRight } from 'lucide-react';
import { 
  SiReact, 
  SiJavascript, 
  SiHtml5, 
  SiCss3, 
  SiTailwindcss, 
  SiNodedotjs, 
  SiPython, 
  SiExpress, 
  SiMysql, 
  SiMongodb, 
  SiGooglecloud,
  SiTensorflow
} from 'react-icons/si';
import { FaMobile, FaBrain, FaRobot, FaChartLine } from 'react-icons/fa';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import portfolioData from '@/data/portfolio-data';

const skillIcons = {
  code: Code,
  server: Server,
  brain: Brain,
};

// Technology-specific icons with their original colors
const techIcons = {
  'React.js': { icon: SiReact, color: '#61DAFB' },
  'JavaScript': { icon: SiJavascript, color: '#F7DF1E' },
  'HTML5': { icon: SiHtml5, color: '#E34F26' },
  'CSS3': { icon: SiCss3, color: '#1572B6' },
  'Tailwind CSS': { icon: SiTailwindcss, color: '#06B6D4' },
  'Responsive Design': { icon: FaMobile, color: '#4285F4' },
  'Node.js': { icon: SiNodedotjs, color: '#339933' },
  'Python': { icon: SiPython, color: '#3776AB' },
  'Express.js': { icon: SiExpress, color: '#000000' },
  'MySQL': { icon: SiMysql, color: '#4479A1' },
  'MongoDB': { icon: SiMongodb, color: '#47A248' },
  'Machine Learning': { icon: SiTensorflow, color: '#FF6F00' },
  'AI Agents': { icon: FaRobot, color: '#9B59B6' },
  'Google Cloud': { icon: SiGooglecloud, color: '#4285F4' },
  'Data Science': { icon: FaChartLine, color: '#2ECC71' },
};

const skillCategories = [
  {
    id: 'frontend',
    title: 'Frontend',
    icon: 'code',
    color: 'from-blue-500 to-cyan-500',
    skills: portfolioData.skills.frontend,
  },
  {
    id: 'backend',
    title: 'Backend',
    icon: 'server',
    color: 'from-green-500 to-emerald-500',
    skills: portfolioData.skills.backend,
  },
  {
    id: 'aicloud',
    title: 'AI & Cloud',
    icon: 'brain',
    color: 'from-purple-500 to-pink-500',
    skills: portfolioData.skills.aicloud,
  },
];

export default function SkillsSection() {
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const containerHover = useContainerHoverEffect();

  const handleSkillClick = (skillName: string) => {
    setSelectedSkill(selectedSkill === skillName ? null : skillName);
    // Here you could implement showing demo projects or examples
    console.log(`Clicked on ${skillName} - implement demo showcase`);
  };

  return (
    <section 
      id="skills" 
      ref={containerRef}
      className="py-20 px-6 bg-gradient-to-br from-gray-50 via-slate-50 to-purple-50 dark:from-slate-800 dark:via-slate-900 dark:to-purple-900 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 w-64 h-64 bg-gradient-to-r from-cyan-400/20 to-blue-600/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-gradient-to-r from-purple-400/20 to-pink-600/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-green-400/10 to-emerald-600/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Skills & Expertise
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">Technologies I work with</p>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => {
            const IconComponent = skillIcons[category.icon as keyof typeof skillIcons];
            const skillAnimation = useEnhancedScrollAnimation(containerRef, categoryIndex, skillCategories.length);
            
            return (
              <motion.div
                key={category.id}
                style={{
                  y: skillAnimation.y,
                  opacity: skillAnimation.opacity,
                  scale: skillAnimation.scale
                }}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 1.0, 
                  delay: categoryIndex * 0.3,
                  type: "spring",
                  stiffness: 80,
                  damping: 20,
                  mass: 1.2
                }}
                viewport={{ once: false, amount: 0.3 }}
                {...containerHover}
                data-id={`skills-${category.id}`}
                data-testid={`skills-card-${category.id}`}
              >
                <Card className="h-full hover:shadow-2xl transition-all duration-500 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border border-white/20 dark:border-slate-700/30 hover:bg-white/95 dark:hover:bg-slate-800/95 hover:transform hover:scale-105">
                  <CardHeader>
                    <div className="flex items-center mb-4">
                      <div className={`w-12 h-12 bg-gradient-to-r ${category.color} rounded-lg flex items-center justify-center mr-4`}>
                        <IconComponent className="text-white h-6 w-6" />
                      </div>
                      <CardTitle className="text-xl">{category.title}</CardTitle>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="space-y-3">
                      {category.skills.map((skill) => {
                        const techIcon = techIcons[skill.name as keyof typeof techIcons];
                        const IconComponent = techIcon?.icon || FaBrain;
                        const iconColor = techIcon?.color || '#3B82F6';
                        
                        return (
                          <motion.div
                            key={skill.name}
                            whileHover={{ 
                              scale: 1.02, 
                              x: 4,
                              transition: { 
                                duration: 0.4,
                                ease: "easeOut"
                              }
                            }}
                            className="flex items-center justify-between cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-700 p-3 rounded-lg transition-all duration-300 group"
                            onClick={() => handleSkillClick(skill.name)}
                          >
                            <div className="flex items-center">
                              <motion.div 
                                className="w-8 h-8 flex items-center justify-center mr-3 rounded-lg bg-white dark:bg-slate-600 shadow-sm group-hover:shadow-md transition-all duration-300"
                                whileHover={{ 
                                  rotate: 5, 
                                  scale: 1.1,
                                  transition: { 
                                    duration: 0.4,
                                    ease: "easeOut",
                                    type: "spring",
                                    stiffness: 200,
                                    damping: 15
                                  }
                                }}
                                style={{ 
                                  filter: `drop-shadow(0 0 8px ${iconColor}40)`,
                                }}
                              >
                                <IconComponent 
                                  className="w-5 h-5" 
                                  style={{ color: iconColor }}
                                />
                              </motion.div>
                              <span className="font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                                {skill.name}
                              </span>
                            </div>
                            <div className="flex items-center">
                              <motion.div
                                whileHover={{ x: 2 }}
                                transition={{ duration: 0.2 }}
                              >
                                <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300" />
                              </motion.div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Skill Detail Modal/Overlay */}
        <AnimatePresence>
          {selectedSkill && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-6"
              onClick={() => setSelectedSkill(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white dark:bg-slate-800 rounded-xl p-6 max-w-md w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-xl font-bold mb-4">{selectedSkill}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Click here to view projects and examples using {selectedSkill}
                </p>
                <Button
                  onClick={() => setSelectedSkill(null)}
                  variant="outline"
                  className="w-full"
                >
                  Close
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
