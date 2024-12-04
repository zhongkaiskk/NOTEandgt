import { Menu, Settings } from 'lucide-react';

interface HeaderProps {
  onMenuClick: () => void;
  onAdminClick: () => void;
}

export function Header({ onMenuClick, onAdminClick }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 h-header bg-gray-900/80 backdrop-blur-md border-b border-gray-800 z-50">
      <div className="max-w-7xl mx-auto px-4 h-full flex justify-between items-center">
        <div className="flex items-center gap-4">
          <button 
            onClick={onMenuClick} 
            className="btn-secondary md:hidden"
            aria-label="Toggle menu"
          >
            <Menu className="w-5 h-5" />
          </button>
          <h1 className="text-header font-bold bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
            All Notes
          </h1>
        </div>
        
        <button 
          onClick={onAdminClick}
          className="btn-primary text-menu"
          aria-label="Admin panel"
        >
          <Settings className="w-5 h-5" />
          <span className="hidden md:inline font-bold">Admin</span>
        </button>
      </div>
    </header>
  );
}