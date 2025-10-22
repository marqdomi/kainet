import { useEffect, useRef } from 'react';

/**
 * SimpleBackground - Lightweight interactive background with canvas animation
 * Features: Mouse interaction, fluid animation, particle system
 */
export default function SimpleBackground() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, isMoving: false });
  const particlesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Set canvas to fill viewport
    const updateSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    updateSize();
    window.addEventListener('resize', updateSize);

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Particle system
    class Particle {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.vx = (Math.random() - 0.5) * 2;
        this.vy = (Math.random() - 0.5) * 2;
        this.life = 1;
        this.decay = Math.random() * 0.02 + 0.008;
        this.color = Math.random() > 0.5 ? '#00E5FF' : '#5227FF';
        this.size = Math.random() * 3 + 2;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += 0.05; // gravity
        this.life -= this.decay;
        return this.life > 0;
      }

      draw(ctx) {
        ctx.globalAlpha = this.life * 0.6;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    }

    // Mouse events
    const handleMouseMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.isMoving = true;

      // Create particles on mouse move
      if (Math.random() > 0.7) {
        particlesRef.current.push(new Particle(e.clientX, e.clientY));
      }

      clearTimeout(mouseRef.current.timeout);
      mouseRef.current.timeout = setTimeout(() => {
        mouseRef.current.isMoving = false;
      }, 500);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    let animationId;
    let time = 0;

    // Main animation loop
    const animate = () => {
      time += 0.002;

      // Base gradient background
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, '#0a0e27');
      gradient.addColorStop(0.3, '#0f1a3f');
      gradient.addColorStop(0.6, '#1a0f2e');
      gradient.addColorStop(1, '#0a0e27');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw static animated elements
      const particleCount = 120;
      for (let i = 0; i < particleCount; i++) {
        const x = (Math.sin(time + i * 0.1) + 1) / 2 * canvas.width;
        const y = (Math.cos(time * 0.7 + i * 0.1) + 1) / 2 * canvas.height;
        const size = Math.sin(time + i) * 2 + 2;
        const opacity = (Math.sin(time + i * 0.5) + 1) / 2 * 0.5;

        ctx.globalAlpha = opacity;
        ctx.fillStyle = '#00E5FF';
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      }

      // Purple accent particles
      for (let i = 0; i < particleCount / 2; i++) {
        const x = (Math.sin(time * 0.5 + i * 0.2) + 1) / 2 * canvas.width;
        const y = (Math.cos(time + i * 0.2) + 1) / 2 * canvas.height;
        const size = Math.sin(time * 0.7 + i) * 1.5 + 1.5;
        const opacity = (Math.sin(time * 1.5 + i * 0.5) + 1) / 2 * 0.3;

        ctx.globalAlpha = opacity;
        ctx.fillStyle = '#5227FF';
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw glow around mouse if moving
      if (mouseRef.current.isMoving) {
        const mx = mouseRef.current.x;
        const my = mouseRef.current.y;
        const glowGradient = ctx.createRadialGradient(mx, my, 0, mx, my, 150);
        glowGradient.addColorStop(0, 'rgba(0, 229, 255, 0.3)');
        glowGradient.addColorStop(1, 'rgba(0, 229, 255, 0)');
        ctx.globalAlpha = 0.5;
        ctx.fillStyle = glowGradient;
        ctx.fillRect(mx - 150, my - 150, 300, 300);
      }

      // Update and draw dynamic particles
      particlesRef.current = particlesRef.current.filter((p) => p.update());
      particlesRef.current.forEach((p) => p.draw(ctx));

      ctx.globalAlpha = 1;
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', updateSize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="simple-background"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        display: 'block',
      }}
    />
  );
}
