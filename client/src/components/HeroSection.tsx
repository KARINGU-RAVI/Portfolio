import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Download, ChevronDown, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import portfolioData from '@/data/portfolio-data';

export default function HeroSection() {
  const { personal } = portfolioData;

  return (
    <section id="home" className="min-h-screen flex items-center justify-center px-6 pt-24 relative overflow-hidden">
      {/* Enhanced Background Animation Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1], 
            rotate: [0, 360],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-40 -right-32 w-96 h-96 bg-gradient-to-r from-blue-400 via-purple-500 to-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
        />
        <motion.div
          animate={{ 
            scale: [1.2, 1, 1.2], 
            rotate: [360, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-40 -left-32 w-96 h-96 bg-gradient-to-r from-purple-400 via-pink-500 to-rose-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
        />
        <motion.div
          animate={{ 
            scale: [1, 1.3, 1], 
            rotate: [0, -360],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 right-1/4 w-64 h-64 bg-gradient-to-r from-cyan-400 via-teal-500 to-emerald-600 rounded-full mix-blend-multiply filter blur-2xl opacity-25"
        />
        
        {/* Additional subtle geometric patterns */}
        <div className="absolute top-20 left-20 w-32 h-32 border border-blue-200/20 dark:border-blue-800/20 rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 border border-purple-200/20 dark:border-purple-800/20 rounded-full"></div>
        <div className="absolute top-1/3 left-1/4 w-24 h-24 border border-pink-200/20 dark:border-pink-800/20 rounded-full"></div>
      </div>
      
      <div className="max-w-6xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Profile Image with 3D effect */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative inline-block mb-8"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-xl opacity-30 transform scale-110" />
            <img 
              src={personal.profileImage}
              alt={`${personal.name} Profile Photo`}
              className="relative w-40 h-40 rounded-full border-4 border-white dark:border-slate-800 shadow-2xl object-cover transform hover:scale-105 transition-transform duration-300"
            />
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent leading-tight"
          >
            {personal.name}
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 font-medium"
          >
            {personal.subtitle}
          </motion.p>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-lg text-gray-600 dark:text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            {personal.bio}
          </motion.p>
          
          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="flex justify-center space-x-6 mb-12"
          >
            <Button
              asChild
              className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:scale-105 transition-transform"
            >
              <a href={personal.github} target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </a>
            </Button>
            
            <Button
              asChild
              className="bg-blue-600 hover:bg-blue-700 hover:scale-105 transition-transform"
            >
              <a href={personal.linkedin} target="_blank" rel="noopener noreferrer">
                <Linkedin className="mr-2 h-4 w-4" />
                LinkedIn
              </a>
            </Button>
            
            <Button
              asChild
              className="bg-blue-400 hover:bg-blue-500 hover:scale-105 transition-transform"
            >
              <a href={personal.twitter || 'https://x.com/RAVIKaringu1'} target="_blank" rel="noopener noreferrer">
                <Twitter className="mr-2 h-4 w-4" />
                Twitter
              </a>
            </Button>
            
            <Button
              asChild
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 hover:scale-105 transition-transform"
            >
              <a href={personal.resumeLink} target="_blank" rel="noopener noreferrer">
                <Download className="mr-2 h-4 w-4" />
                Resume
              </a>
            </Button>
          </motion.div>
          
          {/* Scroll Indicator */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-gray-400"
          >
            <ChevronDown className="h-8 w-8 mx-auto" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
