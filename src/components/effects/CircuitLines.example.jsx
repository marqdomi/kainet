import CircuitLines from './CircuitLines';

/**
 * Example usage of CircuitLines component
 */
const CircuitLinesExample = () => {
  return (
    <div style={{ padding: '2rem' }}>
      <h2>CircuitLines Examples</h2>
      
      {/* Grid Pattern */}
      <div style={{ position: 'relative', height: '300px', marginBottom: '2rem', background: '#0A0A0A' }}>
        <h3 style={{ position: 'relative', zIndex: 1, color: 'white' }}>Grid Pattern</h3>
        <CircuitLines pattern="grid" density="medium" animated />
      </div>

      {/* Organic Pattern */}
      <div style={{ position: 'relative', height: '300px', marginBottom: '2rem', background: '#0A0A0A' }}>
        <h3 style={{ position: 'relative', zIndex: 1, color: 'white' }}>Organic Pattern</h3>
        <CircuitLines pattern="organic" density="medium" animated />
      </div>

      {/* Torii Pattern */}
      <div style={{ position: 'relative', height: '300px', marginBottom: '2rem', background: '#0A0A0A' }}>
        <h3 style={{ position: 'relative', zIndex: 1, color: 'white' }}>Torii Pattern</h3>
        <CircuitLines pattern="torii" density="high" animated />
      </div>

      {/* Static (no animation) */}
      <div style={{ position: 'relative', height: '300px', marginBottom: '2rem', background: '#0A0A0A' }}>
        <h3 style={{ position: 'relative', zIndex: 1, color: 'white' }}>Static Grid</h3>
        <CircuitLines pattern="grid" density="low" animated={false} />
      </div>

      {/* Custom Color */}
      <div style={{ position: 'relative', height: '300px', marginBottom: '2rem', background: '#0A0A0A' }}>
        <h3 style={{ position: 'relative', zIndex: 1, color: 'white' }}>Custom Color (Purple)</h3>
        <CircuitLines pattern="torii" density="medium" animated color="#A855F7" />
      </div>
    </div>
  );
};

export default CircuitLinesExample;
