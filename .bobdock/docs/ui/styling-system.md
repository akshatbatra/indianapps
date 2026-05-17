# Styling System

## Purpose & Responsibility
Defines the visual design system and styling approach for the BharatApps platform, ensuring consistent user experience across all pages and components.

## Technical Architecture

### Styling Approach
- **CSS Modules**: Component-scoped styles preventing global conflicts
- **Inline Styles**: Dynamic styling for interactive elements
- **Global Styles**: Base typography and reset in `globals.css`
- **No CSS Framework**: Custom styles for full control and minimal bundle size

### Design System

#### Color Palette
```css
/* Primary Colors (Indian Flag Theme) */
--saffron: #ff8c00
--white: #ffffff
--green: #008000

/* UI Colors */
--primary-blue: #2563eb
--text-dark: #0f172a
--text-medium: #334155
--text-light: #64748b
--text-lighter: #94a3b8
--border: #e2e8f0
--background-light: #f8fafc
--background-lighter: #f1f5f9
```

#### Typography
- **Font Family**: Geist Sans (primary), Geist Mono (code)
- **Font Sizes**: Responsive scaling from 0.85rem to 1.5rem
- **Font Weights**: 400 (normal), 600 (semibold), 700 (bold)

#### Spacing System
- Base unit: 0.25rem (4px)
- Common values: 0.5rem, 0.75rem, 1rem, 1.5rem, 2rem, 3rem, 4rem

#### Border Radius
- Small: 0.35rem (cards, images)
- Medium: 0.5rem (inputs, buttons)
- Large: 0.75rem (sections)
- Extra Large: 1rem (hero sections)

## CSS Modules Structure

### page.module.css (Home Page)
```css
/* Main container with gradient background */
.main {
  padding: 4rem 2rem;
  min-height: 100vh;
  background: linear-gradient(135deg, #ff8c00 0%, #ffffff 50%, #008000 100%);
}

/* Search input with focus states */
.searchInput {
  width: 100%;
  padding: 1rem;
  border: 2px solid #e2e8f0;
  transition: all 0.2s ease;
}

.searchInput:focus {
  border-color: #2563eb;
  outline: none;
}
```

### listing.module.css (Browse Page)
```css
/* Grid layout for app cards */
.appsGrid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

/* App card with hover effects */
.appCard {
  background: white;
  border-radius: 0.75rem;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.appCard:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}
```

### app-details.module.css (Detail Page)
```css
/* Two-column layout for app details */
.detailsGrid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}

/* Similar apps horizontal scroll */
.similarGrid {
  display: flex;
  gap: 1rem;
  overflow-x: auto;
}
```

## Responsive Design

### Breakpoints
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

### Mobile-First Approach
```css
/* Base styles for mobile */
.container {
  padding: 1rem;
}

/* Tablet and up */
@media (min-width: 640px) {
  .container {
    padding: 2rem;
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .container {
    padding: 4rem;
  }
}
```

## Interactive States

### Hover Effects
```javascript
// Inline hover handlers for dynamic styling
onMouseEnter={(e) => {
  e.currentTarget.style.transform = 'translateY(-4px)';
  e.currentTarget.style.boxShadow = '0 8px 25px rgba(37, 99, 235, 0.4)';
}}
onMouseLeave={(e) => {
  e.currentTarget.style.transform = 'translateY(0)';
  e.currentTarget.style.boxShadow = '0 4px 15px rgba(37, 99, 235, 0.3)';
}}
```

### Focus States
- Visible focus rings for accessibility
- Color change on input focus
- Keyboard navigation support

## Animation Patterns

### Transitions
```css
transition: all 0.2s ease; /* Standard transition */
transition: transform 0.2s ease, box-shadow 0.2s ease; /* Multiple properties */
```

### Transform Effects
- `translateY(-4px)`: Lift on hover
- `scale(1.05)`: Subtle zoom

## Accessibility Considerations

### Color Contrast
- Text on white: Minimum 4.5:1 ratio
- Interactive elements: Clear visual feedback
- Focus indicators: Always visible

### Font Sizing
- Minimum 0.85rem (13.6px) for body text
- Scalable with user preferences
- Relative units (rem) for accessibility

## Extension Points

### Adding New Styles
1. Create new CSS module: `component-name.module.css`
2. Import in component: `import styles from './component-name.module.css'`
3. Apply classes: `className={styles.className}`

### Modifying Theme
1. Update color variables in globals.css
2. Adjust spacing scale if needed
3. Test across all pages for consistency

### Dark Mode (Future)
```css
@media (prefers-color-scheme: dark) {
  :root {
    --background: #0f172a;
    --text: #f1f5f9;
  }
}
```

## Performance Optimization

### CSS Modules Benefits
- Automatic code splitting
- Dead code elimination
- Scoped styles prevent conflicts
- Smaller bundle sizes

### Best Practices
- Avoid deep nesting (max 3 levels)
- Use shorthand properties
- Minimize use of `!important`
- Leverage CSS custom properties for theming

## Common Patterns

### Card Component
```css
.card {
  background: white;
  border-radius: 0.75rem;
  padding: 1.5rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s ease;
}
```

### Button Styles
```css
.button {
  padding: 1rem 2rem;
  border-radius: 0.75rem;
  background: #2563eb;
  color: white;
  font-weight: 600;
  transition: all 0.2s ease;
  cursor: pointer;
}
```

### Input Fields
```css
.input {
  width: 100%;
  padding: 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 0.5rem;
  font-size: 1rem;
  transition: border-color 0.2s ease;
}
```

## Testing Considerations
- Visual regression testing for style changes
- Cross-browser compatibility (Chrome, Firefox, Safari, Edge)
- Mobile device testing (iOS, Android)
- Accessibility audits (WCAG 2.1 AA compliance)