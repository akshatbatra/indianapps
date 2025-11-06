'use client';

import Link from 'next/link';
import { useState, useMemo } from 'react';
import { apps } from './data/apps';

// Build foreign app to Indian alternatives map
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

const uniqueForeignApps = Array.from(
  new Set(apps.flatMap(app => app.alternatives.map(alt => alt.toLowerCase())))
).sort();

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');

  const suggestions = useMemo(() => {
    if (!searchQuery) return [];
    const query = searchQuery.toLowerCase();
    return uniqueForeignApps
      .filter(app => app.includes(query))
      .slice(0, 8);
  }, [searchQuery]);

  const showSuggestions = searchQuery.length > 0 && suggestions.length > 0;

  return (
    <main style={{
      padding: '4rem 2rem',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #ff8c00 0%, #ffffff 50%, #008000 100%)',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <img 
            src="/bharatapps.png" 
            alt="BharatApps" 
            style={{
              maxWidth: '300px',
              height: 'auto',
              marginBottom: '1rem'
            }}
          />
          <p style={{
            fontSize: '1.25rem',
            color: '#64748b',
            margin: '0',
            lineHeight: 1.6
          }}>
            Discover Indian alternatives to popular foreign apps.
          </p>
        </div>

        {/* Search by Foreign App */}
        <div style={{
          background: '#fff',
          borderRadius: '1rem',
          padding: '2rem',
          marginBottom: '3rem',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.08)',
          textAlign: 'center'
        }}>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#0f172a', marginBottom: '1rem' }}>
            🔍 Find Indian Alternative
          </h2>
          <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>
            Type a foreign app name to see Indian alternatives
          </p>
          <div style={{ position: 'relative' }}>
            <input
              type="text"
              placeholder="e.g., Salesforce, Slack, Figma, HubSpot..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '1rem',
                fontSize: '1rem',
                border: '2px solid #e2e8f0',
                borderRadius: '0.5rem',
                transition: 'all 0.2s ease',
                fontFamily: 'inherit',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => e.currentTarget.style.borderColor = '#2563eb'}
              onBlur={(e) => e.currentTarget.style.borderColor = '#e2e8f0'}
            />
            {showSuggestions && (
              <div style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                right: 0,
                background: '#fff',
                border: '1px solid #e2e8f0',
                borderTop: 'none',
                borderRadius: '0 0 0.5rem 0.5rem',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                zIndex: 10,
                maxHeight: 300,
                overflowY: 'auto',
                marginTop: -2
              }}>
                {suggestions.map(suggestion => {
                  const indianAppsArray = foreignAppToIndianAlternatives[suggestion] || [];
                  // Deduplicate apps by slug
                  const uniqueApps = Array.from(
                    new Map(indianAppsArray.map(app => [app.slug, app])).values()
                  );
                  const displayName = suggestion.charAt(0).toUpperCase() + suggestion.slice(1);
                  return (
                    <div key={suggestion}>
                      <div style={{
                        padding: '0.75rem 1rem',
                        borderBottom: '1px solid #f1f5f9',
                        fontWeight: 600,
                        color: '#334155',
                        fontSize: '0.9rem',
                        background: '#f8fafc'
                      }}>
                        {displayName} ({uniqueApps.length})
                      </div>
                      {uniqueApps.map(app => (
                        <Link
                          key={app.slug}
                          href={`/app/${app.slug}?from=home`}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            padding: '0.6rem 1rem',
                            cursor: 'pointer',
                            transition: 'background 0.15s ease',
                            textDecoration: 'none',
                            color: '#2563eb',
                            fontSize: '0.95rem'
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.background = '#f0f4ff'}
                          onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                        >
                          {app.image && (
                            <img
                              src={app.image}
                              alt={app.name}
                              style={{
                                width: '32px',
                                height: '32px',
                                borderRadius: '0.35rem',
                                objectFit: 'cover',
                                flexShrink: 0
                              }}
                              onError={(e) => {
                                e.currentTarget.style.display = 'none';
                              }}
                            />
                          )}
                          <span style={{ flex: 1 }}>{app.name}</span>
                        </Link>
                      ))}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Browse All Button */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <Link href="/listing" style={{
            display: 'inline-block',
            background: '#2563eb',
            color: '#fff',
            padding: '1rem 2rem',
            borderRadius: '0.75rem',
            textDecoration: 'none',
            fontWeight: 600,
            fontSize: '1.1rem',
            transition: 'all 0.2s ease',
            boxShadow: '0 4px 15px rgba(37, 99, 235, 0.3)',
            cursor: 'pointer'
          }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(37, 99, 235, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 15px rgba(37, 99, 235, 0.3)';
            }}
          >
            📱 Browse All Indian Apps
          </Link>
        </div>

        {/* Benefits Section */}
        <div style={{
          background: '#fff',
          borderRadius: '0.75rem',
          border: '1px solid #e2e8f0',
          padding: '2rem'
        }}>
          <h2 style={{ fontSize: '1.5rem', color: '#0f172a', marginBottom: '1rem' }}>Why BharatApps?</h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '1.5rem'
          }}>
            <div>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🇮🇳</div>
              <strong style={{ color: '#0f172a' }}>Made in India</strong>
              <p style={{ color: '#64748b', fontSize: '0.9rem', margin: '0.5rem 0 0 0' }}>Support the Indian tech ecosystem</p>
            </div>
            <div>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>💰</div>
              <strong style={{ color: '#0f172a' }}>Cost Effective</strong>
              <p style={{ color: '#64748b', fontSize: '0.9rem', margin: '0.5rem 0 0 0' }}>More affordable alternatives</p>
            </div>
            <div>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🔒</div>
              <strong style={{ color: '#0f172a' }}>Data Privacy</strong>
              <p style={{ color: '#64748b', fontSize: '0.9rem', margin: '0.5rem 0 0 0' }}>Compliant with Indian privacy laws</p>
            </div>
            <div>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🎯</div>
              <strong style={{ color: '#0f172a' }}>Local Support</strong>
              <p style={{ color: '#64748b', fontSize: '0.9rem', margin: '0.5rem 0 0 0' }}>Teams understand local needs</p>
            </div>
          </div>
        </div>

        {/* Footer Section */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.7)',
          borderRadius: '0.75rem',
          border: '1px solid #e2e8f0',
          padding: '2.5rem',
          marginTop: '3rem',
          textAlign: 'center'
        }}>
          <p style={{ color: '#0f172a', fontSize: '1rem', margin: '0 0 1rem 0', fontWeight: 600 }}>
            🇮🇳 This initiative supports <strong>Aatmanirbhar Bharat</strong> and <strong>Swadeshi</strong> ideologies
          </p>
          <p style={{ color: '#64748b', fontSize: '0.95rem', margin: 0, lineHeight: 1.6 }}>
            Made with ❤️ for <strong>Viksit Bharat Buildathon 2025</strong>
          </p>
          <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: '1rem 0 0 0' }}>
            Empowering India's tech ecosystem, one app at a time
          </p>
        </div>
      </div>
    </main>
  );
}
