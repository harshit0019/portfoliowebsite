import { motion } from "framer-motion";
import { EDUCATION, EXPERIENCE, SKILLS } from "@/lib/constants";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DownloadIcon } from "lucide-react";
import SkillSparkle from "@/components/SkillSparkle";
import ThreeDBox from "@/components/ui/3d-box";

export function ResumeSection() {
  const downloadResume = () => {
    // Open the file in a new tab, which will prompt download
    window.open('/files/harshit-yadav-resume.pdf', '_blank');
  };

  return (
    <section id="resume" className="py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative"
      >
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-gradient-to-tr from-amber-500/10 to-amber-700/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="flex justify-between items-center relative z-10">
          <h2 className="section-title bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent inline-block">Resume</h2>
          <Button 
            onClick={downloadResume}
            className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white"
          >
            <DownloadIcon className="mr-2 h-4 w-4" /> Download CV
          </Button>
        </div>
        
        {/* Education */}
        <div className="mt-10 relative z-10">
          <h3 className="section-subtitle bg-gradient-to-r from-amber-400/80 to-amber-600/80 bg-clip-text text-transparent inline-block">Education</h3>
          <div className="space-y-6 mt-6">
            {EDUCATION.map((education, index) => (
              <div key={index} className="mb-6 h-full flex flex-col">
                <ThreeDBox
                  depth={20}
                  maxTilt={10}
                  perspective={800}
                  wallColor="rgba(245, 158, 11, 0.08)"
                  glowColor="rgba(245, 158, 11, 0.35)"
                  glowOpacity={0.15}
                  className="h-full flex-1"
                >
                  <motion.div
                    className="card p-6 bg-card border border-amber-500/20 rounded-lg"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <div className="flex justify-between flex-wrap gap-2 mb-2">
                      <h4 className="text-lg font-semibold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">{education.degree}</h4>
                      <span className="text-amber-500 text-sm px-3 py-1 rounded-full bg-gradient-to-r from-amber-500/10 to-amber-600/10 border border-amber-500/20">
                        {education.period}
                      </span>
                    </div>
                    <p className="text-muted-foreground mb-1">{education.institution}</p>
                    {education.campus && (
                      <p className="text-muted-foreground text-sm">{education.campus}</p>
                    )}
                    <p className="text-amber-500 text-sm mt-2">{education.score}</p>
                  </motion.div>
                </ThreeDBox>
              </div>
            ))}
          </div>
        </div>
        
        {/* Experience */}
        <div className="mt-12 relative z-10">
          <h3 className="section-subtitle bg-gradient-to-r from-amber-400/80 to-amber-600/80 bg-clip-text text-transparent inline-block">Experience</h3>
          <div className="space-y-6 mt-6">
            {EXPERIENCE.map((job, index) => (
              <div key={index} className="mb-6 h-full flex flex-col">
                <ThreeDBox
                  depth={20}
                  maxTilt={10}
                  perspective={800}
                  wallColor="rgba(245, 158, 11, 0.08)"
                  glowColor="rgba(245, 158, 11, 0.35)"
                  glowOpacity={0.15}
                  className="h-full flex-1"
                >
                  <motion.div
                    className="card p-6 bg-card border border-amber-500/20 rounded-lg"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <div className="flex justify-between flex-wrap gap-2 mb-2">
                      <h4 className="text-lg font-semibold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">{job.title}</h4>
                      <span className="text-amber-500 text-sm px-3 py-1 rounded-full bg-gradient-to-r from-amber-500/10 to-amber-600/10 border border-amber-500/20">
                        {job.period}
                      </span>
                    </div>
                    <p className="text-amber-500 font-medium mb-4 bg-gradient-to-r from-amber-400/90 to-amber-600/90 bg-clip-text text-transparent">{job.company}</p>
                    <ul className="list-disc pl-5 space-y-2 mb-4">
                      {job.responsibilities.map((item, respIndex) => (
                        <li key={respIndex} className="text-muted-foreground text-sm">
                          {item}
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {job.technologies.map((tech, techIndex) => (
                        <SkillSparkle key={techIndex}>
                          <Badge variant="outline" className="bg-gradient-to-r from-amber-500/10 to-amber-600/10 border border-amber-500/20 text-amber-500">
                            {tech}
                          </Badge>
                        </SkillSparkle>
                      ))}
                    </div>
                  </motion.div>
                </ThreeDBox>
              </div>
            ))}
          </div>
        </div>
        
        {/* Skills */}
        <div className="mt-12 relative z-10">
          <div className="absolute top-10 right-0 w-64 h-64 bg-gradient-to-bl from-amber-500/10 to-amber-700/5 rounded-full blur-3xl pointer-events-none"></div>
          <h3 className="section-subtitle bg-gradient-to-r from-amber-400/80 to-amber-600/80 bg-clip-text text-transparent inline-block">Skills</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {SKILLS.map((category, index) => (
              <div key={index} className="mb-6 h-full flex flex-col">
                <ThreeDBox
                  depth={20}
                  maxTilt={10}
                  perspective={800}
                  wallColor="rgba(245, 158, 11, 0.08)"
                  glowColor="rgba(245, 158, 11, 0.35)"
                  glowOpacity={0.15}
                  className="h-full flex-1"
                >
                  <motion.div
                    className="card p-6 bg-card border border-amber-500/20 rounded-lg"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <h4 className="text-lg font-medium mb-4 bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent inline-block">{category.category}</h4>
                    <div className="space-y-4">
                      {category.skills.map((skill, skillIndex) => (
                        <div key={skillIndex}>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-muted-foreground">{skill.name}</span>
                            <span className="text-amber-500">{skill.proficiency}%</span>
                          </div>
                          <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                            <motion.div 
                              className="h-full bg-gradient-to-r from-amber-400 to-amber-600"
                              initial={{ width: 0 }}
                              animate={{ width: `${skill.proficiency}%` }}
                              transition={{ duration: 1, delay: 0.5 }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </ThreeDBox>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export default ResumeSection;