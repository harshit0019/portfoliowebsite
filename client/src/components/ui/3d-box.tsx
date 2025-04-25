import React, { useState, ReactNode, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ThreeDBoxProps {
  children: ReactNode;
  className?: string;
  depth?: number;
  maxTilt?: number;
  perspective?: number;
  initialTilt?: [number, number]; // [x, y]
  glowColor?: string;
  glowOpacity?: number;
  wallColor?: string;
  shadowColor?: string;
  shadowIntensity?: number;
  interactive?: boolean;
}

export function ThreeDBox({
  children,
  className = '',
  depth = 20,
  maxTilt = 5,
  perspective = 1000,
  initialTilt = [0, 0],
  glowColor = 'rgba(245, 158, 11, 0.4)', // amber glow
  glowOpacity = 0.15,
  wallColor = 'rgba(245, 158, 11, 0.15)', // amber walls
  shadowColor = 'rgba(245, 158, 11, 0.3)', // amber shadow
  shadowIntensity = 0.5,
  interactive = true,
}: ThreeDBoxProps) {
  const [tiltX, setTiltX] = useState(initialTilt[0]);
  const [tiltY, setTiltY] = useState(initialTilt[1]);
  const [hovering, setHovering] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  // Function to handle mouse movement
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive || !boxRef.current) return;
    
    const rect = boxRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left; // x position within the element
    const y = e.clientY - rect.top; // y position within the element
    
    // Calculate tilt based on mouse position relative to the center of the element
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Calculate tilt percentages (-1 to 1)
    const tiltXPercentage = (x - centerX) / centerX;
    const tiltYPercentage = (y - centerY) / centerY;
    
    // Apply max tilt (negative is opposite direction)
    setTiltX(-tiltYPercentage * maxTilt);
    setTiltY(tiltXPercentage * maxTilt);
  };

  // Function to handle mouse leave
  const handleMouseLeave = () => {
    if (!interactive) return;
    setHovering(false);
    
    // Smoothly animate back to initial position
    setTiltX(initialTilt[0]);
    setTiltY(initialTilt[1]);
  };

  // Create random initial animation values for a slight floating effect
  useEffect(() => {
    // Only apply floating animation if not interactive
    if (!interactive && boxRef.current) {
      const intervalId = setInterval(() => {
        const randomX = (Math.random() - 0.5) * 2; // Random value between -1 and 1
        const randomY = (Math.random() - 0.5) * 2; // Random value between -1 and 1
        
        setTiltX(randomX * maxTilt * 0.2);
        setTiltY(randomY * maxTilt * 0.2);
      }, 3000);
      
      return () => clearInterval(intervalId);
    }
  }, [interactive, maxTilt]);

  return (
    <div
      ref={boxRef}
      className={cn('relative transition-transform duration-100', className)}
      style={{ perspective: `${perspective}px` }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => interactive && setHovering(true)}
      onMouseLeave={handleMouseLeave}
    >
      {/* Subtle glow effect */}
      {hovering && (
        <div 
          className="absolute inset-0 rounded-lg blur-xl transition-opacity duration-300"
          style={{ 
            background: glowColor, 
            opacity: glowOpacity,
            zIndex: -1,
            transform: 'translateZ(-50px) scale(1.1)'
          }}
        />
      )}
      
      {/* Main 3D transforming box */}
      <motion.div
        className="relative rounded-lg overflow-hidden"
        animate={{
          rotateX: tiltX,
          rotateY: tiltY,
          transformStyle: 'preserve-3d',
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 20,
          mass: 0.8
        }}
      >
        {/* Bottom shadow */}
        <div 
          className="absolute left-0 bottom-0 w-full h-full rounded-lg opacity-0 transition-opacity duration-300"
          style={{ 
            boxShadow: `0 ${depth * 0.8}px ${depth * 1.2}px -5px ${shadowColor}`,
            opacity: hovering ? shadowIntensity : 0,
            transform: `translateZ(-${depth * 0.5}px)`,
            pointerEvents: 'none',
          }}
        />
        
        {/* Main content (front face) */}
        <div className="relative rounded-lg z-20">
          {children}
        </div>
        
        {/* Left wall */}
        <div 
          className="absolute left-0 top-0 bottom-0 w-full bg-gradient-to-l from-transparent to-black/30 rounded-l-lg"
          style={{ 
            width: `${depth}px`,
            transform: `rotateY(90deg) translateZ(-${depth/2}px) translateX(-${depth/2}px)`,
            transformOrigin: 'left center',
            background: wallColor,
          }}
        />
        
        {/* Right wall */}
        <div 
          className="absolute right-0 top-0 bottom-0 w-full rounded-r-lg"
          style={{ 
            width: `${depth}px`,
            transform: `rotateY(-90deg) translateZ(-${depth/2}px) translateX(${depth/2}px)`,
            transformOrigin: 'right center',
            background: wallColor,
          }}
        />
        
        {/* Top wall */}
        <div 
          className="absolute top-0 left-0 right-0 rounded-t-lg"
          style={{ 
            height: `${depth}px`,
            transform: `rotateX(-90deg) translateZ(-${depth/2}px) translateY(-${depth/2}px)`,
            transformOrigin: 'center top',
            background: wallColor,
          }}
        />
        
        {/* Bottom wall */}
        <div 
          className="absolute bottom-0 left-0 right-0 rounded-b-lg"
          style={{ 
            height: `${depth}px`,
            transform: `rotateX(90deg) translateZ(-${depth/2}px) translateY(${depth/2}px)`,
            transformOrigin: 'center bottom',
            background: wallColor,
          }}
        />
        
        {/* Back wall */}
        <div 
          className="absolute inset-0 rounded-lg"
          style={{ 
            transform: `translateZ(-${depth}px)`,
            background: wallColor,
          }}
        />
      </motion.div>
    </div>
  );
}

export default ThreeDBox;