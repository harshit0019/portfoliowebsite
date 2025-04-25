import { Button } from "@/components/ui/button";
import { PERSONAL_INFO } from "@/lib/constants";
import { Github, Linkedin, Mail, Phone } from "lucide-react";
import { motion } from "framer-motion";

export function HeroSection() {
  return (
    <section id="about" className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div 
          className="animate-on-scroll"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Hi, I'm <span className="text-primary">{PERSONAL_INFO.name}</span>
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-gray-700">
            {PERSONAL_INFO.title}
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            A Computer Science graduate with expertise in Python development, data analysis, and 
            sustainability-focused software solutions. Currently working at RMX Joss, developing 
            carbon emissions tracking software and implementing data automation solutions.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button asChild size="lg">
              <a href="#contact">Get In Touch</a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="#projects">View Projects</a>
            </Button>
          </div>
          
          <div className="flex mt-8 space-x-4">
            <a 
              href={`https://github.com/${PERSONAL_INFO.github}`} 
              target="_blank" 
              rel="noreferrer" 
              className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-br from-amber-700 to-amber-900 text-amber-400 hover:shadow-lg hover:shadow-amber-500/20 transition-all duration-300"
            >
              <Github size={22} />
            </a>
            <a 
              href={`https://www.linkedin.com/in/${PERSONAL_INFO.linkedin}`} 
              target="_blank" 
              rel="noreferrer" 
              className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-br from-amber-700 to-amber-900 text-amber-400 hover:shadow-lg hover:shadow-amber-500/20 transition-all duration-300"
            >
              <Linkedin size={22} />
            </a>
            <a 
              href={`mailto:${PERSONAL_INFO.email}`} 
              className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-br from-amber-700 to-amber-900 text-amber-400 hover:shadow-lg hover:shadow-amber-500/20 transition-all duration-300"
            >
              <Mail size={22} />
            </a>
          </div>
        </motion.div>
        
        <motion.div 
          className="justify-self-center lg:justify-self-end animate-on-scroll"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="relative group">
            <div className="profile-glow"></div>
            <div 
              className="profile-image-container w-64 h-64 sm:w-80 sm:h-80 rounded-full overflow-hidden border-4 border-white shadow-xl 
              bg-gradient-to-br from-amber-500/20 to-amber-700/10 transition-all duration-300
              group-hover:border-amber-500/70 group-hover:shadow-amber-500/30 group-hover:shadow-2xl"
            >
              <img 
                src="/images/profile-image.png" 
                alt={PERSONAL_INFO.name}
                className="w-full h-full object-cover object-center transition-transform duration-500 
                  group-hover:scale-[1.03] image-rendering-crisp"
                loading="eager"
                style={{ 
                  filter: 'contrast(1.15) brightness(1.08) saturate(1.08)',
                  imageRendering: 'crisp-edges'
                } as React.CSSProperties}
              />
            </div>
            <div 
              className="absolute -bottom-4 -right-4 bg-white rounded-full p-4 shadow-lg
              transition-all duration-300 group-hover:shadow-xl"
            >
              <div className="w-16 h-16 rounded-full gradient-bg flex items-center justify-center">
                <span className="text-white font-bold text-sm">3+ Years</span>
              </div>
            </div>
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-500/0 to-amber-700/0 
              group-hover:from-amber-500/10 group-hover:to-amber-700/20 transition-all duration-500 
              pointer-events-none -z-10 scale-110 group-hover:scale-130 opacity-0 group-hover:opacity-100"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default HeroSection;
