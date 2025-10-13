import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

/**
 * MatrixRain - Canvas-based Matrix rain effect with Japanese characters
 * Triggered by Konami code easter egg
 * 
 * @component
 * @example
 * <MatrixRain active={true} onDismiss={() => setActive(false)} />
 * 
 * @accessibility
 * - Auto-dismisses after 10 seconds
 * - Can be dismissed early with Escape key
 * - Does not interfere with page content
 */
const MatrixRain = ({ active = false, onDismiss, duration = 10000 }) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const columnsRef = useRef([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (active) {
      setIsVisible(true);
    }
  }, [active]);

  useEffect(() => {
    if (!isVisible) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    
    // Set canvas size to full viewport
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // Initialize columns
      const fontSize = 16;
      const columns = Math.floor(canvas.width / fontSize);
      columnsRef.current = Array(columns).fill(0);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Japanese characters + numbers + tech symbols
    const characters = 'ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const fontSize = 16;

    const draw = () => {
      // Semi-transparent black to create trail effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Cyan text color
      ctx.fillStyle = '#00E5FF';
      ctx.font = `${fontSize}px monospace`;

      columnsRef.current.forEach((y, index) => {
        const text = characters.charAt(Math.floor(Math.random() * characters.length));
        const x = index * fontSize;

        ctx.fillText(text, x, y * fontSize);

        // Randomly reset column to top
        if (y * fontSize > canvas.height && Math.random() > 0.975) {
          columnsRef.current[index] = 0;
        }

        columnsRef.current[index]++;
      });

      animationRef.current = requestAnimationFrame(draw);
    };

    draw();

    // Auto-dismiss after duration
    const dismissTimer = setTimeout(() => {
      handleDismiss();
    }, duration);

    // Escape key to dismiss
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleDismiss();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('keydown', handleKeyDown);
      clearTimeout(dismissTimer);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isVisible, duration]);

  const handleDismiss = () => {
    setIsVisible(false);
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    if (onDismiss) {
      onDismiss();
    }
  };

  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] pointer-events-none"
      role="presentation"
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ background: 'transparent' }}
      />
      <div className="absolute top-4 right-4 text-cyan-400 text-sm font-mono pointer-events-auto">
        <button
          onClick={handleDismiss}
          className="bg-black/50 px-3 py-1 rounded hover:bg-black/70 transition-colors"
          aria-label="Dismiss Matrix Rain effect"
        >
          Press ESC to exit
        </button>
      </div>
    </div>
  );
};

MatrixRain.propTypes = {
  active: PropTypes.bool,
  onDismiss: PropTypes.func,
  duration: PropTypes.number
};

export default MatrixRain;
