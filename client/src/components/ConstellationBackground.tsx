import React, { useRef, useEffect } from 'react';

interface Point {
  x: number;
  y: number;
  vx: number;
  vy: number;
  connections: number[];
}

export function ConstellationBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointsRef = useRef<Point[]>([]);
  const animationFrameRef = useRef<number>(0);
  
  // Initialize the points
  const initPoints = (canvas: HTMLCanvasElement) => {
    const width = canvas.width;
    const height = canvas.height;
    const numPoints = Math.floor(width * height / 20000); // Adjust density based on screen size
    const points: Point[] = [];
    
    for (let i = 0; i < numPoints; i++) {
      points.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3, // Slow horizontal movement
        vy: (Math.random() - 0.5) * 0.3, // Slow vertical movement
        connections: []
      });
    }
    
    pointsRef.current = points;
  };
  
  // Calculate distances and connections between points
  const calculateConnections = (maxDistance: number) => {
    const points = pointsRef.current;
    
    // Reset connections
    points.forEach(point => {
      point.connections = [];
    });
    
    // Calculate new connections
    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        const dx = points[i].x - points[j].x;
        const dy = points[i].y - points[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < maxDistance) {
          points[i].connections.push(j);
          points[j].connections.push(i);
        }
      }
    }
  };
  
  // Animation function
  const animate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const width = canvas.width;
    const height = canvas.height;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    const points = pointsRef.current;
    const connectionDistance = Math.min(width, height) * 0.1; // 10% of min dimension
    
    // Update positions
    points.forEach(point => {
      point.x += point.vx;
      point.y += point.vy;
      
      // Bounce off edges
      if (point.x <= 0 || point.x >= width) point.vx *= -1;
      if (point.y <= 0 || point.y >= height) point.vy *= -1;
    });
    
    // Calculate connections
    calculateConnections(connectionDistance);
    
    // Draw points and connections
    ctx.strokeStyle = 'rgba(245, 158, 11, 0.15)'; // Amber color with low opacity
    ctx.fillStyle = 'rgba(245, 158, 11, 0.5)';
    
    points.forEach((point, i) => {
      // Draw connections
      point.connections.forEach(j => {
        if (j > i) { // Avoid drawing twice
          const otherPoint = points[j];
          const dx = point.x - otherPoint.x;
          const dy = point.y - otherPoint.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const opacity = 1 - (distance / connectionDistance);
          
          ctx.beginPath();
          ctx.moveTo(point.x, point.y);
          ctx.lineTo(otherPoint.x, otherPoint.y);
          ctx.strokeStyle = `rgba(245, 158, 11, ${opacity * 0.15})`;
          ctx.stroke();
        }
      });
      
      // Draw point
      ctx.beginPath();
      ctx.arc(point.x, point.y, 1.5, 0, Math.PI * 2);
      ctx.fill();
    });
    
    // Continue animation
    animationFrameRef.current = requestAnimationFrame(animate);
  };
  
  // Handle resize
  const handleResize = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Reinitialize with new dimensions
    initPoints(canvas);
  };
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // Set initial dimensions
    handleResize();
    
    // Start animation
    animationFrameRef.current = requestAnimationFrame(animate);
    
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
      style={{ opacity: 0.5 }}
    />
  );
}

export default ConstellationBackground;