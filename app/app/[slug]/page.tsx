import Link from 'next/link';
import { apps } from '@/app/data/apps';
import styles from '@/app/app-details.module.css';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return apps.map(app => ({
    slug: app.slug,
  }));
}

export default async function AppDetailsPage({ params }: PageProps) {
  const resolvedParams = await params;
  const app = apps.find(a => a.slug === resolvedParams.slug);

  if (!app) {
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

  return (
    <main className={styles.main}>
      <Link href="/listing" className={styles.backLink}>
        ← Back to Listing
      </Link>

      <div className={styles.header}>
        <div className={styles.imageSection}>
          {app.image ? (
            <img src={app.image} alt={app.name} className={styles.appImage} />
          ) : (
            <div className={styles.placeholder}>{app.name.charAt(0)}</div>
          )}
        </div>
        <div className={styles.titleSection}>
          <h1>{app.name}</h1>
          <p className={styles.category}>{app.category}</p>
          <p className={styles.company}>{app.company}</p>
          <a href={app.website} target="_blank" rel="noopener noreferrer" className={styles.websiteLink}>
            Visit Website →
          </a>
        </div>
      </div>

      <div className={styles.content}>
        <section className={styles.section}>
          <h2>Overview</h2>
          <p>{app.description}</p>
          {app.description_long && <p>{app.description_long}</p>}
        </section>

        <section className={styles.section}>
          <h2>Details</h2>
          <div className={styles.detailsGrid}>
            <div className={styles.detailItem}>
              <strong>Pricing Model</strong>
              <p>{app.pricing || 'N/A'}</p>
            </div>
            <div className={styles.detailItem}>
              <strong>Company</strong>
              <p>{app.company}</p>
            </div>
            <div className={styles.detailItem}>
              <strong>Location</strong>
              <p>{app.location}</p>
            </div>
            <div className={styles.detailItem}>
              <strong>Category</strong>
              <p style={{ textTransform: 'capitalize' }}>{app.category}</p>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2>Foreign Alternatives</h2>
          <p>This Indian app serves as an alternative to the following popular foreign applications:</p>
          <div className={styles.alternativesList}>
            {app.alternatives.map(alt => (
              <div key={alt} className={styles.alternativeItem}>
                <span className={styles.alternativeIcon}>🌍</span>
                <span>{alt}</span>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h2>Why Choose {app.name}?</h2>
          <ul className={styles.reasonsList}>
            <li>Made in India - Supporting Indian tech ecosystem</li>
            <li>Local support and understanding of Indian business needs</li>
            <li>Often more affordable than international alternatives</li>
            <li>Compliance with Indian data protection and privacy laws</li>
          </ul>
        </section>
      </div>

      <div className={styles.similarApps}>
        <h2>Similar Indian Apps</h2>
        <div className={styles.similarGrid}>
          {apps
            .filter(a => a.category === app.category && a.slug !== app.slug)
            .slice(0, 3)
            .map(similar => (
              <Link key={similar.slug} href={`/app/${similar.slug}`} className={styles.similarCard}>
                <div className={styles.similarImage}>
                  {similar.image ? (
                    <img src={similar.image} alt={similar.name} />
                  ) : (
                    <div className={styles.similarPlaceholder}>{similar.name.charAt(0)}</div>
                  )}
                </div>
                <h3>{similar.name}</h3>
              </Link>
            ))}
        </div>
      </div>
    </main>
  );
}
