# Routing & Navigation

## Purpose & Responsibility
Manages URL routing, page navigation, and dynamic route handling in the BharatApps Next.js application using the App Router architecture.

## Technical Architecture

### Next.js App Router
- **File-based Routing**: Automatic route creation from file structure
- **Dynamic Routes**: Slug-based app detail pages
- **Client-Side Navigation**: Fast transitions with `next/link`
- **URL Parameters**: Query string handling for navigation context

## Route Structure

### Static Routes
```
/                    → app/page.tsx (Home/Search)
/listing             → app/listing/page.tsx (Browse All)
```

### Dynamic Routes
```
/app/[slug]          → app/app/[slug]/page.tsx (App Details)
```

## Implementation Details

### Home Page Navigation (app/page.tsx)

#### Search Result Links
```typescript
<Link
  href={`/app/${app.slug}?from=home`}
  style={{ /* inline styles */ }}
>
  {app.name}
</Link>
```

**Key Features:**
- Query parameter `from=home` tracks navigation source
- Preserves user context for back navigation
- Client-side navigation for instant transitions

#### Browse All Button
```typescript
<Link href="/listing">
  Browse All Indian Apps
</Link>
```

### Listing Page Navigation (app/listing/page.tsx)

#### Home Button
```typescript
<Link href="/" className={styles.homeButton}>
  🏠 Home
</Link>
```

#### App Card Links
```typescript
<Link 
  key={app.slug} 
  href={`/app/${app.slug}`}
  className={styles.appCard}
>
  {/* Card content */}
</Link>
```

**Navigation Pattern:**
- No query parameters (default navigation)
- Back button returns to listing page
- Maintains scroll position on return

### App Detail Page Navigation (app/app/[slug]/page.tsx)

#### Dynamic Route Handling
```typescript
interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function AppDetailsPage({ params: paramsPromise }: PageProps) {
  const [params, setParams] = useState<{ slug: string } | null>(null);
  
  useEffect(() => {
    paramsPromise.then(p => {
      setParams(p);
      const foundApp = apps.find(a => a.slug === p.slug);
      setApp(foundApp || null);
    });
  }, [paramsPromise]);
}
```

**Key Concepts:**
- Async params resolution (Next.js 15+ requirement)
- Client-side app lookup from static data
- 404 handling for invalid slugs

#### Context-Aware Back Navigation
```typescript
const searchParams = useSearchParams();
const fromHome = searchParams.get('from') === 'home';

const backLink = fromHome ? '/' : '/listing';
const backText = fromHome ? '← Back to Home' : '← Back to Listing';
```

**Navigation Logic:**
- Checks `from` query parameter
- Returns to home if came from search
- Returns to listing if came from browse
- Provides contextual back button text

#### Similar Apps Navigation
```typescript
<Link 
  key={similar.slug} 
  href={`/app/${similar.slug}`}
  className={styles.similarCard}
>
  {similar.name}
</Link>
```

**Behavior:**
- Navigates to another app detail page
- Resets navigation context (no query params)
- Triggers component re-render with new slug

## URL Patterns

### Home Page
```
https://example.com/
```

### Listing Page
```
https://example.com/listing
```

### App Detail (from search)
```
https://example.com/app/zoho-crm?from=home
```

### App Detail (from listing)
```
https://example.com/app/zoho-crm
```

### App Detail (from similar apps)
```
https://example.com/app/zoho-books
```

## Navigation Hooks

### useSearchParams
```typescript
import { useSearchParams } from 'next/navigation';

const searchParams = useSearchParams();
const fromHome = searchParams.get('from') === 'home';
```

**Usage:**
- Read query parameters
- Determine navigation context
- Conditional rendering based on source

### useState for Async Params
```typescript
const [params, setParams] = useState<{ slug: string } | null>(null);

useEffect(() => {
  paramsPromise.then(p => setParams(p));
}, [paramsPromise]);
```

**Purpose:**
- Handle async route params in Next.js 15+
- Prevent hydration mismatches
- Enable client-side data fetching

## Link Component Best Practices

### Prefetching
```typescript
<Link href="/listing" prefetch={true}>
  Browse All
</Link>
```

**Default Behavior:**
- Automatic prefetching on hover
- Instant navigation on click
- Optimized for performance

### Styling Links
```typescript
<Link 
  href="/app/slug"
  style={{
    textDecoration: 'none',
    color: '#2563eb',
    transition: 'color 0.2s ease'
  }}
>
  Link Text
</Link>
```

### Accessibility
```typescript
<Link 
  href="/listing"
  aria-label="Browse all Indian apps"
>
  Browse All
</Link>
```

## Error Handling

### Invalid Slug
```typescript
if (!params || !app) {
  return (
    <main className={styles.main}>
      <div className={styles.notFound}>
        <h1>App not found</h1>
        <p>The app you're looking for doesn't exist.</p>
        <Link href="/listing" className={styles.backLink}>
          ← Back to Listing
        </Link>
      </div>
    </main>
  );
}
```

**Fallback Strategy:**
- Display user-friendly error message
- Provide navigation back to listing
- Maintain application state

## SEO Considerations

### Metadata Generation
```typescript
export const metadata: Metadata = {
  title: "BharatApps - Indian Alternatives to Foreign Apps",
  description: "Discover Indian software alternatives...",
};
```

### Dynamic Metadata (Future Enhancement)
```typescript
export async function generateMetadata({ params }): Promise<Metadata> {
  const app = apps.find(a => a.slug === params.slug);
  return {
    title: `${app.name} - BharatApps`,
    description: app.description,
  };
}
```

## Performance Optimization

### Client-Side Navigation
- No full page reloads
- Shared layout persistence
- Instant route transitions

### Code Splitting
- Automatic route-based splitting
- Lazy loading of page components
- Optimized bundle sizes

## Extension Points

### Adding New Routes
1. Create new file in `app/` directory
2. Export default React component
3. Add navigation links from existing pages

### Adding Query Parameters
```typescript
<Link href={`/app/${slug}?category=${category}&source=search`}>
  App Name
</Link>
```

### Programmatic Navigation
```typescript
import { useRouter } from 'next/navigation';

const router = useRouter();
router.push('/listing');
```

## Common Patterns

### Conditional Back Navigation
```typescript
const getBackLink = (searchParams: URLSearchParams) => {
  const from = searchParams.get('from');
  return from === 'home' ? '/' : '/listing';
};
```

### Preserving Scroll Position
```typescript
<Link href="/listing" scroll={false}>
  Back to Listing
</Link>
```

### External Links
```typescript
<a 
  href={app.website} 
  target="_blank" 
  rel="noopener noreferrer"
>
  Visit Website →
</a>
```

## Testing Considerations
- Test all navigation paths
- Verify query parameter handling
- Check 404 page rendering
- Test back button behavior
- Validate external link security