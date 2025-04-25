import { motion } from "framer-motion";
import { EDUCATION } from "@/lib/constants";
import { GraduationCap, School, BookOpen } from "lucide-react";
import ThreeDBox from "@/components/ui/3d-box";

const getIcon = (iconName: string) => {
  switch (iconName) {
    case 'graduation-cap':
      return <GraduationCap className="w-6 h-6" />;
    case 'school':
      return <School className="w-6 h-6" />;
    case 'book-reader':
      return <BookOpen className="w-6 h-6" />;
    default:
      return <GraduationCap className="w-6 h-6" />;
  }
};

export function EducationSection() {
  return (
    <section id="education" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div 
        className="text-center mb-16 animate-on-scroll"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="section-title bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent inline-block">Education</h2>
        <div className="section-divider"></div>
      </motion.div>
      
      <div className="max-w-3xl mx-auto">
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-0 md:left-1/2 top-0 h-full w-0.5 bg-gray-200 transform md:-translate-x-1/2"></div>
          
          {/* Education Items */}
          {EDUCATION.map((education, index) => (
            <motion.div 
              key={index}
              className={`relative flex flex-col md:flex-row items-center ${index !== EDUCATION.length - 1 ? 'mb-16' : ''} animate-on-scroll`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              {/* Left Content - odd items on desktop */}
              <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right md:pr-8' : 'md:pr-8'} order-2 ${index % 2 === 0 ? 'md:order-1' : 'md:order-1 md:invisible'}`}>
                {index % 2 === 0 && (
                  <ThreeDBox
                    depth={20}
                    maxTilt={10}
                    perspective={800}
                    wallColor="rgba(245, 158, 11, 0.08)"
                    glowColor="rgba(245, 158, 11, 0.35)"
                    glowOpacity={0.15}
                  >
                    <div className="bg-card p-4 rounded-lg border border-amber-500/20 text-right">
                      <h3 className="text-xl font-semibold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">{education.degree}</h3>
                      <p className="text-muted-foreground">{education.institution}{education.campus && `, ${education.campus}`}</p>
                      <p className="text-muted-foreground/80">{education.period}</p>
                      <p className="text-amber-500 font-medium">{education.score}</p>
                    </div>
                  </ThreeDBox>
                )}
              </div>
              
              {/* Circle Icon */}
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-white z-10 my-4 md:my-0 md:mx-0 order-1 md:order-2 shadow-md border border-amber-400/30">
                {getIcon(education.icon)}
              </div>
              
              {/* Right Content - even items on desktop */}
              <div className={`flex-1 ${index % 2 === 1 ? 'md:pl-8' : 'md:pl-8'} order-3 ${index % 2 === 1 ? 'md:order-3' : 'md:order-3 md:invisible'}`}>
                {index % 2 === 1 && (
                  <ThreeDBox
                    depth={20}
                    maxTilt={10}
                    perspective={800}
                    wallColor="rgba(245, 158, 11, 0.08)"
                    glowColor="rgba(245, 158, 11, 0.35)"
                    glowOpacity={0.15}
                  >
                    <div className="bg-card p-4 rounded-lg border border-amber-500/20">
                      <h3 className="text-xl font-semibold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">{education.degree}</h3>
                      <p className="text-muted-foreground">{education.institution}{education.campus && `, ${education.campus}`}</p>
                      <p className="text-muted-foreground/80">{education.period}</p>
                      <p className="text-amber-500 font-medium">{education.score}</p>
                    </div>
                  </ThreeDBox>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default EducationSection;
