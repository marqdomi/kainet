import React from 'react';
import HolographicCard from './HolographicCard';

/**
 * HolographicCard Examples
 * 
 * Demonstrates various configurations of the HolographicCard component
 */

const HolographicCardExample = () => {
  return (
    <div style={{ padding: '2rem', display: 'grid', gap: '2rem', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
      
      {/* Example 1: Default holographic card */}
      <HolographicCard variant="default">
        <h3 style={{ marginBottom: '0.5rem', color: 'var(--cyan-neon)' }}>Default Card</h3>
        <p style={{ color: 'var(--text-secondary)' }}>
          Hover over this card to see the holographic shimmer effect that follows your cursor.
        </p>
      </HolographicCard>

      {/* Example 2: Featured card with all effects */}
      <HolographicCard variant="featured" holographic scanningLine rippleOnClick>
        <h3 style={{ marginBottom: '0.5rem', color: 'var(--cyan-neon)' }}>Featured Card</h3>
        <p style={{ color: 'var(--text-secondary)' }}>
          This card has holographic shimmer, scanning line, and ripple effect on click.
        </p>
      </HolographicCard>

      {/* Example 3: Glass card with holographic effect */}
      <HolographicCard variant="glass" holographic>
        <h3 style={{ marginBottom: '0.5rem', color: 'var(--cyan-neon)' }}>Glass Card</h3>
        <p style={{ color: 'var(--text-secondary)' }}>
          Glass morphism with holographic overlay. Click to see the ripple effect.
        </p>
      </HolographicCard>

      {/* Example 4: Card with scanning line only */}
      <HolographicCard variant="default" holographic={false} scanningLine>
        <h3 style={{ marginBottom: '0.5rem', color: 'var(--cyan-neon)' }}>Scanning Only</h3>
        <p style={{ color: 'var(--text-secondary)' }}>
          This card only has the scanning line effect, no holographic shimmer.
        </p>
      </HolographicCard>

      {/* Example 5: Project card example */}
      <HolographicCard variant="featured" holographic scanningLine rippleOnClick>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
            <h3 style={{ color: 'var(--cyan-neon)', margin: 0 }}>AI Project</h3>
            <span style={{ 
              padding: '0.25rem 0.5rem', 
              background: 'rgba(0, 229, 255, 0.2)', 
              borderRadius: '0.25rem',
              fontSize: '0.75rem',
              color: 'var(--cyan-neon)'
            }}>
              AI
            </span>
          </div>
          <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
            Machine learning platform for automated data analysis and prediction.
          </p>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>Python</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>TensorFlow</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>Docker</span>
          </div>
        </div>
      </HolographicCard>

      {/* Example 6: Blog post card example */}
      <HolographicCard variant="default" holographic rippleOnClick>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>
            January 15, 2025
          </span>
          <h3 style={{ color: 'var(--text-primary)', margin: 0 }}>
            The Future of Web Development
          </h3>
          <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '0.875rem' }}>
            Exploring emerging technologies and trends that will shape the next generation of web applications.
          </p>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <span style={{ 
              padding: '0.25rem 0.5rem', 
              background: 'rgba(168, 85, 247, 0.2)', 
              borderRadius: '0.25rem',
              fontSize: '0.75rem',
              color: 'var(--purple-accent)'
            }}>
              Web Development
            </span>
            <span style={{ 
              padding: '0.25rem 0.5rem', 
              background: 'rgba(168, 85, 247, 0.2)', 
              borderRadius: '0.25rem',
              fontSize: '0.75rem',
              color: 'var(--purple-accent)'
            }}>
              Technology
            </span>
          </div>
        </div>
      </HolographicCard>

    </div>
  );
};

export default HolographicCardExample;
