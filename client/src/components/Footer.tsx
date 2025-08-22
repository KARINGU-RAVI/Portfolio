import React from 'react';
import { Github, Linkedin, Twitter, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import portfolioData from '@/data/portfolio-data';

const quickLinks = [
  { name: 'Home', href: '#home' },
  { name: 'Experience', href: '#experience' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
];

const socialLinks = [
  { icon: Github, href: portfolioData.personal.github, label: 'GitHub' },
  { icon: Linkedin, href: portfolioData.personal.linkedin, label: 'LinkedIn' },
  { icon: Twitter, href: portfolioData.personal.twitter || 'https://x.com/RAVIKaringu1', label: 'Twitter' },
];

export default function Footer() {
  const smoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gray-900 text-white py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand & Description */}
          <div>
            <h3 className="text-xl font-bold mb-4">{portfolioData.personal.name}</h3>
            <p className="text-gray-400 leading-relaxed mb-6">
              {portfolioData.personal.subtitle} passionate about creating innovative solutions 
              that make a difference in the world.
            </p>
            <p className="text-gray-400 text-sm">
              Based in {portfolioData.personal.location}
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-medium mb-4">Quick Links</h4>
            <div className="space-y-2">
              {quickLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => smoothScroll(e, link.href)}
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
          
          {/* Connect */}
          <div>
            <h4 className="text-lg font-medium mb-4">Connect</h4>
            <div className="flex space-x-4 mb-6">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <Button
                    key={social.label}
                    asChild
                    variant="ghost"
                    size="sm"
                    className="text-gray-400 hover:text-white hover:bg-gray-800"
                  >
                    <a 
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                    >
                      <IconComponent className="h-5 w-5" />
                    </a>
                  </Button>
                );
              })}
            </div>
            
            <div className="space-y-2">
              <Button
                asChild
                variant="outline"
                size="sm"
                className="w-full border-gray-600 text-gray-300 hover:bg-gray-800"
              >
                <a 
                  href={portfolioData.personal.resumeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Download Resume
                </a>
              </Button>
              
              <Button
                asChild
                variant="outline"
                size="sm"
                className="w-full border-gray-600 text-gray-300 hover:bg-gray-800"
              >
                <a href={`mailto:${portfolioData.personal.email}`}>
                  Send Email
                </a>
              </Button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 flex items-center justify-center">
            © 2024 {portfolioData.personal.name}. All rights reserved. 
            Made with <Heart className="h-4 w-4 mx-1 text-red-500" /> using React & Tailwind CSS.
          </p>
        </div>
      </div>
    </footer>
  );
}
