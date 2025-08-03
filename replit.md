# replit.md

## Overview

This is a time tracking web application that allows users to clock in and out of work sessions. The application provides a mobile-first interface built with React and TypeScript, featuring a dashboard that displays current work status, time tracking functionality, and work history. The system is designed as a single-user demo application with a focus on simplicity and ease of use.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript using Vite as the build tool
- **UI Library**: Shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with CSS variables for theming
- **State Management**: TanStack Query (React Query) for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Mobile-First Design**: Responsive layout optimized for mobile devices with a bottom navigation pattern

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Pattern**: RESTful API endpoints under `/api` prefix
- **Request Handling**: JSON body parsing with URL-encoded form support
- **Error Handling**: Centralized error middleware with status code mapping
- **Development Server**: Vite integration for hot module replacement in development

### Data Storage Solutions
- **Database**: PostgreSQL configured through Drizzle ORM
- **Schema Management**: Drizzle Kit for migrations and schema generation
- **Connection**: Neon Database serverless connection (@neondatabase/serverless)
- **Fallback Storage**: In-memory storage implementation for development/demo purposes
- **Schema Definition**: Shared schema types between client and server using Zod validation

### Authentication and Authorization
- **Current Implementation**: Demo mode with hard-coded default user ("philip")
- **Session Management**: Connect-pg-simple for PostgreSQL session storage (configured but not actively used)
- **Architecture**: Designed to support session-based authentication expansion

### Key Features
- **Time Tracking**: Clock in/out functionality with real-time session tracking
- **Work History**: Display of previous work sessions grouped by date
- **Status Display**: Real-time work status with current session information
- **Duration Calculation**: Automatic calculation of work session durations
- **Danish Localization**: UI text and date formatting in Danish language
- **AI Chatbot**: OpenAI-powered assistant for work-related questions and support

### Data Models
- **Users**: ID, username, and display name
- **Work Sessions**: Session tracking with clock-in/out times, user association, and active status
- **Validation**: Zod schemas for type-safe data validation across client-server boundary

### AI Integration
- **OpenAI API**: GPT-4o model for intelligent chat responses in Danish
- **Chat Interface**: Floating chat widget with real-time messaging
- **Context Awareness**: AI knows user's current work status for relevant responses
- **Work Support**: Specialized for work-related questions and time tracking help

### Deployment Configuration
- **Environment Validation**: Comprehensive config validation with graceful fallbacks
- **DATABASE_URL Handling**: Application works without database, uses in-memory storage as fallback
- **Error Handling**: Non-failing startup process that logs warnings instead of crashing
- **Production Ready**: Designed to deploy successfully even with missing environment variables

## External Dependencies

### Core Framework Dependencies
- **@vitejs/plugin-react**: React plugin for Vite build system
- **express**: Web application framework for Node.js backend
- **drizzle-orm**: TypeScript ORM for database operations
- **@tanstack/react-query**: Data fetching and caching library

### Database and Storage
- **@neondatabase/serverless**: Serverless PostgreSQL connection driver
- **drizzle-kit**: Database migration and introspection toolkit
- **connect-pg-simple**: PostgreSQL session store for Express sessions

### UI and Styling
- **@radix-ui/react-***: Comprehensive set of unstyled UI components
- **tailwindcss**: Utility-first CSS framework
- **lucide-react**: Icon library for React applications
- **class-variance-authority**: Utility for creating variant-based component APIs

### Form Handling and Validation
- **react-hook-form**: Form library for React with minimal re-renders
- **@hookform/resolvers**: Validation resolver adapters for react-hook-form
- **zod**: TypeScript-first schema validation library

### Development and Build Tools
- **typescript**: Static type checking for JavaScript
- **vite**: Fast build tool and development server
- **esbuild**: Fast JavaScript bundler for production builds
- **tsx**: TypeScript execution environment for Node.js

### Specialized Libraries
- **wouter**: Minimalist routing library for React
- **date-fns**: Modern JavaScript date utility library
- **cmdk**: Command menu component for React applications
- **embla-carousel-react**: Carousel component library

### AI and External Services
- **openai**: Official OpenAI SDK for GPT-4o integration
- **OPENAI_API_KEY**: Environment variable for OpenAI API authentication

## Recent Changes (August 2025)

### ✅ DEPLOYMENT FULLY RESOLVED
- **Fixed Frontend Serving**: Resolved issue where deployment served Vite dev server instead of built static files
- **Production Environment**: Application now correctly detects NODE_ENV=production in deployment
- **Static File Routing**: Frontend assets (CSS/JS) now serve correctly from dist/public/
- **Complete Solution**: App deploys and runs perfectly with all features functional

### Deployment Architecture
- **Build Process**: `bash build.sh` handles DATABASE_URL and creates production builds
- **Runtime Environment**: `npm run start` sets NODE_ENV=production automatically
- **File Structure**: Built files correctly organized in dist/public/ and dist/index.js
- **Environment Detection**: Server properly switches between dev (Vite) and production (static) modes

### Technical Improvements
- Application deploys successfully and serves frontend correctly
- DATABASE_URL completely optional - in-memory storage fallback works reliably  
- Production static file serving resolves the "Not Found" deployment issue
- Comprehensive logging shows environment detection and startup process
- Time tracking functionality fully operational in deployed environment