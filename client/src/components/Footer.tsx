import { PERSONAL_INFO } from "@/lib/constants";
import { Github, Linkedin, Mail, Phone } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <span className="text-2xl font-bold">{PERSONAL_INFO.name}</span>
            <p className="text-gray-400 mt-2">{PERSONAL_INFO.title}</p>
          </div>
          
          <div className="flex space-x-6">
            <a 
              href={`https://www.linkedin.com/in/${PERSONAL_INFO.linkedin}`} 
              target="_blank" 
              rel="noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Linkedin className="w-6 h-6" />
            </a>
            <a 
              href={`https://github.com/${PERSONAL_INFO.github}`} 
              target="_blank" 
              rel="noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Github className="w-6 h-6" />
            </a>
            <a 
              href={`mailto:${PERSONAL_INFO.email}`} 
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Mail className="w-6 h-6" />
            </a>
            <a 
              href={`tel:${PERSONAL_INFO.phone}`} 
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Phone className="w-6 h-6" />
            </a>
          </div>
        </div>
        
        <hr className="border-gray-800 my-8" />
        
        <div className="text-center text-gray-500 text-sm">
          <p>&copy; {currentYear} {PERSONAL_INFO.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
