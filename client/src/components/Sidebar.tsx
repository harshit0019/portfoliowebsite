import { useState, useEffect } from "react";
import { PERSONAL_INFO } from "@/lib/constants";
import { 
  Mail, 
  Menu,
  X,
  Github,
  Linkedin,
  Download
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { downloadResume } from "@/lib/utils";

interface SidebarProps {
  setActiveSection: (section: string) => void;
  activeSection: string;
}

export function Sidebar({ setActiveSection, activeSection }: SidebarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const sidebar = document.getElementById('sidebar');
      const menuButton = document.getElementById('menu-button');
      
      if (
        isMobileMenuOpen && 
        sidebar && 
        menuButton && 
        !sidebar.contains(event.target as Node) && 
        !menuButton.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen]);
  
  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMobileMenuOpen]);
  
  const handleNavClick = (sectionId: string) => {
    setActiveSection(sectionId);
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };
  
  const navItems = [
    { id: "about", label: "About" },
    { id: "resume", label: "Resume" },
    { id: "portfolio", label: "Portfolio" },
    { id: "contact", label: "Contact" }
  ];
  
  return (
    <>
      {/* Mobile menu toggle */}
      <div className="fixed top-4 right-4 z-50 lg:hidden">
        <Button 
          id="menu-button"
          variant="outline" 
          size="icon" 
          className="bg-card text-primary border-primary"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
        </Button>
      </div>
      
      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" />
      )}
      
      {/* Sidebar content */}
      <aside 
        id="sidebar"
        className={`sidebar z-40 transition-all duration-300 fixed lg:static 
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} 
          lg:h-screen lg:sticky lg:top-0 overflow-y-auto max-h-screen`}
      >
        <div className="flex flex-col justify-between h-full p-5">
          <div className="space-y-8">
            {/* Profile */}
            <div className="text-center">
              <div className="mx-auto w-32 h-32 mb-4 rounded-full overflow-hidden border-2 border-amber-400/50 shadow-lg relative group">
                <img 
                  src="/images/profile-image.png" 
                  alt="Harshit Yadav" 
                  className="w-full h-full object-cover"
                  loading="eager"
                  style={{ imageRendering: 'crisp-edges' }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-amber-400/0 to-amber-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <h1 className="text-xl font-bold mt-4 bg-gradient-to-r from-amber-400/90 to-amber-500/90 bg-clip-text text-transparent">{PERSONAL_INFO.name}</h1>
              <p className="text-primary text-sm mt-1 font-medium">{PERSONAL_INFO.title}</p>
              
              {/* Social Links */}
              <div className="flex justify-center mt-6 space-x-6">
                <a 
                  href={`https://github.com/${PERSONAL_INFO.github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-amber-800/30 hover:bg-amber-700/40 transition-all transform hover:-translate-y-1 duration-300 shadow-md"
                  aria-label="GitHub Profile"
                >
                  <Github size={18} className="text-amber-400" />
                </a>
                <a 
                  href={`https://www.linkedin.com/in/${PERSONAL_INFO.linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-amber-800/30 hover:bg-amber-700/40 transition-all transform hover:-translate-y-1 duration-300 shadow-md"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin size={18} className="text-amber-400" />
                </a>
                <a 
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-amber-800/30 hover:bg-amber-700/40 transition-all transform hover:-translate-y-1 duration-300 shadow-md"
                  aria-label="Email"
                >
                  <Mail size={18} className="text-amber-400" />
                </a>
              </div>
            </div>
            
            {/* Navigation */}
            <nav>
              <ul className="space-y-3">
                {navItems.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => handleNavClick(item.id)}
                      className={`py-3 px-4 w-full text-left rounded-md transition-colors ${
                        activeSection === item.id 
                          ? 'bg-secondary text-primary font-medium' 
                          : 'text-gray-300 hover:bg-secondary/50'
                      }`}
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          
          <div className="space-y-6 mt-auto">
            {/* Download CV Button */}
            <div className="mt-8">
              <Button 
                onClick={downloadResume} 
                className="w-full py-6 bg-gradient-to-r from-amber-400/90 to-amber-500/90 hover:from-amber-500/90 hover:to-amber-600/90 text-black font-semibold rounded-lg shadow-md transform transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2"
              >
                <Download size={18} />
                Download CV
              </Button>
            </div>
            
            {/* Copyright */}
            <div className="text-xs text-center text-muted-foreground py-4">
              <p>© {new Date().getFullYear()} {PERSONAL_INFO.name}</p>
              <p className="mt-1">All Rights Reserved</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;