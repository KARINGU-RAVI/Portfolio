import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

interface AnimatedContainerProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  style?: React.CSSProperties;
}

export default function AnimatedContainer({ 
  children, 
  className = "", 
  delay = 0,
  style
}: AnimatedContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress for this specific container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.9", "start 0.1"] // Trigger when container enters bottom 10% of viewport
  });

  // Bidirectional animations
  // Fade and slide from top when scrolling down
  // Fade and slide to top when scrolling up
  const y = useSpring(
    useTransform(scrollYProgress, [0, 1], [70, -70]),
    { stiffness: 100, damping: 20, mass: 1.5 }
  );
  
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0, 1, 1, 0]),
    { stiffness: 100, damping: 20, mass: 1.5 }
  );

  const scale = useSpring(
    useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0.9, 1, 1, 0.9]),
    { stiffness: 100, damping: 20, mass: 1.5 }
  );

  return (
    <motion.div
      ref={containerRef}
      style={{
        y,
        opacity,
        scale,
        ...style
      }}
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.8, 
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
        type: "spring",
        stiffness: 100,
        damping: 20
      }}
      whileHover={{ 
        scale: 1.02,
        y: -8,
        transition: { 
          duration: 0.6,
          ease: "easeOut",
          type: "spring",
          stiffness: 150,
          damping: 15
        }
      }}
      className={`transform-gpu will-change-transform ${className}`}
      data-testid="animated-container"
    >
      {children}
    </motion.div>
  );
}