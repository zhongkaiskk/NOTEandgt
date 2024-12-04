import { Note } from '../types/notes';

const STORAGE_KEY = 'admin_notes';

export const saveNotesToStorage = async (notes: Note[]): Promise<void> => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  } catch (error) {
    console.error('Error saving notes to storage:', error);
    throw error;
  }
};

export const loadNotesFromStorage = (): Note[] | null => {
  try {
    const storedNotes = localStorage.getItem(STORAGE_KEY);
    return storedNotes ? JSON.parse(storedNotes) : null;
  } catch (error) {
    console.error('Error loading notes from storage:', error);
    return null;
  }
};

export const clearNotesStorage = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing notes storage:', error);
  }
};