import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Trash2 } from 'lucide-react';
import { Note } from '../../types/notes';
import { DragHandle } from '../DragHandle';

interface SortableNoteProps {
  note: Note;
  isSelected: boolean;
  onSelect: (note: Note) => void;
  onDelete: (id: string) => void;
}

export function SortableNote({ note, isSelected, onSelect, onDelete }: SortableNoteProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: note.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`
        p-4 rounded-lg transition-all duration-300 flex items-center gap-3
        border border-gray-700/50
        ${isSelected 
          ? 'bg-gray-800 text-primary shadow-lg shadow-primary/10' 
          : 'bg-gray-800/50 text-gray-300 hover:bg-gray-800'}
      `}
    >
      <div {...attributes} {...listeners}>
        <DragHandle />
      </div>
      <button
        onClick={() => onSelect(note)}
        className="flex-1 text-left text-sm font-normal"
      >
        {note.title}
      </button>
      <button
        onClick={() => onDelete(note.id)}
        className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
        aria-label="Delete note"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
}