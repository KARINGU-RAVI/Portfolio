import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const testimonials = [
  {
    id: 1,
    quote: "Ravi's expertise in full-stack development and AI integration is exceptional. He delivered our project ahead of schedule with outstanding quality.",
    author: "John Smith",
    role: "CTO, Tech Solutions Inc.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
  },
  {
    id: 2,
    quote: "Working with Ravi was a pleasure. His attention to detail and innovative approach to problem-solving made our collaboration highly successful.",
    author: "Sarah Johnson",
    role: "Product Manager, Innovation Labs",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b787?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
  },
  {
    id: 3,
    quote: "Ravi's technical skills and professional demeanor make him an invaluable team member. His contributions to our AI initiatives were outstanding.",
    author: "Michael Chen",
    role: "Lead Developer, AI Solutions",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
  },
];

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (!isAutoPlay) return;

    const interval = setInterval(nextTestimonial, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlay, currentIndex]);

  return (
    <section className="py-20 px-6 bg-gray-50 dark:bg-slate-800">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Testimonials
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">What colleagues say about my work</p>
        </motion.div>
        
        {/* Testimonials Carousel */}
        <div 
          className="relative overflow-hidden rounded-xl"
          onMouseEnter={() => setIsAutoPlay(false)}
          onMouseLeave={() => setIsAutoPlay(true)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="px-4"
            >
              <Card className="max-w-4xl mx-auto shadow-xl">
                <CardContent className="p-8 text-center">
                  <Quote className="h-12 w-12 text-blue-600 dark:text-blue-400 mx-auto mb-6" />
                  
                  <blockquote className="text-lg text-gray-600 dark:text-gray-300 mb-8 italic leading-relaxed">
                    "{testimonials[currentIndex].quote}"
                  </blockquote>
                  
                  <div className="flex items-center justify-center">
                    <Avatar className="h-16 w-16 mr-4">
                      <AvatarImage src={testimonials[currentIndex].avatar} />
                      <AvatarFallback>
                        {testimonials[currentIndex].author.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="text-left">
                      <div className="font-bold text-lg">{testimonials[currentIndex].author}</div>
                      <div className="text-gray-600 dark:text-gray-400">{testimonials[currentIndex].role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>
          
          {/* Navigation Controls */}
          <div className="flex items-center justify-center mt-8 space-x-4">
            <Button
              variant="outline"
              size="sm"
              onClick={prevTestimonial}
              className="p-2"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            {/* Indicators */}
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentIndex 
                      ? 'bg-blue-600' 
                      : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                />
              ))}
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={nextTestimonial}
              className="p-2"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
