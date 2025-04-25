import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Sparkles, Network, Layers, Waves } from "lucide-react";

interface BackgroundSwitcherProps {
  currentType: 'particles' | 'constellation' | 'both' | 'waves' | 'all';
  onChange: (type: 'particles' | 'constellation' | 'both' | 'waves' | 'all') => void;
}

export function BackgroundSwitcher({ currentType, onChange }: BackgroundSwitcherProps) {
  return (
    <motion.div 
      className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.5 }}
    >
      <span className="text-xs text-muted-foreground bg-black/50 backdrop-blur-sm px-2 py-1 rounded-md mb-1">
        Try different background effects
      </span>
      <div className="flex gap-2">
        <Button
          variant={currentType === 'particles' ? 'default' : 'outline'}
          size="icon"
          onClick={() => onChange('particles')}
          className="w-10 h-10 rounded-full bg-card border border-border hover:bg-card hover:border-amber-500/50 transition-all"
          title="Particles Background"
        >
          <Sparkles size={18} className={currentType === 'particles' ? 'text-white' : 'text-muted-foreground'} />
        </Button>
        
        <Button
          variant={currentType === 'constellation' ? 'default' : 'outline'}
          size="icon"
          onClick={() => onChange('constellation')}
          className="w-10 h-10 rounded-full bg-card border border-border hover:bg-card hover:border-amber-500/50 transition-all"
          title="Constellation Background"
        >
          <Network size={18} className={currentType === 'constellation' ? 'text-white' : 'text-muted-foreground'} />
        </Button>
        
        <Button
          variant={currentType === 'waves' ? 'default' : 'outline'}
          size="icon"
          onClick={() => onChange('waves')}
          className="w-10 h-10 rounded-full bg-card border border-border hover:bg-card hover:border-amber-500/50 transition-all"
          title="Wave Background"
        >
          <Waves size={18} className={currentType === 'waves' ? 'text-white' : 'text-muted-foreground'} />
        </Button>
        
        <Button
          variant={currentType === 'both' ? 'default' : 'outline'}
          size="icon"
          onClick={() => onChange('both')}
          className="w-10 h-10 rounded-full bg-card border border-border hover:bg-card hover:border-amber-500/50 transition-all"
          title="Particles & Constellation"
        >
          <Layers size={18} className={currentType === 'both' ? 'text-white' : 'text-muted-foreground'} />
        </Button>
        
        <Button
          variant={currentType === 'all' ? 'default' : 'outline'}
          size="icon"
          onClick={() => onChange('all')}
          className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500/30 to-amber-700/30 border border-amber-500/50 hover:from-amber-500/40 hover:to-amber-700/40 hover:border-amber-500/60 transition-all"
          title="All Backgrounds"
        >
          <Sparkles size={18} className={currentType === 'all' ? 'text-white' : 'text-muted-foreground'} />
        </Button>
      </div>
    </motion.div>
  );
}

export default BackgroundSwitcher;