import { useCallback } from 'react';
import { Note } from '../types/notes';
import { useNotesState } from './useNotesState';
import { useNotesContext } from '../store/NotesContext';

export function useNotes() {
  const state = useNotesState();
  const { notes, updateNotes } = useNotesContext();
  const {
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
    triggerAddAnimation,
    triggerDeleteAnimation,
  } = state;

  const handleSave = useCallback(async () => {
    try {
      setSaveStatus('saving');
      await updateNotes(notes);
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 2000);
    } catch (error) {
      console.error('Error saving notes:', error);
      setSaveStatus('error');
      setTimeout(() => setSaveStatus('idle'), 3000);
    }
  }, [notes, setSaveStatus, updateNotes]);

  const handleAddNote = useCallback(async () => {
    if (!newTitle.trim()) return;

    const newNote: Note = {
      id: newTitle.toLowerCase().replace(/\s+/g, '-'),
      title: newTitle,
      sections: []
    };

    const updatedNotes = [...notes, newNote];
    await updateNotes(updatedNotes);
    setNewTitle('');
    triggerAddAnimation();
  }, [newTitle, notes, setNewTitle, triggerAddAnimation, updateNotes]);

  const handleDeleteNote = useCallback(async (noteId: string) => {
    const updatedNotes = notes.filter(note => note.id !== noteId);
    await updateNotes(updatedNotes);
    
    if (selectedNote?.id === noteId) {
      setSelectedNote(null);
      setSelectedSection(null);
    }
    triggerDeleteAnimation();
  }, [notes, selectedNote, setSelectedNote, setSelectedSection, triggerDeleteAnimation, updateNotes]);

  const handleAddSection = useCallback(async () => {
    if (!newTitle.trim() || !selectedNote) return;

    const updatedNotes = notes.map(note => 
      note.id === selectedNote.id
        ? { ...note, sections: [...note.sections, { title: newTitle, messages: [] }] }
        : note
    );

    await updateNotes(updatedNotes);
    setNewTitle('');
    triggerAddAnimation();
  }, [newTitle, selectedNote, notes, setNewTitle, triggerAddAnimation, updateNotes]);

  const handleDeleteSection = useCallback(async (sectionTitle: string) => {
    if (!selectedNote) return;

    const updatedNotes = notes.map(note => 
      note.id === selectedNote.id
        ? { ...note, sections: note.sections.filter(s => s.title !== sectionTitle) }
        : note
    );

    await updateNotes(updatedNotes);
    if (selectedSection?.title === sectionTitle) {
      setSelectedSection(null);
    }
    triggerDeleteAnimation();
  }, [notes, selectedNote, selectedSection, setSelectedSection, triggerDeleteAnimation, updateNotes]);

  const handleAddMessage = useCallback(async () => {
    if (!newMessage.trim() || !selectedNote || !selectedSection) return;

    const updatedNotes = notes.map(note => 
      note.id === selectedNote.id
        ? {
            ...note,
            sections: note.sections.map(section =>
              section.title === selectedSection.title
                ? { ...section, messages: [...section.messages, newMessage] }
                : section
            )
          }
        : note
    );

    await updateNotes(updatedNotes);
    setNewMessage('');
    triggerAddAnimation();
  }, [newMessage, selectedNote, selectedSection, notes, setNewMessage, triggerAddAnimation, updateNotes]);

  const handleDeleteMessage = useCallback(async (sectionTitle: string, messageIndex: number) => {
    if (!selectedNote) return;

    const updatedNotes = notes.map(note => 
      note.id === selectedNote.id
        ? {
            ...note,
            sections: note.sections.map(section =>
              section.title === sectionTitle
                ? {
                    ...section,
                    messages: section.messages.filter((_, i) => i !== messageIndex)
                  }
                : section
            )
          }
        : note
    );

    await updateNotes(updatedNotes);
    triggerDeleteAnimation();
  }, [notes, selectedNote, triggerDeleteAnimation, updateNotes]);

  const handleReorderNotes = useCallback(async (oldIndex: number, newIndex: number) => {
    const updatedNotes = [...notes];
    const [movedNote] = updatedNotes.splice(oldIndex, 1);
    updatedNotes.splice(newIndex, 0, movedNote);
    await updateNotes(updatedNotes);
  }, [notes, updateNotes]);

  const handleReorderSections = useCallback(async (noteId: string, oldIndex: number, newIndex: number) => {
    const updatedNotes = notes.map(note => {
      if (note.id !== noteId) return note;
      const updatedSections = [...note.sections];
      const [movedSection] = updatedSections.splice(oldIndex, 1);
      updatedSections.splice(newIndex, 0, movedSection);
      return { ...note, sections: updatedSections };
    });
    await updateNotes(updatedNotes);
  }, [notes, updateNotes]);

  const handleReorderMessages = useCallback(async (
    noteId: string,
    sectionTitle: string,
    oldIndex: number,
    newIndex: number
  ) => {
    const updatedNotes = notes.map(note => {
      if (note.id !== noteId) return note;
      return {
        ...note,
        sections: note.sections.map(section => {
          if (section.title !== sectionTitle) return section;
          const updatedMessages = [...section.messages];
          const [movedMessage] = updatedMessages.splice(oldIndex, 1);
          updatedMessages.splice(newIndex, 0, movedMessage);
          return { ...section, messages: updatedMessages };
        })
      };
    });
    await updateNotes(updatedNotes);
  }, [notes, updateNotes]);

  return {
    notes,
    selectedNote,
    selectedSection,
    newTitle,
    newMessage,
    saveStatus,
    isAdding: state.isAdding,
    isDeleting: state.isDeleting,
    setSelectedNote,
    setSelectedSection,
    setNewTitle,
    setNewMessage,
    handleSave,
    handleAddNote,
    handleDeleteNote,
    handleAddSection,
    handleDeleteSection,
    handleAddMessage,
    handleDeleteMessage,
    handleReorderNotes,
    handleReorderSections,
    handleReorderMessages
  };
}