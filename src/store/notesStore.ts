import { create } from 'zustand';
import { NotesState } from '../types';
import * as api from '../api';

export const useNotesStore = create<NotesState>((set) => ({
  notes: [],
  addNote: async (note) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No authentication token');

      const newNote = await api.createNote(token, note);
      set((state) => ({
        notes: [newNote, ...state.notes],
      }));
    } catch (error) {
      console.error('Failed to add note:', error);
      throw error;
    }
  },
  updateNote: async (id, updatedNote) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No authentication token');

      const updated = await api.updateNote(token, id, updatedNote);
      set((state) => ({
        notes: state.notes.map((note) =>
          note.id === id ? updated : note
        ),
      }));
    } catch (error) {
      console.error('Failed to update note:', error);
      throw error;
    }
  },
  deleteNote: async (id) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No authentication token');

      await api.deleteNote(token, id);
      set((state) => ({
        notes: state.notes.filter((note) => note.id !== id),
      }));
    } catch (error) {
      console.error('Failed to delete note:', error);
      throw error;
    }
  },
  fetchNotes: async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No authentication token');

      const notes = await api.getNotes(token);
      set({ notes });
    } catch (error) {
      console.error('Failed to fetch notes:', error);
      throw error;
    }
  },
}));