export type NoteType = 'note' | 'greeting' | 'problem' | string;

export interface Section {
  title: string;
  messages: string[];
}

export interface Note {
  id: NoteType;
  title: string;
  sections: Section[];
}

export interface AdminState {
  notes: Note[];
  selectedNote: Note | null;
  selectedSection: Section | null;
}