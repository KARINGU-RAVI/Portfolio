import { useEffect, useState, useRef } from 'react';
import { useScroll, useTransform, useSpring } from 'framer-motion';

interface ScrollDirection {
  direction: 'up' | 'down';
  isScrolling: boolean;
}

export function useBidirectionalScroll(threshold = 0.1) {
  const [scrollDirection, setScrollDirection] = useState<ScrollDirection>({
    direction: 'down',
    isScrolling: false
  });
  const lastScrollY = useRef(0);
  const scrollTimeout = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const direction = currentScrollY > lastScrollY.current ? 'down' : 'up';
      
      setScrollDirection({
        direction,
        isScrolling: true
      });

      // Clear existing timeout and set new one
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
      
      scrollTimeout.current = setTimeout(() => {
        setScrollDirection(prev => ({ ...prev, isScrolling: false }));
      }, 150);

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, []);

  return scrollDirection;
}

export function useEnhancedScrollAnimation(
  containerRef: React.RefObject<HTMLElement>,
  index: number = 0,
  totalItems: number = 1
) {
  const scrollDirection = useBidirectionalScroll();
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.9", "end 0.1"]
  });

  // Enhanced bidirectional animations that respond to scroll direction
  // When scrolling down: slide in from top (negative y) and fade in
  // When scrolling up: slide out to top (negative y) and fade out
  const y = useSpring(
    useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [80, 0, 0, -80]),
    { stiffness: 120, damping: 25, mass: 1.2 }
  );
  
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]),
    { stiffness: 120, damping: 25, mass: 1.2 }
  );
  
  const scale = useSpring(
    useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.92, 1, 1, 0.92]),
    { stiffness: 120, damping: 25, mass: 1.2 }
  );

  // Calculate staggered animation delays based on index
  const delay = index * 0.1;
  
  // Calculate initial position for elements (semi-circular entry)
  const angle = (index / Math.max(totalItems - 1, 1)) * Math.PI;
  const radius = 150;
  const initialX = -Math.cos(angle) * radius;
  const initialY = Math.sin(angle) * radius * 0.5;
  
  return {
    scrollDirection,
    scrollYProgress,
    y,
    opacity,
    scale,
    delay,
    initialPosition: { x: initialX, y: initialY },
    angle
  };
}

// New hook specifically for container hover effects
export function useContainerHoverEffect() {
  return {
    whileHover: { 
      scale: 1.02,
      y: -5,
      transition: { 
        duration: 0.5,
        ease: "easeOut",
        type: "spring",
        stiffness: 200,
        damping: 20
      }
    },
    whileTap: { 
      scale: 0.98,
      transition: { 
        duration: 0.2,
        ease: "easeInOut"
      }
    }
  };
}