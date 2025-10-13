import React from 'react';
import SectionTitle from './SectionTitle';
import DigitalCounter from './DigitalCounter';

/**
 * Typography Enhancements Examples
 * 
 * This file demonstrates the usage of enhanced typography components
 * that reinforce the Japanese-cyberpunk aesthetic.
 */

const TypographyEnhancementsExample = () => {
  return (
    <div className="space-y-16 p-8">
      {/* Section Titles with Kanji */}
      <section>
        <h1 className="text-3xl font-bold mb-8 text-cyan-neon">
          Section Titles with Kanji Prefixes
        </h1>
        
        <div className="space-y-6">
          {/* Auto-detect kanji from title */}
          <SectionTitle>Our Services</SectionTitle>
          <SectionTitle>AI Projects</SectionTitle>
          <SectionTitle>Web Development</SectionTitle>
          <SectionTitle>Automation Solutions</SectionTitle>
          <SectionTitle>About Us</SectionTitle>
          <SectionTitle>Contact</SectionTitle>
          
          {/* Explicit kanji */}
          <SectionTitle kanji="innovation">Innovation Hub</SectionTitle>
          <SectionTitle kanji="future">Future Vision</SectionTitle>
          <SectionTitle kanji="data">Data Analytics</SectionTitle>
          
          {/* Without kanji */}
          <SectionTitle showKanji={false}>Plain Title</SectionTitle>
          
          {/* Different heading levels */}
          <SectionTitle as="h1">Main Heading (H1)</SectionTitle>
          <SectionTitle as="h3">Sub Heading (H3)</SectionTitle>
        </div>
      </section>

      {/* Japanese-style Quotation Marks */}
      <section>
        <h1 className="text-3xl font-bold mb-8 text-cyan-neon">
          Japanese-style Quotation Marks
        </h1>
        
        <blockquote>
          <p>
            Technology is best when it brings people together and creates
            meaningful connections in the digital age.
          </p>
        </blockquote>
        
        <blockquote>
          <p>
            Innovation distinguishes between a leader and a follower.
            We choose to lead with cutting-edge AI solutions.
          </p>
        </blockquote>
      </section>

      {/* Digital Counters */}
      <section>
        <h1 className="text-3xl font-bold mb-8 text-cyan-neon">
          Digital Counter Effect
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Simple counters */}
          <div className="bg-gray-800 p-6 rounded-lg text-center">
            <DigitalCounter value={1000} suffix="+" className="text-4xl" />
            <p className="text-gray-300 mt-2">Projects Completed</p>
          </div>
          
          <div className="bg-gray-800 p-6 rounded-lg text-center">
            <DigitalCounter value={99} suffix="%" className="text-4xl" />
            <p className="text-gray-300 mt-2">Client Satisfaction</p>
          </div>
          
          <div className="bg-gray-800 p-6 rounded-lg text-center">
            <DigitalCounter value={50} suffix="+" className="text-4xl" />
            <p className="text-gray-300 mt-2">Team Members</p>
          </div>
          
          {/* With decimals */}
          <div className="bg-gray-800 p-6 rounded-lg text-center">
            <DigitalCounter 
              value={4.9} 
              decimals={1} 
              suffix="/5.0" 
              className="text-4xl" 
            />
            <p className="text-gray-300 mt-2">Average Rating</p>
          </div>
          
          {/* With pulse effect */}
          <div className="bg-gray-800 p-6 rounded-lg text-center">
            <DigitalCounter 
              value={24} 
              suffix="/7" 
              pulse 
              className="text-4xl" 
            />
            <p className="text-gray-300 mt-2">Support Available</p>
          </div>
          
          {/* With prefix */}
          <div className="bg-gray-800 p-6 rounded-lg text-center">
            <DigitalCounter 
              value={2500} 
              prefix="$" 
              suffix="K" 
              className="text-4xl" 
            />
            <p className="text-gray-300 mt-2">Revenue Growth</p>
          </div>
        </div>
      </section>

      {/* Text Selection Demo */}
      <section>
        <h1 className="text-3xl font-bold mb-8 text-cyan-neon">
          Custom Text Selection
        </h1>
        
        <div className="bg-gray-800 p-6 rounded-lg">
          <p className="text-gray-300 mb-4">
            Try selecting this text to see the custom cyan selection color
            that matches the KAINET brand aesthetic. The selection background
            uses a semi-transparent cyan with white text for optimal readability.
          </p>
          
          <pre className="bg-gray-900 p-4 rounded text-cyan-neon">
            <code>
{`// Code selection also has enhanced styling
const greeting = "Hello, KAINET!";
console.log(greeting);`}
            </code>
          </pre>
        </div>
      </section>

      {/* Combined Example */}
      <section>
        <SectionTitle kanji="tech">Complete Example</SectionTitle>
        
        <div className="mt-8 space-y-6">
          <p className="text-gray-300">
            This section demonstrates all typography enhancements working together
            to create a cohesive Japanese-cyberpunk aesthetic.
          </p>
          
          <blockquote>
            <p>
              The future of technology lies in the seamless integration of
              artificial intelligence with human creativity and innovation.
            </p>
          </blockquote>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <DigitalCounter value={150} suffix="+" className="text-3xl" />
              <p className="text-sm text-gray-400 mt-1">Clients</p>
            </div>
            <div className="text-center">
              <DigitalCounter value={500} suffix="+" className="text-3xl" />
              <p className="text-sm text-gray-400 mt-1">Projects</p>
            </div>
            <div className="text-center">
              <DigitalCounter value={98} suffix="%" className="text-3xl" />
              <p className="text-sm text-gray-400 mt-1">Success Rate</p>
            </div>
            <div className="text-center">
              <DigitalCounter value={10} suffix="+" className="text-3xl" />
              <p className="text-sm text-gray-400 mt-1">Years</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TypographyEnhancementsExample;
