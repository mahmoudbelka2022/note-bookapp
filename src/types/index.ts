export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

export interface NotesState {
  notes: Note[];
  addNote: (note: { title: string; content: string }) => Promise<void>;
  updateNote: (id: string, note: { title: string; content: string }) => Promise<void>;
  deleteNote: (id: string) => Promise<void>;
  fetchNotes: () => Promise<void>;
}