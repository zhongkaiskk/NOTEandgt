import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Trash2 } from 'lucide-react';
import { Section } from '../../types/notes';
import { DragHandle } from '../DragHandle';

interface SortableSectionProps {
  section: Section;
  isSelected: boolean;
  onSelect: () => void;
  onDelete: () => void;
}

export function SortableSection({ 
  section, 
  isSelected, 
  onSelect, 
  onDelete 
}: SortableSectionProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: section.title });

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
        onClick={onSelect}
        className="flex-1 text-left text-sm font-normal"
      >
        {section.title}
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
        className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
        aria-label="Delete section"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
}