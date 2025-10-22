import { useEffect, useRef } from 'react';
import './LiquidEther.css';

interface LiquidEtherCanvasProps {
  colors?: string[];
  mouseForce?: number;
  cursorSize?: number;
  resolution?: number;
  autoDemo?: boolean;
  autoSpeed?: number;
  autoIntensity?: number;
}

class FluidParticle {
  x: number;
  y: number;
  px: number;
  py: number;
  vx: number = 0;
  vy: number = 0;
  color: string;
  life: number = 1;
  canvasWidth: number;
  canvasHeight: number;

  constructor(x: number, y: number, color: string, canvasWidth: number, canvasHeight: number) {
    this.x = x;
    this.y = y;
    this.px = x;
    this.py = y;
    this.color = color;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
  }

  update(gravity: number = 0.05): void {
    const friction = 0.99;
    this.vx = (this.x - this.px) * friction;
    this.vy = (this.y - this.py) * friction;

    this.px = this.x;
    this.py = this.y;

    this.x += this.vx;
    this.y += this.vy + gravity;

    if (this.x < 0 || this.x > this.canvasWidth) {
      this.vx *= -0.8;
      this.x = Math.max(0, Math.min(this.canvasWidth, this.x));
    }
    if (this.y < 0 || this.y > this.canvasHeight) {
      this.vy *= -0.8;
      this.y = Math.max(0, Math.min(this.canvasHeight, this.y));
    }

    this.life -= 0.01;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.globalAlpha = this.life * 0.8;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, 2 + this.life * 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
  }
}

export default function LiquidEtherCanvas({
  colors = ['#00E5FF', '#5227FF', '#B19EEF'],
  mouseForce = 20,
  cursorSize = 100,
  resolution = 0.5,
  autoDemo = true,
  autoSpeed = 0.5,
  autoIntensity = 2.2,
}: LiquidEtherCanvasProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, isMoving: false, vx: 0, vy: 0 });
  const autoDemoRef = useRef({ active: false, x: 0, y: 0, timeout: null as NodeJS.Timeout | null });

  useEffect(() => {
    const canvas = canvasRef.current;
    const mount = mountRef.current;
    if (!canvas || !mount) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const updateSize = (): void => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    updateSize();

    const particles: FluidParticle[] = [];
    let lastMouseX = canvas.width / 2;
    let lastMouseY = canvas.height / 2;

    const handleMouseMove = (e: MouseEvent): void => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;

      mouseRef.current.vx = e.clientX - lastMouseX;
      mouseRef.current.vy = e.clientY - lastMouseY;

      lastMouseX = e.clientX;
      lastMouseY = e.clientY;

      mouseRef.current.isMoving = true;

      if (Math.random() > 0.6) {
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        for (let i = 0; i < 2; i++) {
          particles.push(
            new FluidParticle(
              e.clientX + (Math.random() - 0.5) * 20,
              e.clientY + (Math.random() - 0.5) * 20,
              randomColor,
              canvas.width,
              canvas.height
            )
          );
        }
      }

      if (autoDemoRef.current.timeout) {
        clearTimeout(autoDemoRef.current.timeout);
      }
      if (autoDemo) {
        autoDemoRef.current.timeout = setTimeout(() => {
          autoDemoRef.current.active = true;
        }, 2000);
      }
    };

    const handleMouseLeave = (): void => {
      mouseRef.current.isMoving = false;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', updateSize);

    let animationId: number;
    let time = 0;

    const updateAutoDemo = (): void => {
      if (!autoDemoRef.current.active) return;

      time += autoSpeed * 0.01;
      autoDemoRef.current.x = Math.sin(time) * (canvas.width * 0.3) + canvas.width * 0.5;
      autoDemoRef.current.y = Math.cos(time * 0.7) * (canvas.height * 0.2) + canvas.height * 0.5;

      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      for (let i = 0; i < 1; i++) {
        particles.push(
          new FluidParticle(
            autoDemoRef.current.x + (Math.random() - 0.5) * 30,
            autoDemoRef.current.y + (Math.random() - 0.5) * 30,
            randomColor,
            canvas.width,
            canvas.height
          )
        );
      }
    };

    const animate = (): void => {
      const bgGradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      bgGradient.addColorStop(0, '#0a0e27');
      bgGradient.addColorStop(0.3, '#0f1a3f');
      bgGradient.addColorStop(0.6, '#1a0f2e');
      bgGradient.addColorStop(1, '#0a0e27');

      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < 50; i++) {
        const x = Math.sin(time * 0.1 + i * 0.5) * canvas.width * 0.5 + canvas.width * 0.5;
        const y = Math.cos(time * 0.15 + i * 0.3) * canvas.height * 0.5 + canvas.height * 0.5;
        const opacity = Math.sin(time + i) * 0.2 + 0.1;

        ctx.globalAlpha = opacity;
        ctx.fillStyle = colors[i % colors.length];
        ctx.fillRect(x - 30, y - 30, 60, 60);
      }

      ctx.globalAlpha = 1;

      const drawPoint = mouseRef.current.isMoving
        ? { x: mouseRef.current.x, y: mouseRef.current.y }
        : autoDemoRef.current.active
          ? { x: autoDemoRef.current.x, y: autoDemoRef.current.y }
          : null;

      if (drawPoint) {
        const glowGradient = ctx.createRadialGradient(drawPoint.x, drawPoint.y, 0, drawPoint.x, drawPoint.y, cursorSize);
        glowGradient.addColorStop(0, 'rgba(0, 229, 255, 0.5)');
        glowGradient.addColorStop(0.5, 'rgba(82, 39, 255, 0.2)');
        glowGradient.addColorStop(1, 'rgba(0, 229, 255, 0)');

        ctx.fillStyle = glowGradient;
        ctx.fillRect(drawPoint.x - cursorSize, drawPoint.y - cursorSize, cursorSize * 2, cursorSize * 2);

        ctx.strokeStyle = 'rgba(0, 229, 255, 0.3)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(drawPoint.x, drawPoint.y, cursorSize, 0, Math.PI * 2);
        ctx.stroke();
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        particles[i].draw(ctx);

        if (particles[i].life <= 0) {
          particles.splice(i, 1);
        }
      }

      updateAutoDemo();

      time += 0.016;
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', updateSize);
      if (autoDemoRef.current.timeout) {
        clearTimeout(autoDemoRef.current.timeout);
      }
      cancelAnimationFrame(animationId);
    };
  }, [colors, mouseForce, cursorSize, resolution, autoDemo, autoSpeed, autoIntensity]);

  return (
    <div ref={mountRef} className="liquid-ether-container">
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
}
