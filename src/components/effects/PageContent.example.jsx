/**
 * PageContent Usage Examples
 * 
 * This file demonstrates how to use the PageContent component
 * to add staggered reveal animations to page sections.
 */

import React from 'react';
import PageContent from './PageContent';

// Example 1: Basic usage with sections
export const BasicExample = () => {
  return (
    <PageContent>
      <section className="hero">
        <h1>Welcome to KAINET</h1>
        <p>This section will fade in first</p>
      </section>
      
      <section className="features">
        <h2>Features</h2>
        <p>This section will fade in second</p>
      </section>
      
      <section className="cta">
        <h2>Get Started</h2>
        <p>This section will fade in third</p>
      </section>
    </PageContent>
  );
};

// Example 2: Custom stagger delay
export const CustomDelayExample = () => {
  return (
    <PageContent staggerDelay={0.2}>
      <div className="card">Card 1 - slower stagger</div>
      <div className="card">Card 2</div>
      <div className="card">Card 3</div>
    </PageContent>
  );
};

// Example 3: Nested content (only direct children animate)
export const NestedExample = () => {
  return (
    <PageContent>
      <section>
        <h1>Section 1</h1>
        <p>This entire section animates as one unit</p>
        <div>
          <span>Nested content moves together</span>
        </div>
      </section>
      
      <section>
        <h2>Section 2</h2>
        <p>This section animates separately</p>
      </section>
    </PageContent>
  );
};

// Example 4: Integration with existing page
export const PageIntegrationExample = () => {
  return (
    <div className="page-container">
      {/* Hero section without animation */}
      <section className="hero-full-screen">
        <h1>Immediate Hero</h1>
      </section>
      
      {/* Animated content sections */}
      <PageContent>
        <section className="about">
          <h2>About Us</h2>
          <p>Content with reveal animation</p>
        </section>
        
        <section className="services">
          <h2>Services</h2>
          <p>More animated content</p>
        </section>
      </PageContent>
    </div>
  );
};

// Example 5: With custom className
export const StyledExample = () => {
  return (
    <PageContent className="max-w-7xl mx-auto px-4">
      <section>Section 1</section>
      <section>Section 2</section>
      <section>Section 3</section>
    </PageContent>
  );
};
