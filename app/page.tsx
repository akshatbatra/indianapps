'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function HomePage() {
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);

  return (
    <main style={{
      padding: '4rem 2rem',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%)',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    }}>
      <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
        <h1 style={{
          fontSize: '3rem',
          fontWeight: 800,
          color: '#0f172a',
          margin: '0 0 1rem 0',
          background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          BharatApps
        </h1>
        <p style={{
          fontSize: '1.25rem',
          color: '#64748b',
          margin: '0 0 3rem 0',
          lineHeight: 1.6
        }}>
          Discover Indian alternatives to popular foreign apps. Support local tech, save costs, and ensure data privacy with Indian-made solutions.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '2rem',
          marginTop: '3rem'
        }}>
          <Link href="/listing" style={{
            background: '#2563eb',
            color: '#fff',
            padding: '2rem',
            borderRadius: '0.75rem',
            textDecoration: 'none',
            fontWeight: 600,
            fontSize: '1.1rem',
            transition: 'all 0.2s ease',
            boxShadow: '0 4px 15px rgba(37, 99, 235, 0.3)',
            cursor: 'pointer',
            transform: hoveredButton === 'browse' ? 'translateY(-4px)' : 'translateY(0)',
            boxShadowValue: hoveredButton === 'browse' ? '0 8px 25px rgba(37, 99, 235, 0.4)' : '0 4px 15px rgba(37, 99, 235, 0.3)',
          } as any}
            onMouseEnter={() => setHoveredButton('browse')}
            onMouseLeave={() => setHoveredButton(null)}
          >
            📱 Browse All Indian Apps
          </Link>

          <Link href="/listing" style={{
            background: '#fff',
            color: '#2563eb',
            padding: '2rem',
            borderRadius: '0.75rem',
            textDecoration: 'none',
            fontWeight: 600,
            fontSize: '1.1rem',
            border: '2px solid #2563eb',
            transition: 'all 0.2s ease',
            cursor: 'pointer',
            backgroundColor: hoveredButton === 'search' ? '#f0f4ff' : '#fff',
            transform: hoveredButton === 'search' ? 'translateY(-4px)' : 'translateY(0)',
          } as any}
            onMouseEnter={() => setHoveredButton('search')}
            onMouseLeave={() => setHoveredButton(null)}
          >
            🔍 Search by Foreign App
          </Link>
        </div>

        <div style={{
          marginTop: '4rem',
          padding: '2rem',
          background: '#fff',
          borderRadius: '0.75rem',
          border: '1px solid #e2e8f0'
        }}>
          <h2 style={{ fontSize: '1.5rem', color: '#0f172a', marginBottom: '1rem' }}>Why BharatApps?</h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '1.5rem',
            textAlign: 'left'
          }}>
            <div>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🇮🇳</div>
              <strong style={{ color: '#0f172a' }}>Made in India</strong>
              <p style={{ color: '#64748b', fontSize: '0.9rem', margin: '0.5rem 0 0 0' }}>Support the Indian tech ecosystem</p>
            </div>
            <div>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>💰</div>
              <strong style={{ color: '#0f172a' }}>Cost Effective</strong>
              <p style={{ color: '#64748b', fontSize: '0.9rem', margin: '0.5rem 0 0 0' }}>More affordable than international alternatives</p>
            </div>
            <div>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🔒</div>
              <strong style={{ color: '#0f172a' }}>Data Privacy</strong>
              <p style={{ color: '#64748b', fontSize: '0.9rem', margin: '0.5rem 0 0 0' }}>Compliant with Indian privacy laws</p>
            </div>
            <div>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🎯</div>
              <strong style={{ color: '#0f172a' }}>Local Support</strong>
              <p style={{ color: '#64748b', fontSize: '0.9rem', margin: '0.5rem 0 0 0' }}>Support teams understand local needs</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
