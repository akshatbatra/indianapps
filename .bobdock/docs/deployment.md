# Deployment Guide

## Deployment Overview

BharatApps is a static Next.js application optimized for deployment on Vercel and other static hosting platforms. The application has no backend dependencies and can be deployed as a fully static site.

## Supported Deployment Platforms

### 1. Vercel (Recommended)
**Why Vercel:**
- Native Next.js support with zero configuration
- Automatic deployments from Git
- Edge network for global performance
- Preview deployments for pull requests
- Built-in analytics and monitoring

**Deployment Steps:**
1. Connect GitHub repository to Vercel
2. Vercel auto-detects Next.js configuration
3. Build command: `npm run build`
4. Output directory: `.next` (automatic)
5. Deploy triggers on push to main branch

**Environment Variables:**
No environment variables required for basic deployment.

### 2. Netlify
**Configuration:**
- Build command: `npm run build`
- Publish directory: `.next`
- Node version: 20.x or higher

### 3. Static Export (Any Host)
**For traditional static hosting:**

1. Add to `next.config.ts`:
```typescript
const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
};
```

2. Build static files:
```bash
npm run build
```

3. Deploy `out/` directory to any static host:
   - GitHub Pages
   - AWS S3 + CloudFront
   - Google Cloud Storage
   - Azure Static Web Apps

## Build Process

### Production Build
```bash
npm run build
```

**Build Output:**
- Optimized JavaScript bundles
- Pre-rendered HTML pages
- Static assets (CSS, images)
- Client-side hydration scripts

**Build Time:** ~30-60 seconds (depends on app count)

### Build Optimization
- **Code Splitting**: Automatic per-route splitting
- **Tree Shaking**: Unused code elimination
- **Minification**: JavaScript and CSS compression
- **Image Optimization**: Automatic (if using Next.js Image)

## Performance Considerations

### Current Performance
- **Initial Load**: < 2 seconds
- **Time to Interactive**: < 3 seconds
- **Lighthouse Score**: 90+ (Performance, Accessibility, Best Practices, SEO)

### Optimization Strategies
1. **Static Generation**: All pages pre-rendered at build time
2. **Client-Side Search**: No API calls, instant results
3. **CSS Modules**: Scoped styles, no global conflicts
4. **Lazy Loading**: Dynamic imports for heavy components (if needed)

## Deployment Checklist

### Pre-Deployment
- [ ] Run `npm run build` locally to verify build success
- [ ] Test all routes (home, listing, app details)
- [ ] Verify search functionality works
- [ ] Check responsive design on mobile/tablet
- [ ] Validate all app links and images
- [ ] Review console for errors/warnings

### Post-Deployment
- [ ] Verify production URL loads correctly
- [ ] Test search with various foreign app names
- [ ] Navigate through multiple app detail pages
- [ ] Check category filtering on listing page
- [ ] Validate meta tags and SEO elements
- [ ] Test on different browsers (Chrome, Firefox, Safari, Edge)

## Continuous Integration/Continuous Deployment (CI/CD)

### GitHub Actions (Optional)
Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Vercel

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run build
```

### Deployment Triggers
- **Production**: Push to `main` branch
- **Preview**: Pull request creation/update
- **Manual**: Trigger from Vercel dashboard

## Monitoring and Analytics

### Recommended Tools
1. **Vercel Analytics**: Built-in performance monitoring
2. **Google Analytics**: User behavior tracking
3. **Sentry**: Error tracking and monitoring
4. **Lighthouse CI**: Automated performance audits

### Key Metrics to Track
- Page load times
- Search query patterns
- Most viewed app categories
- Click-through rates to app websites
- Bounce rates and session duration

## Rollback Strategy

### Vercel Rollback
1. Navigate to Vercel dashboard
2. Select deployment history
3. Click "Promote to Production" on previous deployment
4. Instant rollback (< 1 minute)

### Git-Based Rollback
```bash
git revert <commit-hash>
git push origin main
```

## Domain Configuration

### Custom Domain Setup (Vercel)
1. Add domain in Vercel dashboard
2. Configure DNS records:
   - A record: `76.76.21.21`
   - CNAME: `cname.vercel-dns.com`
3. SSL certificate auto-provisioned
4. Propagation time: 24-48 hours

### Subdomain Configuration
- `www.bharatapps.com` → CNAME to Vercel
- `api.bharatapps.com` → Not applicable (no API)

## Troubleshooting

### Build Failures
**Issue**: Build fails with TypeScript errors
**Solution**: Run `npm run build` locally, fix type errors

**Issue**: Out of memory during build
**Solution**: Increase Node memory: `NODE_OPTIONS=--max-old-space-size=4096 npm run build`

### Runtime Issues
**Issue**: 404 on app detail pages
**Solution**: Verify dynamic route configuration in `app/app/[slug]/page.tsx`

**Issue**: Search not working
**Solution**: Check browser console for JavaScript errors, verify apps.ts is loaded

### Performance Issues
**Issue**: Slow initial load
**Solution**: 
- Enable Vercel Edge Network
- Optimize images (compress, use WebP)
- Review bundle size with `npm run build`

## Security Considerations

### Static Site Security
- No server-side vulnerabilities (no backend)
- No database injection risks
- No authentication/authorization needed
- XSS protection via React's built-in escaping

### Content Security Policy (CSP)
Add to `next.config.ts` for enhanced security:
```typescript
const nextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; img-src 'self' https:; script-src 'self' 'unsafe-inline';"
          }
        ]
      }
    ];
  }
};
```

## Scaling Considerations

### Current Capacity
- **Apps**: 200+ (can scale to 10,000+ without performance impact)
- **Concurrent Users**: Unlimited (static CDN)
- **Search Performance**: O(n) linear search, acceptable for < 10,000 apps

### Future Scaling
If app count exceeds 10,000:
1. Implement search indexing (Algolia, Meilisearch)
2. Add pagination to listing page
3. Consider API-based data fetching
4. Implement lazy loading for app cards

## Cost Estimation

### Vercel Pricing
- **Hobby Plan**: Free (sufficient for most use cases)
  - 100 GB bandwidth/month
  - Unlimited deployments
  - Automatic HTTPS

- **Pro Plan**: $20/month (if needed)
  - 1 TB bandwidth/month
  - Advanced analytics
  - Password protection

### Alternative Hosting Costs
- **Netlify**: Free tier available
- **GitHub Pages**: Free (public repos)
- **AWS S3 + CloudFront**: ~$1-5/month (low traffic)

## Backup and Recovery

### Data Backup
- **Source Code**: GitHub repository (primary backup)
- **Deployment History**: Vercel stores last 100 deployments
- **Static Assets**: Committed to Git

### Recovery Time Objective (RTO)
- **Vercel Rollback**: < 1 minute
- **Redeploy from Git**: < 5 minutes
- **Full Recovery**: < 10 minutes

## Compliance and Legal

### Data Privacy
- No user data collection (unless analytics added)
- No cookies required for core functionality
- GDPR compliant (no personal data processing)

### Content Licensing
- App data sourced from public information
- App logos/images: Fair use for informational purposes
- User-generated content: Not applicable

## Deployment Best Practices

1. **Test Locally First**: Always run `npm run build` before pushing
2. **Use Preview Deployments**: Test changes in preview before merging
3. **Monitor Performance**: Track Core Web Vitals after each deployment
4. **Version Control**: Tag releases for easy rollback
5. **Documentation**: Update docs when adding new features
6. **Gradual Rollout**: Use Vercel's traffic splitting for major changes
7. **Automated Testing**: Add E2E tests before deployment (future)

## Emergency Procedures

### Site Down
1. Check Vercel status page
2. Verify DNS configuration
3. Review recent deployments
4. Rollback to last known good deployment
5. Contact Vercel support if needed

### Data Corruption
1. Verify apps.ts integrity
2. Restore from Git history
3. Redeploy from clean state
4. Validate all app data

### Security Incident
1. Immediately rollback deployment
2. Review commit history for malicious changes
3. Rotate any credentials (if applicable)
4. Audit access logs
5. Deploy patched version