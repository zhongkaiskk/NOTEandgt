import { NoteSection } from './NoteSection';
import { NoteItem } from './NoteItem';
import { Note } from '../../types/notes';
import { AnimatedElement } from '../UI/AnimatedElement';
import { SearchBar } from '../Search/SearchBar';
import { useSearch } from '../../hooks/useSearch';

interface NoteContentProps {
  note: Note;
  onCopy: (text: string) => void;
}

export function NoteContent({ note, onCopy }: NoteContentProps) {
  const { searchQuery, setSearchQuery, filterMessages } = useSearch();
  const filteredSections = filterMessages(note.sections);

  return (
    <div className="max-w-4xl mx-auto">
      <AnimatedElement animation="slideUp">
        <h1 className="text-header font-bold mb-8 bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
          {note.title}
        </h1>

        <div className="mb-8">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search messages..."
          />
        </div>
        
        <div className="space-y-12">
          {filteredSections.map((section, index) => (
            <NoteSection key={index} title={section.title}>
              {section.messages.map((message, msgIndex) => (
                <NoteItem 
                  key={msgIndex}
                  text={message}
                  onCopy={onCopy}
                  searchQuery={searchQuery}
                />
              ))}
            </NoteSection>
          ))}
          
          {filteredSections.length === 0 && searchQuery && (
            <AnimatedElement animation="fadeIn">
              <div className="text-center py-12">
                <p className="text-gray-400 text-lg">No messages found matching "{searchQuery}"</p>
              </div>
            </AnimatedElement>
          )}
        </div>
      </AnimatedElement>
    </div>
  );
}