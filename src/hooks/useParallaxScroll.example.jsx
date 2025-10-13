import React from 'react';
import useParallaxScroll from './useParallaxScroll';

/**
 * Example usage of useParallaxScroll hook
 * 
 * This hook provides enhanced parallax scrolling with:
 * - Multiple layer support with different speeds
 * - Motion blur for fast scrolling
 * - IntersectionObserver for performance
 * - Respects prefers-reduced-motion
 */

// Example 1: Basic parallax with default settings
export const BasicParallaxExample = () => {
  const { offset, blur, ref } = useParallaxScroll();

  return (
    <div
      ref={ref}
      style={{
        transform: `translateY(${offset}px)`,
        filter: `blur(${blur}px)`,
      }}
      className="bg-gradient-to-b from-cyan-500/20 to-purple-500/20 p-8 rounded-lg"
    >
      <h2>Basic Parallax Element</h2>
      <p>This element moves at 0.5x scroll speed with motion blur</p>
    </div>
  );
};

// Example 2: Multiple layers with different speeds
export const MultiLayerParallaxExample = () => {
  const layer1 = useParallaxScroll({ speed: 0.1 });
  const layer2 = useParallaxScroll({ speed: 0.3 });
  const layer3 = useParallaxScroll({ speed: 0.5 });

  return (
    <div className="relative h-screen">
      {/* Background layer (slowest) */}
      <div
        ref={layer1.ref}
        style={{
          transform: `translateY(${layer1.offset}px)`,
          filter: `blur(${layer1.blur}px)`,
        }}
        className="absolute inset-0 bg-gradient-to-b from-purple-900/30 to-transparent"
      />

      {/* Middle layer */}
      <div
        ref={layer2.ref}
        style={{
          transform: `translateY(${layer2.offset}px)`,
          filter: `blur(${layer2.blur}px)`,
        }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div className="text-6xl opacity-20">⛩️</div>
      </div>

      {/* Foreground layer (fastest) */}
      <div
        ref={layer3.ref}
        style={{
          transform: `translateY(${layer3.offset}px)`,
          filter: `blur(${layer3.blur}px)`,
        }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <h1 className="text-4xl font-bold">Multi-Layer Parallax</h1>
      </div>
    </div>
  );
};

// Example 3: Custom blur settings
export const CustomBlurExample = () => {
  const { offset, blur, ref } = useParallaxScroll({
    speed: 0.4,
    blurThreshold: 5, // Lower threshold = blur activates sooner
    maxBlur: 5, // Higher max blur
  });

  return (
    <div
      ref={ref}
      style={{
        transform: `translateY(${offset}px)`,
        filter: `blur(${blur}px)`,
      }}
      className="p-8 bg-gray-800 rounded-lg"
    >
      <h2>Custom Motion Blur</h2>
      <p>Scroll fast to see enhanced motion blur effect</p>
      <p className="text-sm text-gray-400 mt-2">
        Current blur: {blur.toFixed(2)}px
      </p>
    </div>
  );
};

// Example 4: Parallax with CircuitLines
export const ParallaxCircuitExample = () => {
  const { offset, blur, ref } = useParallaxScroll({ speed: 0.2 });

  return (
    <section className="relative py-20">
      {/* Background circuit lines with parallax */}
      <div
        ref={ref}
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          transform: `translateY(${offset}px)`,
          filter: `blur(${blur}px)`,
        }}
      >
        {/* CircuitLines component would go here */}
        <div className="w-full h-full bg-gradient-to-br from-cyan-500/10 to-purple-500/10" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-4">Content with Parallax Background</h2>
        <p>The circuit lines in the background move at a different speed</p>
      </div>
    </section>
  );
};

// Example 5: Parallax cards grid
export const ParallaxCardsExample = () => {
  const cards = [
    { title: 'Card 1', speed: 0.1 },
    { title: 'Card 2', speed: 0.15 },
    { title: 'Card 3', speed: 0.2 },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8">
      {cards.map((card, index) => {
        const { offset, blur, ref } = useParallaxScroll({ speed: card.speed });
        
        return (
          <div
            key={index}
            ref={ref}
            style={{
              transform: `translateY(${offset}px)`,
              filter: `blur(${blur}px)`,
            }}
            className="p-6 bg-gray-800 rounded-lg border border-cyan-500/30"
          >
            <h3 className="text-xl font-bold mb-2">{card.title}</h3>
            <p className="text-gray-400">Speed: {card.speed}x</p>
          </div>
        );
      })}
    </div>
  );
};

// Full page example combining all features
export const FullParallaxPageExample = () => {
  return (
    <div className="min-h-screen">
      <BasicParallaxExample />
      <div className="h-screen" />
      <MultiLayerParallaxExample />
      <div className="h-screen" />
      <CustomBlurExample />
      <div className="h-screen" />
      <ParallaxCircuitExample />
      <div className="h-screen" />
      <ParallaxCardsExample />
    </div>
  );
};

export default FullParallaxPageExample;
