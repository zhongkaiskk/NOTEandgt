import { Plus } from 'lucide-react';
import { Note, Section } from '../../types/notes';
import { SortableSection } from './SortableSection';
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

interface SectionsListProps {
  selectedNote: Note;
  selectedSection: Section | null;
  newTitle: string;
  onTitleChange: (title: string) => void;
  onAddSection: () => void;
  onDeleteSection: (sectionTitle: string) => void;
  onSelectSection: (section: Section) => void;
  onReorderSections?: (oldIndex: number, newIndex: number) => void;
}

export function SectionsList({
  selectedNote,
  selectedSection,
  newTitle,
  onTitleChange,
  onAddSection,
  onDeleteSection,
  onSelectSection,
  onReorderSections
}: SectionsListProps) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    
    if (active.id !== over.id && onReorderSections) {
      const oldIndex = selectedNote.sections.findIndex(section => section.title === active.id);
      const newIndex = selectedNote.sections.findIndex(section => section.title === over.id);
      onReorderSections(oldIndex, newIndex);
    }
  };

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-medium text-gray-200">Sections</h2>
        <div className="flex gap-2">
          <input
            type="text"
            value={newTitle}
            onChange={(e) => onTitleChange(e.target.value)}
            placeholder="New section title"
            className="input text-sm"
          />
          <button
            onClick={onAddSection}
            className="btn-primary"
            aria-label="Add section"
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
          items={selectedNote.sections.map(section => section.title)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-2">
            {selectedNote.sections.map((section) => (
              <SortableSection
                key={section.title}
                section={section}
                isSelected={selectedSection?.title === section.title}
                onSelect={() => onSelectSection(section)}
                onDelete={() => onDeleteSection(section.title)}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}