import { MessageSquare, MessageCircle } from 'lucide-react';
import { Note } from '../../types/notes';
import { AnimatedContainer } from '../UI/AnimatedContainer';

interface SidebarProps {
  isOpen: boolean;
  notes: Note[];
  activeNoteId: string | null;
  onNoteSelect: (noteId: string) => void;
}

export function Sidebar({ isOpen, notes, activeNoteId, onNoteSelect }: SidebarProps) {
  const getIcon = (noteId: string) => {
    switch (noteId) {
      case 'note':
        return <MessageSquare className="w-5 h-5" />;
      case 'greeting':
        return <MessageCircle className="w-5 h-5" />;
      default:
        return <MessageSquare className="w-5 h-5" />;
    }
  };

  return (
    <aside 
      className={`
        fixed md:static inset-y-0 left-0 w-sidebar
        bg-gray-900/80 backdrop-blur-md border-r border-gray-800
        transform transition-transform duration-300 ease-out z-40
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}
    >
      <div className="h-full pt-header pb-6 overflow-y-auto">
        <AnimatedContainer animation="slide-in" className="p-4">
          <h2 className="text-title font-bold mb-4 text-gray-300">Notes</h2>
          <div className="space-y-2">
            {notes.map((note) => (
              <button
                key={note.id}
                onClick={() => onNoteSelect(note.id)}
                className={`
                  w-full p-3 rounded-lg transition-all duration-300
                  flex items-center gap-3 active:scale-95 text-menu font-bold
                  ${activeNoteId === note.id 
                    ? 'bg-gray-800 text-primary shadow-lg shadow-primary/10' 
                    : 'hover:bg-gray-800/50 text-gray-300'}
                `}
              >
                {getIcon(note.id)}
                <span>{note.title}</span>
              </button>
            ))}
          </div>
        </AnimatedContainer>
      </div>
    </aside>
  );
}