import { useEffect } from 'react';
import { Note } from '../types/notes';
import { saveNotesToStorage } from '../utils/storage';
import { useWebSocket } from './useWebSocket';

export function useNotesSync(notes: Note[], setNotes: (notes: Note[]) => void) {
  const { emitNotesUpdate, connectionStatus } = useWebSocket((updatedNotes) => {
    setNotes(updatedNotes);
  });

  // Sync with localStorage and WebSocket
  useEffect(() => {
    const syncNotes = async () => {
      try {
        await saveNotesToStorage(notes);
        emitNotesUpdate(notes);
      } catch (error) {
        console.error('Error syncing notes:', error);
      }
    };

    // Debounce sync to prevent too frequent updates
    const debounceTimer = setTimeout(syncNotes, 500);
    return () => clearTimeout(debounceTimer);
  }, [notes, emitNotesUpdate]);

  return { connectionStatus };
}