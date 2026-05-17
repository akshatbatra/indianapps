# Data Management

## Purpose & Responsibility
Centralized data storage and schema definition for all Indian applications in the platform. Provides type-safe access to app information throughout the application.

## Location
- **File**: `app/data/apps.ts`
- **Size**: ~113KB (200+ apps)
- **Format**: TypeScript array export

## Data Schema

### App Interface
```typescript
interface App {
  name: string;              // Display name of the app
  slug: string;              // URL-safe identifier (kebab-case)
  description: string;       // Short description (1-2 sentences)
  category: string;          // Functional category
  website: string;           // Official website URL
  alternatives: string[];    // Foreign apps it replaces
  pricing: string;           // "Free", "Freemium", or "Paid"
  company: string;           // Company/organization name
  location: string;          // City, State in India
  image: string;             // Logo/icon URL
  description_long: string;  // Extended description (optional)
}
```

### Example Entry
```typescript
{
  "name": "Zoho CRM",
  "slug": "zoho-crm",
  "description": "Customer relationship management software for sales teams and businesses",
  "category": "business",
  "website": "https://www.zoho.com/crm/",
  "alternatives": ["Salesforce", "HubSpot", "Pipedrive"],
  "pricing": "Freemium",
  "company": "Zoho Corporation",
  "location": "Chennai",
  "image": "https://www.zohowebstatic.com/sites/zweb/images/ogimage/crm-logo.png",
  "description_long": "Zoho CRM is an online Sales CRM software..."
}
```

## Categories

The platform organizes apps into 15 functional categories:

1. **business** (50+ apps): CRM, ERP, HR, project management, analytics
2. **communication** (15+ apps): Messaging, video conferencing, telephony
3. **creative** (5+ apps): Design, video editing, content creation
4. **development** (15+ apps): Cloud platforms, APIs, testing tools
5. **e-commerce** (15+ apps): Online stores, marketplaces, logistics
6. **education** (3+ apps): Learning platforms, online courses
7. **entertainment** (15+ apps): Streaming, music, video platforms
8. **finance** (5+ apps): Payments, accounting, expense management
9. **hosting** (5+ apps): Domain registration, web hosting
10. **productivity** (10+ apps): Office suites, note-taking, calendars
11. **social-networking** (3+ apps): Social media platforms
12. **travel** (3+ apps): Ride-hailing, booking platforms
13. **utilities** (10+ apps): Browsers, search engines, password managers

## Data Access Patterns

### Import and Use
```typescript
import { apps } from './data/apps';

// Find by slug
const app = apps.find(a => a.slug === 'zoho-crm');

// Filter by category
const businessApps = apps.filter(a => a.category === 'business');

// Search by name
const results = apps.filter(a => 
  a.name.toLowerCase().includes(query.toLowerCase())
);
```

### Foreign App to Indian Alternatives Mapping
```typescript
// Build reverse index
const foreignAppToIndianAlternatives: Record<string, typeof apps> = {};
apps.forEach(app => {
  app.alternatives.forEach(alt => {
    const lowerAlt = alt.toLowerCase();
    if (!foreignAppToIndianAlternatives[lowerAlt]) {
      foreignAppToIndianAlternatives[lowerAlt] = [];
    }
    foreignAppToIndianAlternatives[lowerAlt].push(app);
  });
});

// Usage
const indianAlternatives = foreignAppToIndianAlternatives['salesforce'];
// Returns: [Zoho CRM, LeadSquared, ...]
```

### Get Unique Foreign Apps
```typescript
const uniqueForeignApps = Array.from(
  new Set(apps.flatMap(app => app.alternatives.map(alt => alt.toLowerCase())))
).sort();
```

## Data Quality Standards

### Required Fields
- All fields except `description_long` are required
- `slug` must be unique across all apps
- `website` must be valid URL starting with https://
- `alternatives` must have at least one entry

### Slug Generation Rules
```typescript
// Convert name to slug
function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

// Examples:
// "Zoho CRM" → "zoho-crm"
// "MSG91" → "msg91"
// "Site24x7" → "site24x7"
```

### Image URL Guidelines
- Prefer official brand assets
- Use CDN URLs when available
- Fallback to Wikipedia/public sources
- Ensure HTTPS protocol
- Verify image accessibility

## Data Maintenance

### Adding a New App
```typescript
// 1. Create new entry following schema
const newApp = {
  name: "App Name",
  slug: "app-name",
  description: "Brief description",
  category: "business",
  website: "https://example.com",
  alternatives: ["Foreign App 1", "Foreign App 2"],
  pricing: "Freemium",
  company: "Company Name",
  location: "City, State",
  image: "https://example.com/logo.png",
  description_long: "Extended description"
};

// 2. Add to apps array
export const apps = [
  // ... existing apps
  newApp,
];

// 3. Verify slug uniqueness
// 4. Test in development
// 5. Commit changes
```

### Updating Existing App
```typescript
// 1. Find app by slug
// 2. Update fields
// 3. Verify data integrity
// 4. Test affected pages
// 5. Commit changes
```

### Removing an App
```typescript
// 1. Identify app to remove
// 2. Remove from apps array
// 3. Check for broken links
// 4. Update related documentation
// 5. Commit changes
```

## Data Validation

### Type Safety
```typescript
// TypeScript ensures type safety
const app: typeof apps[0] = {
  // TypeScript will error if fields are missing or wrong type
};
```

### Runtime Validation (Recommended)
```typescript
function validateApp(app: any): boolean {
  return (
    typeof app.name === 'string' &&
    typeof app.slug === 'string' &&
    typeof app.description === 'string' &&
    typeof app.category === 'string' &&
    typeof app.website === 'string' &&
    Array.isArray(app.alternatives) &&
    app.alternatives.length > 0 &&
    ['Free', 'Freemium', 'Paid'].includes(app.pricing) &&
    typeof app.company === 'string' &&
    typeof app.location === 'string' &&
    typeof app.image === 'string'
  );
}
```

## Performance Considerations

### File Size
- Current: ~113KB uncompressed
- Gzipped: ~15-20KB
- Impact: Minimal on modern connections

### Memory Usage
- Loaded once on client
- Shared across all components
- No memory leaks (static data)

### Search Performance
```typescript
// Linear search O(n) - acceptable for 200 apps
const result = apps.find(a => a.slug === slug);

// For larger datasets, consider:
// 1. Build slug-to-app Map on initialization
const appMap = new Map(apps.map(a => [a.slug, a]));
const result = appMap.get(slug); // O(1) lookup
```

## Migration to Database

If the app grows beyond 1000 apps, consider migrating to a database:

### Recommended Approach
1. **Database**: PostgreSQL or MongoDB
2. **ORM**: Prisma or Mongoose
3. **API**: Next.js API routes
4. **Caching**: Redis for frequently accessed data
5. **Search**: Elasticsearch or Algolia for advanced search

### Migration Steps
```typescript
// 1. Define database schema
// 2. Create migration script
// 3. Import apps.ts data
// 4. Update API endpoints
// 5. Modify components to fetch from API
// 6. Add caching layer
// 7. Test thoroughly
// 8. Deploy with zero downtime
```

## Data Sources

### Current Sources
- Manual curation
- Company websites
- Public databases
- Community contributions

### Verification Process
1. Verify company is Indian
2. Confirm app is actively maintained
3. Validate website accessibility
4. Check pricing information
5. Verify foreign alternatives accuracy

## Extension Points

### Adding New Fields
```typescript
interface App {
  // ... existing fields
  founded?: number;           // Year founded
  employees?: string;         // Employee count range
  funding?: string;           // Funding status
  tags?: string[];            // Additional tags
  features?: string[];        // Key features
  integrations?: string[];    // Supported integrations
  platforms?: string[];       // Supported platforms
  languages?: string[];       // Supported languages
}
```

### Adding Relationships
```typescript
interface App {
  // ... existing fields
  relatedApps?: string[];     // Slugs of related apps
  parentCompany?: string;     // Parent organization
  subsidiaries?: string[];    // Child products
}
```

## Known Issues

1. **Image URLs**: Some external URLs may break over time
2. **Pricing Changes**: Pricing models may change without updates
3. **Company Relocations**: Location data may become outdated
4. **Duplicate Alternatives**: Some foreign apps appear multiple times
5. **Inconsistent Descriptions**: Description quality varies

## Best Practices

1. **Consistency**: Use consistent formatting and terminology
2. **Accuracy**: Verify all information before adding
3. **Completeness**: Fill all required fields
4. **Uniqueness**: Ensure slug uniqueness
5. **Maintenance**: Regular audits to keep data current
6. **Documentation**: Document data sources and verification
7. **Backup**: Keep backups before major changes