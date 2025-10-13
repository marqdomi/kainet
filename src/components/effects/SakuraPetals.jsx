import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

/**
 * SakuraPetals - Subtle sakura petal animation for New Year
 * Canvas-based animation with falling petals
 * 
 * @component
 * @example
 * <SakuraPetals active={true} />
 * 
 * @accessibility
 * - Purely decorative, does not interfere with content
 * - Respects prefers-reduced-motion
 */
const SakuraPetals = ({ active = false }) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const petalsRef = useRef([]);

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

    // Initialize petals
    class Petal {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = -20;
        this.size = Math.random() * 8 + 4;
        this.speedY = Math.random() * 1 + 0.5;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = Math.random() * 0.02 - 0.01;
        this.opacity = Math.random() * 0.3 + 0.2;
      }

      update() {
        this.y += this.speedY;
        this.x += this.speedX;
        this.rotation += this.rotationSpeed;

        // Reset if out of bounds
        if (this.y > canvas.height + 20) {
          this.reset();
        }
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.globalAlpha = this.opacity;

        // Draw petal shape (simple ellipse)
        ctx.fillStyle = '#FFB7C5'; // Sakura pink
        ctx.beginPath();
        ctx.ellipse(0, 0, this.size, this.size * 1.5, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }
    }

    // Create petals (subtle amount)
    const petalCount = 30;
    petalsRef.current = Array.from({ length: petalCount }, () => new Petal());

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      petalsRef.current.forEach(petal => {
        petal.update();
        petal.draw();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

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
    />
  );
};

SakuraPetals.propTypes = {
  active: PropTypes.bool
};

export default SakuraPetals;
