import { useState } from 'react';
import { Note, Section } from '../types/notes';
import { notes as initialNotes } from '../data/notes';
import { loadNotesFromStorage } from '../utils/storage';
import { useAnimation } from './useAnimation';
import { useNotesSync } from './useNotesSync';

export function useNotesState() {
  const [notes, setNotes] = useState<Note[]>(() => {
    const storedNotes = loadNotesFromStorage();
    return storedNotes || initialNotes;
  });

  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [selectedSection, setSelectedSection] = useState<Section | null>(null);
  const [newTitle, setNewTitle] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  
  const { isAnimating: isAdding, triggerAnimation: triggerAddAnimation } = useAnimation(500);
  const { isAnimating: isDeleting, triggerAnimation: triggerDeleteAnimation } = useAnimation(300);
  const { connectionStatus } = useNotesSync(notes, setNotes);

  return {
    notes,
    setNotes,
    selectedNote,
    setSelectedNote,
    selectedSection,
    setSelectedSection,
    newTitle,
    setNewTitle,
    newMessage,
    setNewMessage,
    saveStatus,
    setSaveStatus,
    isAdding,
    isDeleting,
    triggerAddAnimation,
    triggerDeleteAnimation,
    connectionStatus
  };
}