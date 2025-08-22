import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Moon, Sun } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { useAISearch } from '@/hooks/useAISearch';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import portfolioData from '@/data/portfolio-data';

const navItems = [
  { name: 'Home', href: '#home' },
  { name: 'Experience', href: '#experience' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Achievements', href: '#achievements' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  
  const { theme, toggleTheme } = useTheme();
  const { search, isSearching, searchResults } = useAISearch();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      setShowSearchResults(false);
      return;
    }

    // Check if search query matches a section name directly
    const sectionMap: Record<string, string> = {
      'home': '#home',
      'experience': '#experience',
      'skills': '#skills',
      'projects': '#projects',
      'achievements': '#achievements',
      'contact': '#contact'
    };

    const queryLower = searchQuery.toLowerCase().trim();
    
    // Direct section navigation
    if (sectionMap[queryLower]) {
      const target = document.querySelector(sectionMap[queryLower]);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
        setSearchQuery('');
        setShowSearchResults(false);
        return;
      }
    }

    // AI-powered search for content
    const results = await search(searchQuery);
    setShowSearchResults(true);
    
    // Scroll to first result if available
    if (results.length > 0) {
      const firstResultId = results[0];
      const element = document.getElementById(firstResultId) || 
                     document.querySelector(`[data-id="${firstResultId}"]`);
      
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        element.classList.add('highlight-search-result');
        setTimeout(() => {
          element.classList.remove('highlight-search-result');
        }, 3000);
      }
    }
  };

  const smoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getItemSection = (itemId: string): string | null => {
    if (itemId.startsWith('exp-')) return 'Experience';
    if (itemId.startsWith('proj-')) return 'Projects';
    if (itemId.startsWith('ach-')) return 'Achievements';
    if (itemId.startsWith('cert-')) return 'Achievements';
    if (itemId.startsWith('edu-')) return 'Experience';
    return null;
  };

  const getItemTitle = (itemId: string): string => {
    // Find the item in portfolio data
    const allItems = [
      ...portfolioData.experiences.map(exp => ({ id: exp.id, title: exp.title })),
      ...portfolioData.projects.map(proj => ({ id: proj.id, title: proj.title })),
      ...portfolioData.achievements.map(ach => ({ id: ach.id, title: ach.title })),
      ...portfolioData.certifications.map(cert => ({ id: cert.id, title: cert.title })),
      ...portfolioData.education.map(edu => ({ id: edu.id, title: edu.degree }))
    ];
    
    const item = allItems.find(item => item.id === itemId);
    return item ? item.title : itemId;
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: isVisible ? 0 : -100 }}
      transition={{ duration: 0.3 }}
      className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-full px-6 py-3 shadow-lg border border-gray-200 dark:border-gray-700"
    >
      <div className="flex items-center justify-between w-full max-w-4xl mx-auto">
        {/* Left Side - Logo */}
        <motion.a 
          href="#home" 
          onClick={(e) => smoothScroll(e, '#home')}
          className="flex items-center space-x-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <img 
            src={portfolioData.personal.logo || 'https://res.cloudinary.com/dumu7y8az/image/upload/v1689959301/ravikaringu_armwif.png'} 
            alt="Ravi Karingu Logo" 
            className="w-8 h-8 rounded-full"
          />
          <span className="font-bold text-lg bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            RK
          </span>
        </motion.a>
        
        {/* Center - AI Search Bar */}
        <div className="relative flex-1 max-w-md mx-8">
          <form onSubmit={handleSearch} className="flex items-center">
            <Input
              type="text"
              placeholder="Search portfolio or type section name..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (!e.target.value.trim()) {
                  setShowSearchResults(false);
                }
              }}
              className="w-full bg-gray-100 dark:bg-slate-700 border-0 focus:ring-2 focus:ring-blue-500 rounded-full pl-4 pr-10"
            />
            <Button
              type="submit"
              size="sm"
              variant="ghost"
              disabled={isSearching}
              className="absolute right-1 p-2 hover:bg-transparent"
            >
              <Search className="h-4 w-4" />
            </Button>
          </form>
          
          {/* Search Results Dropdown */}
          <AnimatePresence>
            {showSearchResults && searchQuery.trim() && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-full mt-2 w-full bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-4 z-10"
              >
                {searchResults.length > 0 ? (
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      Found {searchResults.length} relevant item{searchResults.length !== 1 ? 's' : ''}
                    </p>
                    <div className="space-y-2 mb-3">
                      {searchResults.slice(0, 5).map((resultId) => {
                        const section = getItemSection(resultId);
                        return (
                          <button
                            key={resultId}
                            onClick={() => {
                              const element = document.getElementById(resultId);
                              if (element) {
                                element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                setShowSearchResults(false);
                              }
                            }}
                            className="w-full text-left p-2 rounded hover:bg-gray-100 dark:hover:bg-slate-700 text-sm"
                          >
                            <span className="font-medium">{getItemTitle(resultId)}</span>
                            {section && <span className="text-gray-500 dark:text-gray-400 ml-2">in {section}</span>}
                          </button>
                        );
                      })}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowSearchResults(false)}
                    >
                      Close
                    </Button>
                  </div>
                ) : (
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      No results found for "{searchQuery}"
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mb-3">
                      Try searching for: Projects, Skills, Experience, Achievements, or specific technologies
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowSearchResults(false)}
                    >
                      Close
                    </Button>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {/* Right Side - Navigation Links & Theme Toggle */}
        <div className="flex items-center space-x-4">
          {/* Navigation Links */}
          {navItems.slice(0, 3).map((item) => (
            <motion.a
              key={item.name}
              href={item.href}
              onClick={(e) => smoothScroll(e, item.href)}
              className="text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors relative hidden lg:block"
              whileHover={{ y: -2 }}
            >
              {item.name}
            </motion.a>
          ))}
          
          {/* Theme Toggle */}
          <Button
            onClick={toggleTheme}
            variant="ghost"
            size="sm"
            className="p-2 rounded-full"
          >
            {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          </Button>
        </div>
      </div>
    </motion.nav>
  );
}
