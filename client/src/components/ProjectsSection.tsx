import { motion } from "framer-motion";
import { PROJECTS } from "@/lib/constants";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function ProjectsSection() {
  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-white">
      <motion.div 
        className="text-center mb-16 animate-on-scroll"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="section-title">Projects</h2>
        <div className="section-divider"></div>
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {PROJECTS.map((project, index) => (
          <motion.div 
            key={index}
            className="card bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl animate-on-scroll"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
          >
            <div className="h-64 overflow-hidden">
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">{project.title}</h3>
              <p className="text-gray-600 mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {project.technologies.map((tech, techIndex) => (
                  <Badge key={techIndex} variant="secondary" className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                    {tech}
                  </Badge>
                ))}
              </div>
              <a 
                href={project.link} 
                className="inline-flex items-center font-medium text-primary hover:text-blue-700"
              >
                Visit Project <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default ProjectsSection;
