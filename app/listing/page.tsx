'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { apps } from '../data/apps';
import styles from '../listing.module.css';

export default function ListingPage() {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter by search query on name or description
  const searchFilteredApps = useMemo(() => {
    if (!searchQuery) return apps;
    const query = searchQuery.toLowerCase();
    return apps.filter(
      app => app.name.toLowerCase().includes(query) || app.description.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  return (
    <main className={styles.main}>
      <Link href="/" className={styles.homeButton}>
        🏠 Home
      </Link>
      <div className={styles.header}>
        <h1>Indian Apps</h1>
        <p>Discover Indian software alternatives to popular foreign apps</p>
      </div>

      <div className={styles.searchContainer}>
        <div className={styles.searchBox}>
          <input
            type="text"
            placeholder="Search Indian apps (e.g., Zoho, CleverTap, ERPNext)..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
        </div>
      </div>

      <div className={styles.stats}>
        <span>{searchFilteredApps.length} apps found</span>
      </div>

      {searchFilteredApps.length === 0 ? (
        <div className={styles.emptyState}>
          <p>No apps found. Try a different search.</p>
        </div>
      ) : (
        <div className={styles.appsGrid}>
          {searchFilteredApps.map(app => (
            <Link key={app.slug} href={`/app/${app.slug}`} className={styles.appCard}>
              <div className={styles.appImage}>
                {app.image ? (
                  <img src={app.image} alt={app.name} />
                ) : (
                  <div className={styles.placeholder}>{app.name.charAt(0)}</div>
                )}
              </div>
              <div className={styles.appContent}>
                <h3>{app.name}</h3>
                <p className={styles.category}>{app.category}</p>
                <p className={styles.description}>{app.description}</p>
                <div className={styles.alternativesList}>
                  <strong>Alternatives:</strong>
                  <div className={styles.alternatives}>
                    {app.alternatives.slice(0, 2).map(alt => (
                      <span key={alt} className={styles.alt}>
                        {alt}
                      </span>
                    ))}
                    {app.alternatives.length > 2 && (
                      <span className={styles.altMore}>+{app.alternatives.length - 2}</span>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
