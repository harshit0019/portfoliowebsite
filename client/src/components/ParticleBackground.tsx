import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
}

export function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number>(0);

  // Initialize the particles
  const initParticles = (canvas: HTMLCanvasElement) => {
    const particles: Particle[] = [];
    const particleCount = Math.min(100, Math.floor(window.innerWidth / 15)); // Increase particle count
    
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1, // Size between 1 and 4
        speedX: (Math.random() - 0.5) * 0.8, // Higher speed
        speedY: (Math.random() - 0.5) * 0.8,
        opacity: Math.random() * 0.7 + 0.3, // Opacity between 0.3 and 1.0
      });
    }
    
    particlesRef.current = particles;
  };

  // Animation function
  const animateParticles = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Update and draw particles
    particlesRef.current.forEach((particle) => {
      // Update position
      particle.x += particle.speedX;
      particle.y += particle.speedY;
      
      // Bounce off edges
      if (particle.x < 0 || particle.x > canvas.width) {
        particle.speedX *= -1;
      }
      
      if (particle.y < 0 || particle.y > canvas.height) {
        particle.speedY *= -1;
      }
      
      // Draw particle with gradient for more vibrant look
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      
      // Create gradient for each particle
      const gradient = ctx.createRadialGradient(
        particle.x, particle.y, 0,
        particle.x, particle.y, particle.size
      );
      gradient.addColorStop(0, `rgba(255, 255, 255, ${particle.opacity})`); // White core
      gradient.addColorStop(0.3, `rgba(255, 230, 150, ${particle.opacity})`); // Light yellow
      gradient.addColorStop(1, `rgba(255, 153, 0, ${particle.opacity * 0.7})`); // Deep amber
      
      ctx.fillStyle = gradient;
      ctx.fill();
    });
    
    // Continue animation
    animationFrameRef.current = requestAnimationFrame(animateParticles);
  };

  // Resize handler
  const handleResize = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // Set canvas dimensions
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Reinitialize particles
    initParticles(canvas);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // Set initial canvas dimensions
    handleResize();
    
    // Start animation
    animationFrameRef.current = requestAnimationFrame(animateParticles);
    
    // Add resize listener
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameRef.current);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
      style={{ opacity: 1 }}
    />
  );
}

export default ParticleBackground;