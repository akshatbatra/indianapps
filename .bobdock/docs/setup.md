# Development Environment Setup

## Prerequisites

### Required Software
- **Node.js**: Version 20.x or higher
- **npm**: Version 10.x or higher (comes with Node.js)
- **Git**: For version control
- **Code Editor**: VS Code recommended with TypeScript extensions

### Optional Tools
- **Vercel CLI**: For deployment testing
- **TypeScript**: Globally installed for type checking

## Initial Setup

### 1. Clone Repository
```bash
git clone https://github.com/akshatbatra/indianapps.git
cd indianapps
```

### 2. Install Dependencies
```bash
npm install
```

This installs:
- `next@^16.2.6` - Next.js framework
- `react@19.2.0` - React library
- `react-dom@19.2.0` - React DOM renderer
- `typescript@^5` - TypeScript compiler
- `@types/node`, `@types/react`, `@types/react-dom` - Type definitions

### 3. Verify Installation
```bash
node --version  # Should be v20.x or higher
npm --version   # Should be 10.x or higher
```

## Development Workflow

### Start Development Server
```bash
npm run dev
```

- Opens at `http://localhost:3000`
- Hot reload enabled for instant updates
- TypeScript compilation on-the-fly
- CSS modules automatically processed

### Build for Production
```bash
npm run build
```

- Creates optimized production build in `.next/` directory
- Performs static analysis and type checking
- Generates static pages where possible
- Minifies JavaScript and CSS

### Start Production Server
```bash
npm run start
```

- Serves the production build
- Requires `npm run build` to be run first
- Runs on `http://localhost:3000` by default

## Project Configuration

### TypeScript Configuration (`tsconfig.json`)
```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{"name": "next"}],
    "paths": {"@/*": ["./*"]}
  }
}
```

**Key Settings:**
- `strict: true` - Full TypeScript strict mode
- `paths: {"@/*": ["./*"]}` - Absolute imports from project root
- `jsx: preserve` - Let Next.js handle JSX transformation

### Next.js Configuration (`next.config.ts`)
```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;
```

**Current State:** Minimal configuration, using Next.js defaults

**Common Customizations (if needed):**
```typescript
const nextConfig: NextConfig = {
  output: 'export',        // For static export
  images: {
    unoptimized: true      // Required for static export
  },
  basePath: '/indianapps', // If deploying to subdirectory
};
```

## Environment Variables

### Not Currently Used
The application does not use environment variables as it's a fully static site with no backend services.

### If Adding External Services
Create `.env.local` file:
```bash
# Analytics
NEXT_PUBLIC_GA_ID=your-google-analytics-id

# API Keys (if adding backend)
API_KEY=your-api-key
```

**Important:** Never commit `.env.local` to version control

## File Structure Conventions

### Component Files
- Use `.tsx` extension for React components
- Use `.ts` extension for utility functions
- Co-locate CSS modules with components: `component.module.css`

### Naming Conventions
- **Components**: PascalCase (e.g., `AppCard.tsx`)
- **Pages**: lowercase with hyphens (e.g., `app-details.tsx`)
- **Utilities**: camelCase (e.g., `formatDate.ts`)
- **CSS Modules**: kebab-case (e.g., `app-details.module.css`)

### Import Paths
```typescript
// Absolute imports using @ alias
import { apps } from '@/app/data/apps';
import styles from '@/app/listing.module.css';

// Relative imports for nearby files
import { AppCard } from './AppCard';
```

## Development Best Practices

### Type Safety
- Always define types for component props
- Use TypeScript's strict mode
- Avoid `any` type unless absolutely necessary
- Define interfaces for data structures

### Code Organization
- Keep components small and focused
- Extract reusable logic into utility functions
- Use CSS modules for component-specific styles
- Keep global styles minimal

### Performance
- Use Next.js Image component for images (when not static export)
- Implement code splitting for large components
- Memoize expensive computations with `useMemo`
- Debounce search inputs

## Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use different port
npm run dev -- -p 3001
```

### TypeScript Errors
```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Build Failures
```bash
# Check for TypeScript errors
npx tsc --noEmit

# Check for linting issues (if ESLint configured)
npm run lint
```

### Module Not Found
- Verify import paths are correct
- Check `tsconfig.json` paths configuration
- Ensure file extensions are included for non-TS files

## IDE Setup (VS Code)

### Recommended Extensions
- **ESLint**: Code linting
- **Prettier**: Code formatting
- **TypeScript and JavaScript Language Features**: Built-in
- **CSS Modules**: IntelliSense for CSS modules

### Workspace Settings (`.vscode/settings.json`)
```json
{
  "typescript.tsdk": "node_modules/typescript/lib",
  "typescript.enablePromptUseWorkspaceTsdk": true,
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode"
}
```

## Testing Setup (Not Currently Implemented)

### If Adding Tests
```bash
npm install --save-dev jest @testing-library/react @testing-library/jest-dom
```

### Test Structure
```
app/
├── __tests__/
│   ├── page.test.tsx
│   └── listing.test.tsx
```

## Deployment Preparation

See `deployment.md` for detailed deployment instructions.

### Quick Deployment Check
```bash
# Build and verify
npm run build
npm run start

# Test all routes
# - http://localhost:3000 (home)
# - http://localhost:3000/listing (browse)
# - http://localhost:3000/app/zoho-crm (sample detail page)
```