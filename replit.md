# Portfolio Website

## Overview

This is a modern, AI-powered personal portfolio website for Ravi Karingu, a Full Stack Developer and AI Enthusiast. The application showcases professional experience, skills, projects, and achievements through an interactive single-page application with advanced features including AI-powered search capabilities using Google's Gemini API.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript, built using Vite for fast development and optimized builds
- **Styling**: Tailwind CSS with custom design system using CSS variables for theming
- **UI Components**: Radix UI primitives with shadcn/ui component library for consistent, accessible components
- **Animations**: Framer Motion for smooth animations and transitions throughout the application
- **State Management**: TanStack Query (React Query) for server state management and caching
- **Routing**: Wouter for lightweight client-side routing
- **Theme System**: Custom theme provider supporting light/dark mode with localStorage persistence

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript for type safety across the entire application
- **API Design**: RESTful endpoints for portfolio search and contact form submissions
- **Development**: Hot module replacement and development server integration with Vite
- **Build System**: ESBuild for fast production builds of the server code

### Data Storage Solutions
- **Database**: PostgreSQL configured through Drizzle ORM for type-safe database operations
- **Schema Management**: Drizzle Kit for database migrations and schema management
- **Development Storage**: In-memory storage implementation for development/testing environments
- **Session Management**: Connect-pg-simple for PostgreSQL-backed session storage

### Authentication and Authorization
- Currently uses basic session-based approach (can be extended for user authentication)
- No complex auth system implemented, suitable for a personal portfolio

### Key Features Implementation
- **AI-Powered Search**: Google Gemini API integration for natural language portfolio queries
- **Responsive Design**: Mobile-first approach with Tailwind CSS breakpoints
- **Performance Optimization**: Lazy loading, image optimization, and efficient rendering
- **SEO Ready**: Meta tags, structured data, and server-side rendering capabilities
- **Interactive Elements**: Smooth scrolling, hover effects, and dynamic content loading

### Component Architecture
- **Modular Design**: Reusable components for different portfolio sections (Hero, Experience, Skills, Projects, etc.)
- **Data-Driven**: Portfolio content managed through structured data files
- **Accessibility**: ARIA labels, keyboard navigation, and screen reader support
- **Performance**: Optimized re-renders and efficient state updates

## External Dependencies

### Core Technologies
- **Database**: PostgreSQL with Neon Database serverless connection
- **AI Service**: Google Gemini API for intelligent portfolio search functionality
- **Styling**: Tailwind CSS with PostCSS for processing
- **Icons**: Lucide React for consistent iconography

### Development Tools
- **Build Tools**: Vite for frontend bundling, ESBuild for backend compilation
- **Type Checking**: TypeScript compiler for static type analysis
- **Database Tools**: Drizzle ORM and Drizzle Kit for database management
- **Development**: TSX for running TypeScript files in development

### Third-Party Integrations
- **Analytics**: Ready for integration with analytics services
- **Contact Forms**: Backend API endpoints for handling contact submissions
- **GitHub API**: For displaying live GitHub activity and repository information
- **Cloud Storage**: Cloudinary integration for optimized image delivery

### UI and Animation Libraries
- **Component Library**: Radix UI primitives for accessible base components
- **Animation**: Framer Motion for complex animations and page transitions
- **Form Handling**: React Hook Form with Zod validation schemas
- **Date Utilities**: date-fns for date formatting and manipulation

### Communication Tools
- **WhatsApp Integration**: Direct messaging capability through WhatsApp API
- **Email Services**: Ready for integration with email service providers
- **Social Media**: Links and integrations with professional social platforms

The application is designed to be easily deployable on platforms like Replit, Vercel, or Netlify, with environment-based configuration for different deployment scenarios.