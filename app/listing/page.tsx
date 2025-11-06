'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { apps } from '../data/apps';
import styles from '../listing.module.css';

// Map foreign apps to their Indian alternatives
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

export default function ListingPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedForeignApp, setSelectedForeignApp] = useState<string | null>(null);

  // Get unique foreign apps from alternatives
  const uniqueForeignApps = useMemo(() => {
    const allAlternatives = new Set<string>();
    apps.forEach(app => {
      app.alternatives.forEach(alt => allAlternatives.add(alt.toLowerCase()));
    });
    return Array.from(allAlternatives).sort();
  }, []);

  // Filter apps based on search query
  const filteredApps = useMemo(() => {
    if (!selectedForeignApp) return apps;
    const alternatives = foreignAppToIndianAlternatives[selectedForeignApp.toLowerCase()] || [];
    return alternatives;
  }, [selectedForeignApp]);

  // Filter by search query on name or description
  const searchFilteredApps = useMemo(() => {
    if (!searchQuery) return filteredApps;
    const query = searchQuery.toLowerCase();
    return filteredApps.filter(
      app => app.name.toLowerCase().includes(query) || app.description.toLowerCase().includes(query)
    );
  }, [searchQuery, filteredApps]);

  // Get suggestions for dropdown
  const suggestions = useMemo(() => {
    if (!searchQuery) return [];
    const query = searchQuery.toLowerCase();
    return uniqueForeignApps.filter(app => app.includes(query)).slice(0, 10);
  }, [searchQuery, uniqueForeignApps]);

  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <h1>Indian Apps & Their Alternatives</h1>
        <p>Discover Indian software alternatives to popular foreign apps</p>
      </div>

      <div className={styles.searchContainer}>
        <div className={styles.searchBox}>
          <input
            type="text"
            placeholder="Search for a foreign app (e.g., Salesforce, Slack)..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
          {suggestions.length > 0 && (
            <div className={styles.dropdown}>
              {suggestions.map(suggestion => (
                <div
                  key={suggestion}
                  className={styles.dropdownItem}
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedForeignApp(suggestion);
                  }}
                >
                  {suggestion}
                </div>
              ))}
            </div>
          )}
        </div>
        {selectedForeignApp && (
          <div className={styles.filterTag}>
            Showing alternatives for <strong>{selectedForeignApp}</strong>
            <button
              onClick={() => setSelectedForeignApp(null)}
              className={styles.clearButton}
            >
              ✕
            </button>
          </div>
        )}
      </div>

      <div className={styles.stats}>
        <span>{searchFilteredApps.length} apps found</span>
      </div>

      {searchFilteredApps.length === 0 ? (
        <div className={styles.emptyState}>
          <p>No apps found. Try a different search or browse all apps.</p>
          {selectedForeignApp && (
            <button onClick={() => setSelectedForeignApp(null)} className={styles.resetButton}>
              View All Apps
            </button>
          )}
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
