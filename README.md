# Cloud Platform

A modern, full-stack cloud platform built with TypeScript, React, and Node.js. This monorepo contains a collection of interconnected services and applications designed to provide a comprehensive cloud solution.

## 🚀 Overview

This project is a professionally structured monorepo using **pnpm workspaces** with multiple artifacts and libraries:

- **API Server** - RESTful backend service built with Express.js
- **Database Layer** - Type-safe database operations with Drizzle ORM
- **Client Applications** - React-based web and sandbox environments
- **Shared Libraries** - Common utilities and type definitions
- **Infrastructure** - Serverless deployment with Vercel

## 📋 Tech Stack

### Core Technologies
- **Language**: TypeScript 5.9+
- **Package Manager**: pnpm (with workspace support)
- **Runtime**: Node.js 20+
- **License**: MIT

### Frontend
- React 19.1.0
- Tailwind CSS 4.1+
- Framer Motion (animations)
- Wouter (routing)
- TanStack React Query (data fetching)
- Lucide React (icons)

### Backend
- Express.js 5.2
- Drizzle ORM 0.45+
- Pino (logging)
- CORS & Cookie Parser (middleware)

### Database & Storage
- Neon Database (Serverless PostgreSQL)
- Vercel Blob Storage

### Development Tools
- Vite (bundling)
- ESBuild (compilation)
- Prettier (formatting)

## 📁 Project Structure

```
.
├── artifacts/                 # Production packages
│   ├── api-server/           # Backend Express server
│   ├── ouwibo/              # Main application
│   └── mockup-sandbox/      # Sandbox environment
├── lib/                       # Shared libraries
│   └── integrations/        # Third-party integrations
├── scripts/                   # Utility scripts
├── api/                       # Vercel serverless functions (if applicable)
├── pnpm-workspace.yaml       # Workspace configuration
├── pnpm-lock.yaml            # Dependency lockfile
└── vercel.json               # Vercel deployment config
```

## 🛠️ Development Setup

### Prerequisites
- Node.js 20 or higher
- pnpm (enforced - npm/yarn will be rejected)

### Installation

```bash
# Install dependencies
pnpm install

# The preinstall script ensures pnpm usage
# (npm and yarn are explicitly rejected)
```

### Available Scripts

#### Build & Type Checking
```bash
# Full build with type checking
pnpm build

# Type checking only
pnpm typecheck

# Type checking for libraries only
pnpm typecheck:libs
```

#### Development
```bash
# From artifacts/api-server directory
pnpm dev        # Development server with auto-reload
pnpm start      # Production server
```

### Workspace Management

This project uses **pnpm workspaces** to manage multiple packages:

```bash
# Install dependencies for specific workspace
pnpm -r install

# Run scripts across all workspaces
pnpm -r build

# Run scripts for specific package
pnpm -w @workspace/api-server dev
```

## 🔒 Security Features

### Supply Chain Protection
- **Minimum Release Age**: 1440 minutes (24 hours) for npm packages
- This defense mechanism prevents installation of malicious packages before they are discovered and removed

### Build Configuration
- **Source Maps**: Enabled in production builds for debugging
- **Platform Optimization**: esbuild configured for Linux x64 only (optimized for production environment)

## 🚀 Deployment

### Vercel Deployment

The project is configured for Vercel with:
- `vercel.json` configuration for build settings and routing
- Serverless functions support via `/api` directory
- Automatic deployments on git push

### Environment Variables

Required environment variables (configure in Vercel dashboard or `.env.local`):
- Database connection strings (Neon)
- API endpoints
- Authentication credentials

## 📦 Monorepo Packages

### `@workspace/api-server`
Express-based REST API server with:
- CORS support
- Cookie parsing
- Request logging with Pino
- Type-safe database operations

### `@workspace/ouwibo`
Main client application with React and Tailwind CSS

### `@workspace/mockup-sandbox`
Sandbox environment for testing and prototyping

## 🔧 Configuration Files

- **pnpm-workspace.yaml** - Defines workspace packages and shared dependencies catalog
- **tsconfig.json** - Base TypeScript configuration
- **tsconfig.base.json** - Shared TypeScript settings
- **vercel.json** - Vercel deployment configuration
- **prettier.config.js** - Code formatting rules

## 📚 Dependencies Management

The workspace uses a **catalog** system for dependency versions:

```yaml
catalog:
  react: 19.1.0
  tailwindcss: ^4.1.14
  drizzle-orm: ^0.45.2
  # ... more dependencies
```

This ensures consistent versions across all workspace packages.

## 🤝 Contributing

1. Ensure you're using **pnpm** (enforced by preinstall script)
2. Run type checking before committing: `pnpm typecheck`
3. Format code with Prettier
4. Follow TypeScript strict mode best practices

## 📝 License

MIT License - see LICENSE file for details

## 🔗 Links

- **Website**: https://ouwibo.bond
- **Repository**: https://github.com/ouwibo/cloud

## 🆘 Support

For issues, questions, or contributions:
- Open an issue on GitHub
- Check existing documentation in the repository
- Review TypeScript and framework documentation

---

**Last Updated**: June 2026  
**Node Version**: ≥20  
**Package Manager**: pnpm
