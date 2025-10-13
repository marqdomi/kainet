/**
 * Enhanced UI Components - Usage Examples
 * 
 * This file demonstrates the new features added to Button, Badge, and Card components
 * as part of the Japanese Cyberpunk enhancements.
 */

import React, { useState } from 'react';
import Button from './Button';
import Badge from './Badge';
import Card from './Card';

const EnhancedComponentsExample = () => {
  const [loading, setLoading] = useState(false);

  const handleLoadingDemo = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 3000);
  };

  return (
    <div className="p-8 space-y-12 bg-black min-h-screen">
      <section>
        <h2 className="text-2xl font-bold text-cyan-400 mb-6">Enhanced Button Component</h2>
        <div className="space-y-4">
          <div className="space-x-4">
            <Button variant="primary" onClick={() => console.log('Primary clicked')}>
              Primary Button (with ripple)
            </Button>
            <Button variant="secondary" onClick={() => console.log('Secondary clicked')}>
              Secondary Button (with hologram flicker)
            </Button>
            <Button variant="ghost" onClick={() => console.log('Ghost clicked')}>
              Ghost Button
            </Button>
          </div>
          
          <div className="space-x-4">
            <Button variant="primary" size="sm">
              Small Button
            </Button>
            <Button variant="primary" size="md">
              Medium Button
            </Button>
            <Button variant="primary" size="lg">
              Large Button
            </Button>
          </div>
          
          <div className="space-x-4">
            <Button variant="primary" loading={loading} onClick={handleLoadingDemo}>
              {loading ? 'Loading...' : 'Click to Load (Torii Spinner)'}
            </Button>
            <Button variant="secondary" disabled>
              Disabled Button
            </Button>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-cyan-400 mb-6">Enhanced Badge Component</h2>
        <div className="space-y-4">
          <div className="flex flex-wrap gap-3">
            <Badge variant="default">Default Badge</Badge>
            <Badge variant="default" kanji="AI">AI Badge</Badge>
            <Badge variant="default" kanji="Web">Web Badge</Badge>
            <Badge variant="default" kanji="Automation">Automation Badge</Badge>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <Badge variant="purple" kanji="Innovation">Innovation</Badge>
            <Badge variant="success" kanji="Development">Development</Badge>
            <Badge variant="warning" kanji="Cloud">Cloud</Badge>
            <Badge variant="error" kanji="Code">Code</Badge>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <Badge variant="default" featured>Featured Badge (with glow)</Badge>
            <Badge variant="purple" featured kanji="AI">Featured AI Badge</Badge>
            <Badge variant="default" size="sm" kanji="AI">Small</Badge>
            <Badge variant="default" size="md" kanji="Web">Medium</Badge>
            <Badge variant="default" size="lg" kanji="Cloud">Large</Badge>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-cyan-400 mb-6">Enhanced Card Component</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card variant="default" hover>
            <h3 className="text-xl font-bold text-white mb-2">Default Card</h3>
            <p className="text-gray-400">Standard card with hover effect</p>
          </Card>
          
          <Card variant="glass">
            <h3 className="text-xl font-bold text-white mb-2">Glass Card</h3>
            <p className="text-gray-400">Glass morphism effect</p>
          </Card>
          
          <Card variant="featured" hover>
            <h3 className="text-xl font-bold text-white mb-2">Featured Card</h3>
            <p className="text-gray-400">Highlighted with cyan border</p>
          </Card>
          
          <Card variant="holographic">
            <h3 className="text-xl font-bold text-white mb-2">Holographic Card</h3>
            <p className="text-gray-400 mb-4">
              Interactive holographic effect that follows your cursor. 
              Click to see ripple effect!
            </p>
            <div className="flex gap-2">
              <Badge variant="default" kanji="AI">AI</Badge>
              <Badge variant="purple" featured>Featured</Badge>
            </div>
          </Card>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-cyan-400 mb-6">Combined Example</h2>
        <Card variant="holographic">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold text-white">Project: KAINET v2.0</h3>
              <Badge variant="default" featured kanji="Innovation">Innovation</Badge>
            </div>
            
            <p className="text-gray-400">
              A cutting-edge web platform combining Japanese aesthetics with cyberpunk technology.
              Experience the future of web design with interactive holographic effects.
            </p>
            
            <div className="flex flex-wrap gap-2">
              <Badge variant="default" kanji="AI">AI</Badge>
              <Badge variant="purple" kanji="Web">Web Development</Badge>
              <Badge variant="success" kanji="Automation">Automation</Badge>
              <Badge variant="default" kanji="Cloud">Cloud</Badge>
            </div>
            
            <div className="flex gap-3 pt-4">
              <Button variant="primary" size="md">
                View Project
              </Button>
              <Button variant="secondary" size="md">
                Learn More
              </Button>
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
};

export default EnhancedComponentsExample;
