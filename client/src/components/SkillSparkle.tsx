import React, { useState, useRef, useEffect } from 'react';

interface SparkleParticle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  life: number;
  maxLife: number;
}

interface SkillSparkleProps {
  children: React.ReactNode;
  className?: string;
}

export function SkillSparkle({ children, className = '' }: SkillSparkleProps) {
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sparklesRef = useRef<SparkleParticle[]>([]);
  const animationFrameRef = useRef<number>(0);
  
  // Create sparkle particles when hovering
  const createSparkles = (mouseX: number, mouseY: number) => {
    // Disabled sparkle effect
    return;
  };
  
  // Animation function
  const animateSparkles = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Update and draw sparkles
    sparklesRef.current = sparklesRef.current.filter((sparkle) => {
      // Update life
      sparkle.life++;
      
      // Remove if exceeded max life
      if (sparkle.life >= sparkle.maxLife) {
        return false;
      }
      
      // Update position
      sparkle.x += sparkle.speedX;
      sparkle.y += sparkle.speedY;
      
      // Update opacity based on life
      sparkle.opacity = 1 - (sparkle.life / sparkle.maxLife);
      
      // Draw sparkle
      ctx.beginPath();
      ctx.arc(sparkle.x, sparkle.y, sparkle.size, 0, Math.PI * 2);
      
      // Brighter gradient colors
      const gradient = ctx.createRadialGradient(
        sparkle.x, sparkle.y, 0,
        sparkle.x, sparkle.y, sparkle.size
      );
      gradient.addColorStop(0, `rgba(255, 255, 255, ${sparkle.opacity})`); // White core
      gradient.addColorStop(0.5, `rgba(255, 230, 150, ${sparkle.opacity})`); // Light yellow
      gradient.addColorStop(1, `rgba(255, 153, 0, ${sparkle.opacity * 0.7})`); // Deep amber
      
      ctx.fillStyle = gradient;
      ctx.fill();
      
      return true;
    });
    
    // Continue animation if there are sparkles or we're still hovering
    if (sparklesRef.current.length > 0 || isHovering) {
      animationFrameRef.current = requestAnimationFrame(animateSparkles);
    }
  };
  
  // Mouse move handler
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isHovering) {
      createSparkles(e.clientX, e.clientY);
    }
  };
  
  // Setup and cleanup effects
  useEffect(() => {
    if (isHovering) {
      // Start animation when hovering
      animationFrameRef.current = requestAnimationFrame(animateSparkles);
      
      // Setup canvas
      const container = containerRef.current;
      const canvas = canvasRef.current;
      
      if (container && canvas) {
        canvas.width = container.offsetWidth;
        canvas.height = container.offsetHeight;
        
        // Auto-generate sparkles at random positions within the component
        const generateRandomSparkles = () => {
          const width = container.offsetWidth;
          const height = container.offsetHeight;
          
          // Generate sparkles at 3 random positions
          for (let i = 0; i < 3; i++) {
            const x = Math.random() * width;
            const y = Math.random() * height;
            createSparkles(x + container.getBoundingClientRect().left, 
                          y + container.getBoundingClientRect().top);
          }
        };
        
        // Generate sparkles every 150ms while hovering
        const intervalId = setInterval(generateRandomSparkles, 150);
        
        return () => {
          clearInterval(intervalId);
          cancelAnimationFrame(animationFrameRef.current);
        };
      }
    } else {
      // Allow animation to continue until all particles are gone
      if (sparklesRef.current.length === 0) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    }
    
    return () => {
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, [isHovering]);
  
  return (
    <div
      ref={containerRef}
      className={`relative inline-flex ${className}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onMouseMove={handleMouseMove}
    >
      {children}
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
      />
    </div>
  );
}

export default SkillSparkle;