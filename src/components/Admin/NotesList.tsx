import { Plus } from 'lucide-react';
import { Note } from '../../types/notes';
import { SortableNote } from './SortableNote';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { AnimatedContainer } from '../UI/AnimatedContainer';

interface NotesListProps {
  notes: Note[];
  selectedNote: Note | null;
  newTitle: string;
  onTitleChange: (title: string) => void;
  onAddNote: () => void;
  onDeleteNote: (noteId: string) => void;
  onSelectNote: (note: Note) => void;
  onReorderNotes: (oldIndex: number, newIndex: number) => void;
}

export function NotesList({
  notes,
  selectedNote,
  newTitle,
  onTitleChange,
  onAddNote,
  onDeleteNote,
  onSelectNote,
  onReorderNotes,
}: NotesListProps) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    
    if (active.id !== over.id) {
      const oldIndex = notes.findIndex(note => note.id === active.id);
      const newIndex = notes.findIndex(note => note.id === over.id);
      onReorderNotes(oldIndex, newIndex);
    }
  };

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-medium text-gray-200">Notes</h2>
        <div className="flex gap-2">
          <input
            type="text"
            value={newTitle}
            onChange={(e) => onTitleChange(e.target.value)}
            placeholder="New note title"
            className="input text-sm"
          />
          <button
            onClick={onAddNote}
            disabled={!newTitle.trim()}
            className="btn-primary"
            aria-label="Add note"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={notes.map(note => note.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-2">
            {notes.map((note) => (
              <AnimatedContainer
                key={note.id}
                animation="slide-up"
              >
                <SortableNote
                  note={note}
                  isSelected={selectedNote?.id === note.id}
                  onSelect={onSelectNote}
                  onDelete={onDeleteNote}
                />
              </AnimatedContainer>
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}