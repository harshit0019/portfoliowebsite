import { motion } from "framer-motion";
import { EXPERIENCE } from "@/lib/constants";
import { Badge } from "@/components/ui/badge";
import ThreeDBox from "@/components/ui/3d-box";

export function ExperienceSection() {
  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div 
        className="text-center mb-16 animate-on-scroll"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="section-title">Work Experience</h2>
        <div className="section-divider"></div>
      </motion.div>
      
      <div className="max-w-4xl mx-auto">
        {EXPERIENCE.map((job, index) => (
          <div key={index} className="mb-10 animate-on-scroll h-full flex flex-col">
            <ThreeDBox
              depth={25}
              maxTilt={8}
              perspective={1200}
              wallColor="rgba(245, 158, 11, 0.1)"
              glowColor="rgba(245, 158, 11, 0.4)"
              glowOpacity={0.15}
              className="h-full flex-1"
            >
              <motion.div 
                className="bg-card p-8 rounded-xl border border-amber-500/20"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                  <div>
                    <h3 className="text-xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">{job.title}</h3>
                    <p className="text-lg font-medium text-muted-foreground">{job.company}</p>
                  </div>
                  <div className="mt-2 md:mt-0">
                    <span className="bg-gradient-to-r from-amber-500/10 to-amber-700/10 text-amber-500 px-4 py-1 rounded-full font-medium border border-amber-500/20">
                      {job.period}
                    </span>
                  </div>
                </div>
                
                <ul className="space-y-4 text-muted-foreground">
                  {job.responsibilities.map((responsibility, respIndex) => (
                    <li key={respIndex} className="flex">
                      <div className="flex-shrink-0 mr-3 mt-1">
                        <div className="w-4 h-4 rounded-full bg-gradient-to-br from-amber-400 to-amber-600"></div>
                      </div>
                      <p>{responsibility}</p>
                    </li>
                  ))}
                </ul>
                
                <div className="mt-8 flex flex-wrap gap-2">
                  {job.technologies.map((tech, techIndex) => (
                    <Badge key={techIndex} variant="outline" className="bg-gradient-to-r from-amber-500/10 to-amber-600/10 border-amber-500/20 text-amber-500">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </motion.div>
            </ThreeDBox>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ExperienceSection;
