import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PROJECTS } from "@/lib/constants";
import { ExternalLink, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import ThreeDBox from "@/components/ui/3d-box";

export function PortfolioSection() {
  const [selectedProject, setSelectedProject] = useState<typeof PROJECTS[0] | null>(null);
  
  return (
    <section id="portfolio" className="py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative"
      >
        <h2 className="section-title bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent inline-block">Portfolio</h2>
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-amber-500/5 to-amber-700/5 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-10">
          {PROJECTS.map((project, index) => (
            <div key={index} className="h-full">
              <ThreeDBox
                className="h-full"
                depth={30}
                maxTilt={15}
                perspective={1000}
                wallColor="rgba(245, 158, 11, 0.1)"
                glowColor="rgba(245, 158, 11, 0.35)"
                glowOpacity={0.15}
                shadowIntensity={0.4}
                interactive={true}
              >
                <motion.div
                  className="card group cursor-pointer bg-card rounded-lg overflow-hidden border border-border hover:border-amber-500/30 transition-all duration-300 h-full"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="relative h-48 xs:h-52 sm:h-56 md:h-64 overflow-hidden bg-black">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                      style={{ imageRendering: 'crisp-edges' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-black shadow-lg transform transition-all duration-300 group-hover:scale-110">
                        <ExternalLink className="h-6 w-6" />
                      </span>
                    </div>
                  </div>
                  <div className="p-4 sm:p-6">
                    <h3 className="text-lg font-semibold mb-2 group-hover:bg-gradient-to-r group-hover:from-amber-400 group-hover:to-amber-600 group-hover:bg-clip-text group-hover:text-transparent transition-all">{project.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.slice(0, 3).map((tech, techIndex) => (
                        <Badge key={techIndex} variant="outline" className="bg-gradient-to-r from-amber-500/10 to-amber-600/10 border-amber-500/20 text-amber-500 text-xs">
                          {tech}
                        </Badge>
                      ))}
                      {project.technologies.length > 3 && (
                        <Badge variant="outline" className="bg-gradient-to-r from-amber-600/10 to-amber-700/10 border-amber-600/20 text-amber-500 text-xs">
                          +{project.technologies.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>
                </motion.div>
              </ThreeDBox>
            </div>
          ))}
        </div>
      </motion.div>
      
      {/* Project Detail Modal */}
      <Dialog 
        open={selectedProject !== null} 
        onOpenChange={(open) => !open && setSelectedProject(null)}
      >
        <DialogContent className="sm:max-w-[600px] bg-card text-foreground">
          {selectedProject && (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl font-semibold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
                  {selectedProject.title}
                </DialogTitle>
              </DialogHeader>
              
              <ThreeDBox
                className="mt-4"
                depth={20}
                maxTilt={5}
                perspective={1200}
                wallColor="rgba(245, 158, 11, 0.1)"
                glowColor="rgba(245, 158, 11, 0.35)"
                glowOpacity={0.2}
              >
                <div className="relative h-64 overflow-hidden bg-black rounded-md">
                  <img 
                    src={selectedProject.image} 
                    alt={selectedProject.title}
                    className="w-full h-full object-contain"
                    style={{ imageRendering: 'crisp-edges' }}
                  />
                </div>
              </ThreeDBox>
              
              <DialogDescription className="text-muted-foreground mt-4">
                {selectedProject.description}
              </DialogDescription>
              
              <div className="mt-4">
                <h4 className="text-sm font-medium mb-2">Technologies:</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.technologies.map((tech, index) => (
                    <Badge key={index} variant="outline" className="bg-gradient-to-r from-amber-500/10 to-amber-600/10 border-amber-500/20 text-amber-500">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <DialogFooter className="mt-6">
                <Button 
                  onClick={() => window.open(selectedProject.link, '_blank')}
                  className="bg-gradient-to-r from-amber-400 to-amber-600 text-black hover:from-amber-500 hover:to-amber-700"
                >
                  Visit Project <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}

export default PortfolioSection;