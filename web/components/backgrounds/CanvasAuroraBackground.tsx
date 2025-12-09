// E:\vs code projects\tsa1.1\TSA1.1\web\components\backgrounds\CanvasAuroraBackground.tsx
'use client';

import { useEffect, useRef, ReactNode } from 'react';

interface CanvasAuroraProps {
  children: ReactNode;
  className?: string;
}

// Class moved outside component
class AuroraParticle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
  canvas: HTMLCanvasElement;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 300 + 200;
    this.speedX = (Math.random() - 0.5) * 0.5;
    this.speedY = (Math.random() - 0.5) * 0.5;
    
    const colors = [
      'rgba(59, 130, 246, 0.3)',
      'rgba(139, 92, 246, 0.25)',
      'rgba(6, 182, 212, 0.2)',
    ];
    this.color = colors[Math.floor(Math.random() * colors.length)];
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x > this.canvas.width + this.size) this.x = -this.size;
    if (this.x < -this.size) this.x = this.canvas.width + this.size;
    if (this.y > this.canvas.height + this.size) this.y = -this.size;
    if (this.y < -this.size) this.y = this.canvas.height + this.size;
  }

  draw(ctx: CanvasRenderingContext2D) {
    const gradient = ctx.createRadialGradient(
      this.x, this.y, 0,
      this.x, this.y, this.size
    );
    gradient.addColorStop(0, this.color);
    gradient.addColorStop(1, 'transparent');

    ctx.fillStyle = gradient;
    ctx.fillRect(
      this.x - this.size,
      this.y - this.size,
      this.size * 2,
      this.size * 2
    );
  }
}

export default function CanvasAuroraBackground({ children, className = '' }: CanvasAuroraProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    const particles: AuroraParticle[] = [];
    for (let i = 0; i < 3; i++) {
      particles.push(new AuroraParticle(canvas));
    }

    let animationId: number;
    const animate = () => {
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#000000');
      gradient.addColorStop(0.5, '#0a0a1a');
      gradient.addColorStop(1, '#000000');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.update();
        particle.draw(ctx);
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', setCanvasSize);
    };
  }, []);

  return (
    <div className={`relative min-h-screen ${className}`}>
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-full pointer-events-none"
        style={{ zIndex: 0 }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
