import { create } from 'zustand';
import type { Note } from '../core/types';
import { NotesService } from '../core/notes';

interface NoteState {
  notes: Note[];
  activeNoteId: number | null;
  isLoading: boolean;
  
  loadNotes: () => Promise<void>;
  setActiveNote: (id: number | null) => void;
  addNote: (note: Omit<Note, 'id'>) => Promise<void>;
  updateNote: (id: number, updates: Partial<Note>) => Promise<void>;
  deleteNote: (id: number) => Promise<void>;
}

export const useNoteStore = create<NoteState>((set, get) => ({
  notes: [],
  activeNoteId: null,
  isLoading: true,

  loadNotes: async () => {
    set({ isLoading: true });
    await NotesService.seedNotes();
    const notes = await NotesService.getAllNotes();
    set({ notes, isLoading: false });
  },

  setActiveNote: (id) => set({ activeNoteId: id }),

  addNote: async (note) => {
    const id = await NotesService.createNote(note);
    const newNote = { ...note, id };
    set((state) => ({ notes: [...state.notes, newNote] }));
  },

  updateNote: async (id, updates) => {
    await NotesService.updateNote(id, updates);
    set((state) => ({
      notes: state.notes.map((n) => (n.id === id ? { ...n, ...updates, updatedAt: Date.now() } : n)),
    }));
  },

  deleteNote: async (id) => {
    await NotesService.deleteNote(id);
    if (get().activeNoteId === id) {
      set({ activeNoteId: null });
    }
    set((state) => ({
      notes: state.notes.filter((n) => n.id !== id),
    }));
  },
}));
