import React from 'react';
import { Bot } from 'lucide-react';
import { ThemeProvider } from '@/components/ThemeProvider';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ExperienceSection from '@/components/ExperienceSection';
import SkillsSection from '@/components/SkillsSection';
import ProjectsSection from '@/components/ProjectsSection';
import AchievementsSection from '@/components/AchievementsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import Chatbot from '@/components/Chatbot';
import { Button } from '@/components/ui/button';
import { useChatbot } from '@/hooks/useChatbot';

export default function Home() {
  const chatbot = useChatbot();

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-slate-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
        <Navbar />
        <main>
          <HeroSection />
          <ExperienceSection />
          <SkillsSection />
          <ProjectsSection />
          <AchievementsSection />
          <ContactSection />
        </main>
        <Footer />
        
        {/* Floating Chatbot Button */}
        <Button
          onClick={chatbot.openChatbot}
          className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-blue-500 hover:bg-blue-600 shadow-lg z-50 p-0"
          aria-label="Open AI Portfolio Assistant"
        >
          <Bot className="h-6 w-6" />
        </Button>
        
        {/* Chatbot Component */}
        <Chatbot {...chatbot} />
      </div>
    </ThemeProvider>
  );
}
