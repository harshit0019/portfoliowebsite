import { useState } from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { motion } from "framer-motion";

const radialProgressVariants = cva(
  "relative flex items-center justify-center",
  {
    variants: {
      size: {
        sm: "w-16 h-16",
        md: "w-24 h-24",
        lg: "w-32 h-32",
        xl: "w-40 h-40",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

interface RadialProgressProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof radialProgressVariants> {
  value: number;
  max?: number;
  showValue?: boolean;
  valueClassName?: string;
  thickness?: number;
  color?: string;
  suffix?: string;
  animateOnView?: boolean;
}

export function RadialProgress({
  className,
  size,
  value,
  max = 100,
  showValue = true,
  valueClassName,
  thickness = 8,
  color = "stroke-primary",
  suffix = "%",
  animateOnView = true,
  ...props
}: RadialProgressProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  const normalizedValue = Math.min(100, Math.max(0, (value / max) * 100));
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (normalizedValue / 100) * circumference;

  const progressVariants = {
    initial: { strokeDashoffset: circumference },
    animate: { strokeDashoffset, transition: { duration: 1.5, ease: "easeInOut" } },
    pulse: { 
      scale: [1, 1.02, 1],
      transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
    }
  };

  const valueVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.15,
      transition: { duration: 0.3, type: "spring", stiffness: 300 }
    }
  };

  return (
    <div
      className={cn(radialProgressVariants({ size }), className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      <motion.svg 
        className="w-full h-full -rotate-90" 
        viewBox="0 0 100 100"
        animate={isHovered ? "pulse" : "initial"}
        variants={{
          pulse: {
            scale: [1, 1.03, 1],
            rotate: [-90, -88, -90],
            transition: { duration: 1.2, repeat: Infinity }
          }
        }}
      >
        {/* Decorative elements */}
        {isHovered && (
          <>
            <motion.circle
              className="fill-none stroke-background"
              cx="50"
              cy="50"
              r={radius + 5}
              strokeWidth={1}
              strokeDasharray="3 3"
              initial={{ opacity: 0, rotate: 0 }}
              animate={{ 
                opacity: 1, 
                rotate: 360,
                transition: { duration: 40, repeat: Infinity, ease: "linear" }
              }}
            />
          </>
        )}
        
        {/* Background circle */}
        <circle
          className="stroke-muted-foreground/20 fill-none"
          cx="50"
          cy="50"
          r={radius}
          strokeWidth={thickness}
        />
        
        {/* Progress circle */}
        <motion.circle
          className={cn("fill-none", color)}
          cx="50"
          cy="50"
          r={radius}
          strokeWidth={thickness}
          strokeDasharray={circumference}
          strokeLinecap="round"
          variants={progressVariants}
          initial={animateOnView ? "initial" : "animate"}
          animate="animate"
          viewport={{ once: true }}
        />
      </motion.svg>
      
      {showValue && (
        <motion.div 
          className="absolute inset-0 flex items-center justify-center"
          variants={valueVariants}
          initial="initial"
          animate={isHovered ? "hover" : "initial"}
        >
          <motion.span 
            className={cn("text-lg font-semibold", valueClassName)}
            animate={isHovered ? { 
              color: ["#fbbf24", "#f59e0b", "#fbbf24"],
              transition: { duration: 1.5, repeat: Infinity }
            } : {}}
          >
            {value}{suffix}
          </motion.span>
        </motion.div>
      )}
      
      {/* Glow effect on hover */}
      {isHovered && (
        <motion.div
          className="absolute inset-0 rounded-full"
          initial={{ boxShadow: "0 0 0 0 rgba(251, 191, 36, 0)" }}
          animate={{ 
            boxShadow: ["0 0 0 0 rgba(251, 191, 36, 0)", "0 0 8px 2px rgba(251, 191, 36, 0.3)", "0 0 0 0 rgba(251, 191, 36, 0)"]
          }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      )}
    </div>
  );
}