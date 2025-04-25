import { motion } from "framer-motion";
import { PERSONAL_INFO } from "@/lib/constants";
import { 
  Code,
  Monitor,
  BarChart, 
  Bot
} from "lucide-react";
import ThreeDBox from "@/components/ui/3d-box";

export function AboutSection() {
  const services = [
    {
      icon: <Code className="w-10 h-10 text-primary" />,
      title: "Programming & Database",
      description: "Python development with FastAPI and SQL databases like PostgreSQL and MSSQL."
    },
    {
      icon: <Monitor className="w-10 h-10 text-primary" />,
      title: "Front-End Development",
      description: "HTML, CSS with Tailwind CSS, and UI frameworks like Streamlit and PyQt."
    },
    {
      icon: <BarChart className="w-10 h-10 text-primary" />,
      title: "Data Analysis & Visualization",
      description: "Power BI dashboards, Excel analysis and Google Sheets automation."
    },
    {
      icon: <Bot className="w-10 h-10 text-primary" />,
      title: "AI & Sustainability",
      description: "Prompt engineering, AI integration, and carbon footprint tracking solutions."
    }
  ];

  return (
    <section id="about" className="py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative"
      >
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-gradient-to-br from-amber-500/10 to-amber-700/5 rounded-full blur-3xl pointer-events-none"></div>
        <h2 className="section-title bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent inline-block">About Me</h2>
        
        <ThreeDBox
          className="my-6 relative z-10"
          depth={30}
          maxTilt={6}
          perspective={1200}
          wallColor="rgba(245, 158, 11, 0.1)"
          glowColor="rgba(245, 158, 11, 0.4)"
          glowOpacity={0.15}
        >
          <div className="bg-card p-6 rounded-lg border border-amber-500/20">
            <p className="text-muted-foreground leading-relaxed">
              I'm a Computer Science graduate with a strong foundation in Python development, data analysis, and 
              sustainability-focused software solutions. Currently, I'm working at RMX Joss, where I develop 
              carbon emissions tracking software and implement data automation solutions to drive environmental 
              accountability and operational efficiency.
            </p>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              Outside of work, I do vibe coding and enjoy exploring areas like prompt engineering and Agentics AI. 
              I love gaming and experimenting with code across different domains—it's how I stay creative and push boundaries.
            </p>
          </div>
        </ThreeDBox>
        
        <h3 className="section-subtitle mt-10 bg-gradient-to-r from-amber-400/80 to-amber-600/80 bg-clip-text text-transparent inline-block">What I'm Doing</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {services.map((service, index) => (
            <div key={index}>
              <ThreeDBox
                className="h-full"
                depth={20}
                maxTilt={10}
                perspective={1000}
                wallColor="rgba(245, 158, 11, 0.08)"
                glowColor="rgba(245, 158, 11, 0.35)"
                glowOpacity={0.15}
                shadowIntensity={0.4}
              >
                <motion.div
                  className="service-card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <div className="flex-shrink-0 rounded-full p-3 bg-gradient-to-br from-amber-500/20 to-amber-700/20 flex items-center justify-center shadow-lg">
                    {service.icon}
                  </div>
                  <div>
                    <h4 className="text-lg font-medium bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">{service.title}</h4>
                    <p className="text-muted-foreground text-sm mt-2">{service.description}</p>
                  </div>
                </motion.div>
              </ThreeDBox>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

export default AboutSection;