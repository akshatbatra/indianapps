# Development Environment Setup

## Prerequisites

### Required Software
- **Node.js**: Version 20.x or higher
- **npm**: Version 10.x or higher (comes with Node.js)
- **Git**: For version control
- **Code Editor**: VS Code recommended

### Recommended VS Code Extensions
- **ES7+ React/Redux/React-Native snippets**: For React snippets
- **TypeScript and JavaScript Language Features**: Built-in
- **CSS Modules**: For CSS module intellisense
- **Prettier**: Code formatting
- **ESLint**: Linting (if configured)

## Installation Steps

### 1. Clone Repository
```bash
git clone https://github.com/akshatbatra/indianapps.git
cd indianapps
```

### 2. Install Dependencies
```bash
npm install
```

**Dependencies Installed**:
- `next@^16.2.6` - Next.js framework
- `react@19.2.0` - React library
- `react-dom@19.2.0` - React DOM renderer

**Dev Dependencies**:
- `@types/node@^20` - Node.js type definitions
- `@types/react@^19` - React type definitions
- `@types/react-dom@^19` - React DOM type definitions
- `typescript@^5` - TypeScript compiler

### 3. Verify Installation
```bash
node --version  # Should be v20.x or higher
npm --version   # Should be v10.x or higher
```

## Development Workflow

### Start Development Server
```bash
npm run dev
```

**Output**:
```
  ▲ Next.js 16.2.6
  - Local:        http://localhost:3000
  - Network:      http://192.168.x.x:3000

 ✓ Ready in 2.5s
```

**Access Application**:
- Open browser to `http://localhost:3000`
- Hot reload enabled (changes reflect immediately)

### Build for Production
```bash
npm run build
```

**Build Process**:
1. TypeScript compilation
2. CSS module processing
3. Static page generation
4. Asset optimization
5. Bundle creation

**Output Directory**: `.next/`

### Start Production Server
```bash
npm run start
```

**Note**: Requires `npm run build` first.

## Project Structure

```
indinapps/
├── app/                          # Next.js App Router directory
│   ├── page.tsx                  # Home page (search interface)
│   ├── layout.tsx                # Root layout
│   ├── globals.css               # Global styles
│   ├── page.module.css           # Home page styles
│   ├── listing.module.css        # Listing page styles
│   ├── app-details.module.css    # App detail styles
│   ├── favicon.ico               # Favicon
│   ├── data/
│   │   └── apps.ts               # App data (200+ entries)
│   ├── listing/
│   │   └── page.tsx              # Listing page
│   └── app/
│       └── [slug]/
│           └── page.tsx          # Dynamic app detail page
├── public/                       # Static assets
│   └── bharatapps.png            # Logo image
├── apps-data/                    # Raw data (not used in app)
├── next.config.ts                # Next.js configuration
├── tsconfig.json                 # TypeScript configuration
├── package.json                  # Dependencies and scripts
├── package-lock.json             # Dependency lock file
├── .gitignore                    # Git ignore rules
└── .vercelignore                 # Vercel ignore rules
```

## Configuration Files

### next.config.ts
```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;
```

**Purpose**: Next.js framework configuration
**Current State**: Default configuration (no custom settings)

### tsconfig.json
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
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

**Key Settings**:
- `strict: true` - Enables all strict type checking
- `paths: { "@/*": ["./*"] }` - Enables `@/` import alias
- `jsx: "preserve"` - Preserves JSX for Next.js processing

### package.json Scripts
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  }
}
```

## Environment Variables

**Current State**: No environment variables used

**If Needed**: Create `.env.local` file:
```bash
# Example (not currently used)
NEXT_PUBLIC_API_URL=https://api.example.com
```

**Access in Code**:
```typescript
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
```

## Common Development Tasks

### Adding a New App

1. Open `app/data/apps.ts`
2. Add new entry to `apps` array:
```typescript
{
  name: "New App Name",
  slug: "new-app-name",
  description: "Short description",
  description_long: "Longer description (optional)",
  category: "business", // or other category
  website: "https://example.com",
  alternatives: ["Foreign App 1", "Foreign App 2"],
  pricing: "Freemium", // Free/Freemium/Paid
  company: "Company Name",
  location: "City, State",
  image: "https://example.com/logo.png"
}
```
3. Save file (hot reload will update)

### Modifying Styles

**CSS Modules**:
1. Open relevant `.module.css` file
2. Add/modify class:
```css
.newClass {
  color: blue;
  font-size: 16px;
}
```
3. Use in component:
```typescript
import styles from './page.module.css';
<div className={styles.newClass}>Content</div>
```

**Global Styles**:
1. Open `app/globals.css`
2. Add global styles:
```css
body {
  font-family: Arial, sans-serif;
}
```

### Creating New Page

1. Create directory in `app/`:
```bash
mkdir -p app/new-page
```

2. Create `page.tsx`:
```typescript
export default function NewPage() {
  return <div>New Page Content</div>;
}
```

3. Access at `http://localhost:3000/new-page`

## Troubleshooting

### Port Already in Use
```bash
# Error: Port 3000 is already in use
# Solution: Use different port
npm run dev -- -p 3001
```

### TypeScript Errors
```bash
# Clear Next.js cache
rm -rf .next
npm run dev
```

### Module Not Found
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Build Failures
```bash
# Check TypeScript errors
npx tsc --noEmit

# Check for syntax errors
npm run build
```

## Testing Locally

### Manual Testing Checklist

**Home Page**:
- [ ] Search for foreign app (e.g., "WhatsApp")
- [ ] Verify autocomplete suggestions appear
- [ ] Click on suggested Indian app
- [ ] Verify navigation to app detail page
- [ ] Click "Browse All Indian Apps" button

**Listing Page**:
- [ ] Verify all apps displayed in grid
- [ ] Search for Indian app by name
- [ ] Verify filtered results
- [ ] Click on app card
- [ ] Verify navigation to app detail page

**App Detail Page**:
- [ ] Verify app information displayed
- [ ] Check foreign alternatives list
- [ ] Verify similar apps section
- [ ] Click "Visit Website" link (opens in new tab)
- [ ] Test back navigation

### Performance Testing

**Lighthouse Audit**:
1. Open Chrome DevTools
2. Go to Lighthouse tab
3. Run audit
4. Target scores:
   - Performance: 90+
   - Accessibility: 90+
   - Best Practices: 90+
   - SEO: 90+

## Deployment

### Vercel Deployment (Recommended)

1. **Install Vercel CLI**:
```bash
npm install -g vercel
```

2. **Login**:
```bash
vercel login
```

3. **Deploy**:
```bash
vercel
```

4. **Production Deployment**:
```bash
vercel --prod
```

### Alternative: Static Export

1. **Configure** `next.config.ts`:
```typescript
const nextConfig = {
  output: 'export'
};
```

2. **Build**:
```bash
npm run build
```

3. **Output**: `out/` directory (deploy to any static host)

## Development Best Practices

### Code Style
- Use TypeScript for type safety
- Follow React hooks best practices
- Use CSS Modules for component styles
- Keep components small and focused

### Performance
- Use `useMemo` for expensive computations
- Implement lazy loading for images
- Minimize bundle size
- Avoid unnecessary re-renders

### Accessibility
- Use semantic HTML
- Add alt text to images
- Ensure keyboard navigation
- Test with screen readers

### Git Workflow
```bash
# Create feature branch
git checkout -b feature/new-feature

# Make changes and commit
git add .
git commit -m "feat: add new feature"

# Push to remote
git push origin feature/new-feature

# Create pull request on GitHub
```