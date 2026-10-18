import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  type: 'petal' | 'heart' | 'sparkle';
  color: string;
}

export const BackgroundEffects: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const petalColors = [
      'rgba(255, 182, 193, 0.65)',
      'rgba(255, 192, 203, 0.7)',
      'rgba(244, 114, 182, 0.55)',
      'rgba(251, 207, 232, 0.8)',
      'rgba(232, 121, 249, 0.45)',
    ];

    const heartColors = [
      'rgba(244, 114, 182, 0.6)',
      'rgba(251, 113, 133, 0.65)',
      'rgba(192, 132, 252, 0.55)',
    ];

    // Mobile optimization: fewer particles on small screens
    const particleCount = window.innerWidth < 768 ? 24 : 45;
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const typeRand = Math.random();
      const type: 'petal' | 'heart' | 'sparkle' =
        typeRand < 0.6 ? 'petal' : typeRand < 0.85 ? 'heart' : 'sparkle';

      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: type === 'sparkle' ? 2 + Math.random() * 3 : 8 + Math.random() * 12,
        speedY: 0.4 + Math.random() * 0.9,
        speedX: (Math.random() - 0.5) * 0.7,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.03,
        opacity: 0.3 + Math.random() * 0.5,
        type,
        color:
          type === 'petal'
            ? petalColors[Math.floor(Math.random() * petalColors.length)]
            : type === 'heart'
            ? heartColors[Math.floor(Math.random() * heartColors.length)]
            : 'rgba(255, 255, 255, 0.85)',
      });
    }

    const drawHeart = (
      context: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      color: string
    ) => {
      context.save();
      context.translate(x, y);
      context.beginPath();
      const topCurveHeight = size * 0.3;
      context.moveTo(0, topCurveHeight);
      // top left curve
      context.bezierCurveTo(-size / 2, -topCurveHeight, -size, size / 3, 0, size);
      // top right curve
      context.bezierCurveTo(size, size / 3, size / 2, -topCurveHeight, 0, topCurveHeight);
      context.fillStyle = color;
      context.fill();
      context.restore();
    };

    const drawPetal = (
      context: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      rotation: number,
      color: string
    ) => {
      context.save();
      context.translate(x, y);
      context.rotate(rotation);
      context.beginPath();
      context.moveTo(0, -size);
      context.quadraticCurveTo(size * 0.6, 0, 0, size);
      context.quadraticCurveTo(-size * 0.6, 0, 0, -size);
      context.fillStyle = color;
      context.fill();
      context.restore();
    };

    const drawSparkle = (
      context: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      opacity: number
    ) => {
      context.save();
      context.translate(x, y);
      context.fillStyle = `rgba(255, 240, 200, ${opacity})`;
      context.beginPath();
      context.arc(0, 0, size, 0, Math.PI * 2);
      context.fill();

      // cross sparkle lines
      context.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.8})`;
      context.lineWidth = 1;
      context.beginPath();
      context.moveTo(-size * 2, 0);
      context.lineTo(size * 2, 0);
      context.moveTo(0, -size * 2);
      context.lineTo(0, size * 2);
      context.stroke();

      context.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += Math.sin(p.y * 0.01) * 0.6 + p.speedX;
        p.rotation += p.rotationSpeed;

        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }
        if (p.x > width + 20) p.x = -20;
        if (p.x < -20) p.x = width + 20;

        if (p.type === 'petal') {
          drawPetal(ctx, p.x, p.y, p.size, p.rotation, p.color);
        } else if (p.type === 'heart') {
          drawHeart(ctx, p.x, p.y, p.size, p.color);
        } else {
          const pulsate = 0.4 + Math.sin(Date.now() * 0.005 + p.x) * 0.4;
          drawSparkle(ctx, p.x, p.y, p.size, pulsate);
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-0 h-full w-full"
        aria-hidden="true"
      />
      {/* Gentle ambient glowing spots in corners */}
      <div className="pointer-events-none fixed -top-32 -left-32 h-96 w-96 rounded-full bg-pink-300/30 blur-3xl" />
      <div className="pointer-events-none fixed -bottom-32 -right-32 h-96 w-96 rounded-full bg-purple-300/30 blur-3xl" />
      <div className="pointer-events-none fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-rose-200/20 blur-3xl" />
    </>
  );
};
