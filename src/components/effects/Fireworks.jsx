import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

/**
 * Fireworks - Subtle fireworks animation for company anniversary
 * Canvas-based animation with occasional bursts
 * 
 * @component
 * @example
 * <Fireworks active={true} />
 * 
 * @accessibility
 * - Purely decorative, does not interfere with content
 * - Respects prefers-reduced-motion
 * - Subtle and non-intrusive
 */
const Fireworks = ({ active = false }) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const particlesRef = useRef([]);
  const lastFireworkRef = useRef(0);

  useEffect(() => {
    if (!active) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle class for firework effects
    class Particle {
      constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.velocity = {
          x: (Math.random() - 0.5) * 4,
          y: (Math.random() - 0.5) * 4
        };
        this.alpha = 1;
        this.decay = Math.random() * 0.015 + 0.015;
        this.size = Math.random() * 3 + 1;
      }

      update() {
        this.velocity.y += 0.05; // Gravity
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.alpha -= this.decay;
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      isDead() {
        return this.alpha <= 0;
      }
    }

    const createFirework = () => {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height * 0.5; // Upper half of screen
      const colors = ['#00E5FF', '#A855F7', '#FFB7C5', '#FFFFFF'];
      const color = colors[Math.floor(Math.random() * colors.length)];
      const particleCount = 30;

      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push(new Particle(x, y, color));
      }
    };

    const animate = (timestamp) => {
      // Clear canvas completely (transparent background)
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Create new firework every 3-5 seconds
      if (timestamp - lastFireworkRef.current > 3000 + Math.random() * 2000) {
        createFirework();
        lastFireworkRef.current = timestamp;
      }

      // Update and draw particles
      particlesRef.current = particlesRef.current.filter(particle => {
        particle.update();
        particle.draw();
        return !particle.isDead();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [active]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[100]"
      role="presentation"
      aria-hidden="true"
      style={{ background: 'transparent' }}
    />
  );
};

Fireworks.propTypes = {
  active: PropTypes.bool
};

export default Fireworks;
