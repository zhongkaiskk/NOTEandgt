import { useState } from 'react';
import { Header } from './components/Layout/Header';
import { Sidebar } from './components/Layout/Sidebar';
import { NoteContent } from './components/Notes/NoteContent';
import { CopyNotification } from './components/UI/CopyNotification';
import { AnimatedContainer } from './components/UI/AnimatedContainer';
import { Admin } from './pages/Admin';
import { NoteType } from './types/notes';
import { useNotes } from './hooks/useNotes';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showCopyNotification, setShowCopyNotification] = useState(false);
  const [activeNoteId, setActiveNoteId] = useState<NoteType>('note');
  const [isAdmin, setIsAdmin] = useState(false);

  const {
    notes,
    handleSave
  } = useNotes();

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setShowCopyNotification(true);
    setTimeout(() => setShowCopyNotification(false), 2000);
  };

  const handleNoteSelect = (noteId: NoteType) => {
    setActiveNoteId(noteId);
    setIsSidebarOpen(false);
  };

  const activeNote = notes.find(note => note.id === activeNoteId) || notes[0];

  if (isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
        <Header 
          onMenuClick={() => setIsSidebarOpen(true)} 
          onAdminClick={() => setIsAdmin(false)}
        />
        <div className="pt-header">
          <Admin />
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <Header 
        onMenuClick={() => setIsSidebarOpen(true)} 
        onAdminClick={() => setIsAdmin(true)}
      />
      
      <div className="flex-1 pt-header flex">
        <Sidebar 
          isOpen={isSidebarOpen}
          notes={notes}
          activeNoteId={activeNoteId}
          onNoteSelect={handleNoteSelect}
        />

        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          <AnimatedContainer animation="fade-in">
            <NoteContent 
              note={activeNote}
              onCopy={handleCopy}
            />
          </AnimatedContainer>
        </main>
      </div>

      <CopyNotification show={showCopyNotification} />
    </div>
  );
}

export default App;