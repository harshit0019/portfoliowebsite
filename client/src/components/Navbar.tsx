import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Download } from "lucide-react";
import { Link } from "wouter";
import { downloadResume } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { PERSONAL_INFO } from "@/lib/constants";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const navLinks = [
    { href: "#about", label: "About" },
    { href: "#education", label: "Education" },
    { href: "#skills", label: "Skills" },
    { href: "#projects", label: "Projects" },
    { href: "#experience", label: "Experience" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <nav className={cn(
      "fixed w-full bg-white bg-opacity-90 backdrop-blur-sm z-50 transition-all duration-300",
      scrolled ? "shadow-md" : ""
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <span className="text-2xl font-bold text-primary">{PERSONAL_INFO.name}</span>
          </div>
          
          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-gray-900 hover:text-primary font-medium transition-colors"
              >
                {link.label}
              </a>
            ))}
            <Button onClick={downloadResume} variant="default" className="flex items-center gap-2">
              <Download size={16} /> Resume
            </Button>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Button variant="ghost" size="icon" onClick={toggleMenu} aria-label="Menu">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-md">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100"
                onClick={closeMenu}
              >
                {link.label}
              </a>
            ))}
            <Button
              onClick={() => {
                downloadResume();
                closeMenu();
              }}
              variant="default"
              className="w-full mt-2 justify-center"
            >
              <Download size={16} className="mr-2" /> Resume
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
