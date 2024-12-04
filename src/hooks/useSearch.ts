import { useState, useMemo } from 'react';
import { Note, Section } from '../types/notes';

export function useSearch() {
  const [searchQuery, setSearchQuery] = useState('');

  const filterMessages = (sections: Section[]): Section[] => {
    if (!searchQuery.trim()) return sections;

    return sections.map(section => ({
      ...section,
      messages: section.messages.filter(message =>
        message.toLowerCase().includes(searchQuery.toLowerCase())
      )
    })).filter(section => section.messages.length > 0);
  };

  const filterNotes = (notes: Note[]): Note[] => {
    if (!searchQuery.trim()) return notes;

    return notes.map(note => ({
      ...note,
      sections: filterMessages(note.sections)
    })).filter(note => note.sections.length > 0);
  };

  return {
    searchQuery,
    setSearchQuery,
    filterNotes,
    filterMessages
  };
}