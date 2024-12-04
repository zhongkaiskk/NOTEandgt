import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Note } from '../types/notes';
import { loadNotesFromStorage, saveNotesToStorage } from '../utils/storage';
import { notes as initialNotes } from '../data/notes';

interface NotesContextType {
  notes: Note[];
  updateNotes: (notes: Note[]) => Promise<void>;
}

const NotesContext = createContext<NotesContextType | undefined>(undefined);

export function NotesProvider({ children }: { children: ReactNode }) {
  const [notes, setNotes] = useState<Note[]>(() => {
    const storedNotes = loadNotesFromStorage();
    return storedNotes || initialNotes;
  });

  const updateNotes = async (newNotes: Note[]) => {
    setNotes(newNotes);
    await saveNotesToStorage(newNotes);
    // Broadcast changes to other components
    window.dispatchEvent(new CustomEvent('notesUpdated', { detail: newNotes }));
  };

  // Listen for updates from other components
  useEffect(() => {
    const handleNotesUpdate = (event: CustomEvent<Note[]>) => {
      setNotes(event.detail);
    };

    window.addEventListener('notesUpdated', handleNotesUpdate as EventListener);
    return () => {
      window.removeEventListener('notesUpdated', handleNotesUpdate as EventListener);
    };
  }, []);

  return (
    <NotesContext.Provider value={{ notes, updateNotes }}>
      {children}
    </NotesContext.Provider>
  );
}

export function useNotesContext() {
  const context = useContext(NotesContext);
  if (!context) {
    throw new Error('useNotesContext must be used within a NotesProvider');
  }
  return context;
}