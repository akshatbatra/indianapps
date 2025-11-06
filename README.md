# BharatApps - Indian App Alternatives

A modern Next.js website showcasing Indian software alternatives to popular foreign applications. Support local tech, reduce costs, and ensure data privacy with Indian-made solutions.

## 🚀 Features

- **Listing Page**: Browse all 165+ Indian apps with their categories and foreign alternatives
- **Search Functionality**: Search by foreign app names (Salesforce, Slack, Figma, etc.) to find Indian alternatives
- **Advanced Filtering**: Filter apps by their foreign alternatives with dropdown suggestions
- **Details Page**: View complete information about each Indian app including pricing, location, company info, and more
- **Responsive Design**: Mobile-friendly interface that works on all devices
- **Fast Performance**: Built with Next.js App Router for optimal performance

## 📊 Data

The site includes hardcoded data for 165+ Indian applications across 13 categories:
- Business
- Finance
- Development
- Communication
- Productivity
- E-Commerce
- Education
- Entertainment
- Creative
- Social Networking
- Travel
- Hosting
- Utilities

## 🛠️ Tech Stack

- **Framework**: Next.js 14.0.0
- **Language**: TypeScript
- **Styling**: CSS Modules + Inline Styles
- **Deployment**: Vercel (optimized)

## 📝 Project Structure

```
bharatapps/
├── app/
│   ├── data/
│   │   └── apps.ts              # Hardcoded data for all 165+ apps
│   ├── app/
│   │   └── [slug]/
│   │       └── page.tsx         # Dynamic app details page
│   ├── listing/
│   │   └── page.tsx             # Main listing and search page
│   ├── page.tsx                 # Homepage
│   ├── layout.tsx               # Root layout
│   ├── globals.css              # Global styles
│   ├── app-details.module.css   # Details page styles
│   └── listing.module.css       # Listing page styles
├── apps-data/                   # Source data (for reference)
├── package.json
├── next.config.js
└── tsconfig.json
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd bharatapps

# Install dependencies
npm install

# Run development server
npm run dev
```

The site will be available at `http://localhost:3000`

## 📦 Building for Production

```bash
npm run build
npm start
```

## 🌐 Deployment on Vercel

### Option 1: Deploy via Git (Recommended)

1. Push your repository to GitHub, GitLab, or Bitbucket
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project" and select your repository
4. Vercel will auto-detect Next.js and set up the build
5. Click "Deploy"

### Option 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# For production
vercel --prod
```

### Configuration

The project is optimized for Vercel with:
- Automatic image optimization support
- Turbopack for fast builds
- Edge Functions ready (if needed)

## 🎨 Pages Overview

### Homepage (`/`)
Welcome page with highlights of why BharatApps is useful
- Quick navigation to browse and search
- Feature highlights
- Call-to-action buttons

### Listing Page (`/listing`)
Main page showing all Indian apps with advanced search
- Real-time search by app name or description
- Dropdown suggestions for foreign apps
- Filter by foreign app alternatives
- Beautiful card-based grid layout
- Quick preview of alternatives

### App Details Page (`/app/[slug]`)
Comprehensive information about each Indian app
- Full app description
- Pricing model and company details
- Location information
- List of foreign alternatives
- Related apps in the same category
- Direct link to app website

## 🔧 Environment Variables

No environment variables are required for this project. All data is hardcoded for static generation.

## 📱 Responsive Design

The site is fully responsive and works great on:
- Desktop (1920px and above)
- Tablet (768px - 1919px)
- Mobile (below 768px)

## ⚡ Performance

- **Static Generation**: Pages are pre-built at deploy time
- **Image Optimization**: Automatic image optimization via Next.js
- **Code Splitting**: Automatic code splitting for faster loading
- **CSS Modules**: Scoped CSS to prevent conflicts

## 🔒 Privacy & Security

- No tracking or analytics libraries
- No external API calls
- All data is served statically
- GDPR compliant

## 📄 Data Structure

Each app in `/app/data/apps.ts` includes:
```typescript
{
  name: string              // App name
  slug: string             // URL slug
  description: string      // Short description
  category: string        // App category
  website: string         // Official website URL
  alternatives: string[]  // Foreign app alternatives
  pricing: string        // Pricing model
  company: string        // Company name
  location: string       // Company location
  image: string          // Logo/image URL
  description_long: string // Detailed description
}
```

## 🤝 Contributing

To add more apps:
1. Add new entries to `/app/data/apps.ts`
2. Run `npm run build` to ensure no errors
3. Test the details page for the new app

## 📈 SEO

- All pages are static and SEO-friendly
- Proper HTML structure with semantic tags
- Optimized meta tags in layout
- Fast loading times improve rankings

## 🐛 Troubleshooting

### Build fails with "Module not found"
Make sure all imports use correct relative paths starting with `../` from the nested directories.

### Dev server won't start
```bash
# Clear cache
rm -rf .next node_modules
npm install
npm run dev
```

### Images not loading
Check that the `next.config.js` has the correct image domains configured.

## 📞 Support

For issues or questions, please open an issue on the repository.

## 📄 License

This project is open source and available under the MIT License.

---

**Made with ❤️ for the Indian Tech Ecosystem**


## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
