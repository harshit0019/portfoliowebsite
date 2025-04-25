import { useState } from "react";
import { motion } from "framer-motion";
import { SKILLS, CERTIFICATIONS } from "@/lib/constants";
import { 
  Code, 
  Laptop, 
  BarChart, 
  Bot, 
  Database, 
  FileSpreadsheet, 
  Globe,
  Info,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RadialProgress } from "@/components/ui/radial-progress";
import { cn } from "@/lib/utils";
import SkillSparkle from "@/components/SkillSparkle";
import ThreeDBox from "@/components/ui/3d-box";

const getIcon = (iconName: string) => {
  switch (iconName) {
    case 'code':
      return <Code className="w-6 h-6 text-primary" />;
    case 'laptop-code':
      return <Laptop className="w-6 h-6 text-primary" />;
    case 'chart-bar':
      return <BarChart className="w-6 h-6 text-primary" />;
    case 'robot':
      return <Bot className="w-6 h-6 text-primary" />;
    case 'database':
      return <Database className="w-6 h-6 text-primary" />;
    case 'file-excel':
      return <FileSpreadsheet className="w-6 h-6 text-primary" />;
    case 'globe':
      return <Globe className="w-6 h-6 text-primary" />;
    case 'python':
      return (
        <svg className="w-6 h-6 text-primary" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.372 0 5.54 2.356 5.54 2.356v4.878h6.606v.936H3.4S0 7.784 0 14.3c0 6.513 2.97 6.276 2.97 6.276h1.771v-3.017s-.096-3.607 3.49-3.607h6.003s3.37.058 3.37-3.285V4.59S18.277 0 12 0zm-1.768 2.53a1.174 1.174 0 0 1 1.169 1.17 1.174 1.174 0 0 1-1.17 1.169 1.174 1.174 0 0 1-1.168-1.17 1.174 1.174 0 0 1 1.169-1.169z" />
          <path d="M12 24c6.627 0 6.46-2.356 6.46-2.356v-4.878H11.85v-.936H18.6s3.4.385 3.4-6.13c0-6.513-2.97-6.276-2.97-6.276h-1.772v3.017s.096 3.607-3.489 3.607H7.77s-3.371-.058-3.371 3.285v6.077S5.722 24 12 24zm1.768-2.53a1.174 1.174 0 0 1-1.169-1.17 1.174 1.174 0 0 1 1.17-1.169 1.174 1.174 0 0 1 1.168 1.17 1.174 1.174 0 0 1-1.169 1.169z" />
        </svg>
      );
    default:
      return <Code className="w-6 h-6 text-primary" />;
  }
};

// Helper to determine badge color based on proficiency
const getSkillLevel = (proficiency: number) => {
  if (proficiency >= 90) return { text: "Expert", color: "bg-gradient-to-r from-amber-400/90 to-amber-500/90" };
  if (proficiency >= 75) return { text: "Advanced", color: "bg-gradient-to-r from-blue-400/80 to-blue-500/80" };
  if (proficiency >= 60) return { text: "Intermediate", color: "bg-gradient-to-r from-yellow-400/80 to-yellow-500/80" };
  return { text: "Beginner", color: "bg-gradient-to-r from-gray-400/70 to-gray-500/70" };
};

// Define tooltips for skill levels
const skillLevelDescriptions = {
  "Expert": "Extensive experience with deep understanding. Can architect solutions and mentor others.",
  "Advanced": "Strong knowledge with practical implementation experience. Can handle complex challenges independently.",
  "Intermediate": "Good working knowledge. Can implement features with minimal supervision.",
  "Beginner": "Fundamental understanding with basic implementation experience. Learning and growing."
};

export function SkillsSection() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});
  
  const toggleCategory = (categoryName: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryName]: !prev[categoryName]
    }));
  };
  
  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div 
        className="text-center mb-16 animate-on-scroll"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="section-title">Skills</h2>
        <div className="section-divider"></div>
        <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
          Interactive overview of my technical expertise and proficiency levels across different domains.
        </p>
      </motion.div>
      
      {/* Overview radar chart */}
      <ThreeDBox
        className="mb-16 animate-on-scroll"
        depth={25}
        maxTilt={5}
        perspective={1500}
        wallColor="rgba(245, 158, 11, 0.08)"
        shadowColor="rgba(245, 158, 11, 0.2)"
      >
        <motion.div
          className="bg-card p-6 rounded-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-xl font-medium text-center mb-8">Skills Overview</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 justify-items-center">
            {SKILLS.map((category, index) => {
              // Calculate category average proficiency
              const avgProficiency = Math.floor(
                category.skills.reduce((sum, skill) => sum + skill.proficiency, 0) / 
                category.skills.length
              );
              
              const skillLevel = getSkillLevel(avgProficiency);
              
              return (
                <motion.div
                  key={index}
                  className="text-center"
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="cursor-pointer">
                          <RadialProgress 
                            value={avgProficiency} 
                            color={skillLevel.text === "Expert" ? "stroke-amber-500" : 
                                  skillLevel.text === "Advanced" ? "stroke-blue-500/80" : 
                                  skillLevel.text === "Intermediate" ? "stroke-yellow-500/80" : 
                                  "stroke-gray-500/70"}
                            size="lg"
                            thickness={4}
                            valueClassName="text-sm"
                          />
                          <p className="mt-2 font-medium text-sm">{category.category}</p>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent side="bottom" className="max-w-xs">
                        <div className="text-center">
                          <p className="font-bold">{category.category}: {avgProficiency}%</p>
                          <p className="text-xs mt-1">({skillLevel.text} level)</p>
                          <ul className="text-xs mt-2 text-left">
                            {category.skills.slice(0, 3).map((skill, i) => (
                              <li key={i}>{skill.name}: {skill.proficiency}%</li>
                            ))}
                            {category.skills.length > 3 && (
                              <li className="text-center italic mt-1">...and {category.skills.length - 3} more</li>
                            )}
                          </ul>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </ThreeDBox>
      
      {/* Detailed skill categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {SKILLS.map((skillCategory, index) => {
          // Calculate category average proficiency
          const avgProficiency = Math.floor(
            skillCategory.skills.reduce((sum, skill) => sum + skill.proficiency, 0) / 
            skillCategory.skills.length
          );
          
          const isExpanded = expandedCategories[skillCategory.category] !== false; // Default to expanded
          
          return (
            <div key={index} className="animate-on-scroll h-full flex flex-col">
              <ThreeDBox
                depth={30}
                maxTilt={8}
                perspective={1200}
                wallColor="rgba(245, 158, 11, 0.12)"
                glowColor="rgba(245, 158, 11, 0.5)"
                glowOpacity={0.2}
                className="h-full flex-1"
              >
                <motion.div 
                  className="bg-card p-8 rounded-lg shadow-md border border-border h-full"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div 
                    className="flex items-center justify-between mb-6 cursor-pointer"
                    onClick={() => toggleCategory(skillCategory.category)}
                  >
                    <div className="flex items-center">
                      <motion.div 
                        className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-500/10 to-amber-700/5 flex items-center justify-center mr-4 shadow-sm"
                        initial={{ scale: 1 }}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        {getIcon(skillCategory.icon)}
                      </motion.div>
                      <div>
                        <h3 className="text-xl font-semibold bg-gradient-to-r from-amber-400/90 to-amber-500/90 bg-clip-text text-transparent">{skillCategory.category}</h3>
                        <div className="flex items-center mt-1">
                          <span className="text-sm text-muted-foreground">Overall proficiency: </span>
                          <span className="ml-1 text-sm font-medium">{avgProficiency}%</span>
                        </div>
                      </div>
                    </div>
                    
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </Button>
                  </div>
                  
                  {isExpanded && (
                    <motion.div 
                      className="space-y-5"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {skillCategory.skills.map((skill, skillIndex) => {
                        const skillLevel = getSkillLevel(skill.proficiency);
                        
                        return (
                          <motion.div 
                            key={skillIndex} 
                            className={cn(
                              "p-4 rounded-lg transition-colors",
                              hoveredSkill === skill.name ? "bg-secondary/40" : "bg-background"
                            )}
                            whileHover={{ 
                              scale: 1.02,
                              transition: { duration: 0.2 }
                            }}
                            onHoverStart={() => setHoveredSkill(skill.name)}
                            onHoverEnd={() => setHoveredSkill(null)}
                          >
                            <div className="flex flex-wrap items-center justify-between mb-1.5">
                              <div className="flex items-center">
                                <span className="font-medium mr-2">{skill.name}</span>
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <SkillSparkle>
                                        <Badge 
                                          variant="secondary"
                                          className={cn("text-xs px-2 py-0 font-normal text-white", skillLevel.color)}
                                        >
                                          {skillLevel.text}
                                        </Badge>
                                      </SkillSparkle>
                                    </TooltipTrigger>
                                    <TooltipContent side="top" className="max-w-xs">
                                      <p>{skillLevelDescriptions[skillLevel.text as keyof typeof skillLevelDescriptions]}</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              </div>
                              <span className="font-semibold text-primary">{skill.proficiency}%</span>
                            </div>
                            
                            <div className="relative">
                              <div className="relative h-3">
                                <Progress 
                                  className="h-3 overflow-visible" 
                                  value={skill.proficiency}
                                  aria-label={`${skill.name} proficiency: ${skill.proficiency}%`}
                                />
                                
                                {/* Skill level marker */}
                                <motion.div 
                                  className={cn(
                                    "absolute top-0 bottom-0 w-1.5 h-6 -mt-1.5 rounded-full z-10",
                                    skillLevel.color
                                  )}
                                  style={{ 
                                    left: `calc(${skill.proficiency}% - 3px)`
                                  }}
                                  animate={
                                    hoveredSkill === skill.name 
                                      ? { 
                                          y: [0, -5, 0],
                                          scale: [1, 1.2, 1],
                                          transition: { 
                                            repeat: Infinity, 
                                            duration: 1.5,
                                          }
                                        }
                                      : {}
                                  }
                                />
                              </div>
                              
                              {/* Interactive effect when hovering */}
                              {hoveredSkill === skill.name && (
                                <>
                                  <motion.div 
                                    className="absolute inset-0 rounded-full"
                                    initial={{ opacity: 0 }}
                                    animate={{ 
                                      opacity: [0.2, 0.4, 0.2], 
                                      boxShadow: [
                                        "0 0 0 0 rgba(245, 158, 11, 0)",
                                        "0 0 4px 2px rgba(245, 158, 11, 0.3)",
                                        "0 0 0 0 rgba(245, 158, 11, 0)"
                                      ]
                                    }}
                                    transition={{ 
                                      repeat: Infinity,
                                      duration: 1.5
                                    }}
                                  />
                                  
                                  {/* Animated dots moving along the progress bar */}
                                  <motion.div 
                                    className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-primary"
                                    initial={{ x: 0, opacity: 0 }}
                                    animate={{ 
                                      x: `${skill.proficiency}%`, 
                                      opacity: [0, 1, 0],
                                      scale: [0.8, 1.2, 0.8]
                                    }}
                                    transition={{ 
                                      repeat: Infinity, 
                                      duration: 1.8,
                                      delay: 0.2
                                    }}
                                  />
                                </>
                              )}
                            </div>
                          </motion.div>
                        );
                      })}
                    </motion.div>
                  )}
                </motion.div>
              </ThreeDBox>
            </div>
          );
        })}
      </div>
      
      {/* Certifications */}
      <motion.div 
        className="mt-16 animate-on-scroll"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h3 className="text-2xl font-semibold text-center mb-8 bg-gradient-to-r from-amber-400/90 to-amber-500/90 bg-clip-text text-transparent inline-block mx-auto">Certifications</h3>
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {CERTIFICATIONS.map((cert, index) => (
            <div key={index} className="h-full flex flex-col">
              <ThreeDBox
                depth={15}
                maxTilt={10}
                perspective={800}
                wallColor="rgba(245, 158, 11, 0.08)"
                glowColor="rgba(245, 158, 11, 0.4)"
                glowOpacity={0.15}
                shadowIntensity={0.3}
                className="h-full flex-1"
              >
                <motion.div
                  className="h-full"
                  whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                >
                  <Card className="h-full overflow-hidden border-border">
                    <CardContent className="pt-6 p-5">
                      <motion.div 
                        className="h-16 w-16 mx-auto rounded-full bg-gradient-to-br from-amber-500/10 to-amber-700/5 flex items-center justify-center mb-4 shadow-sm"
                        whileHover={{ rotate: 10, scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        {getIcon(cert.icon)}
                      </motion.div>
                      <h4 className="font-medium text-center">{cert.title}</h4>
                      <p className="text-sm text-muted-foreground text-center mt-2">{cert.provider}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              </ThreeDBox>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

export default SkillsSection;