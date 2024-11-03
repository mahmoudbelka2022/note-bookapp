import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../store/authStore';
import { useNotesStore } from '../store/notesStore';
import { NoteEditor } from '../components/NoteEditor';
import { NotesList } from '../components/NotesList';
import { BookText, LogOut, Plus } from 'lucide-react';

export function Dashboard() {
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const { user, logout } = useAuthStore();
  const { notes, fetchNotes } = useNotesStore();
  const selectedNote = notes.find((note) => note.id === selectedNoteId);

  useEffect(() => {
    fetchNotes().catch(console.error);
  }, [fetchNotes]);

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <BookText className="h-8 w-8 text-purple-600" />
              <span className="ml-2 text-xl font-semibold text-gray-900">Notebook</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Welcome, {user?.name}</span>
              <button
                onClick={logout}
                className="flex items-center px-3 py-2 text-gray-600 hover:text-gray-900"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">My Notes</h1>
          <button
            onClick={() => {
              setSelectedNoteId(null);
              setIsEditing(true);
            }}
            className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
          >
            <Plus className="w-5 h-5 mr-2" />
            New Note
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <NotesList
              onSelectNote={(noteId) => {
                setSelectedNoteId(noteId);
                setIsEditing(true);
              }}
            />
          </div>
          <div className="lg:col-span-2">
            {isEditing && (
              <NoteEditor
                noteId={selectedNoteId ?? undefined}
                initialTitle={selectedNote?.title}
                initialContent={selectedNote?.content}
                onClose={() => setIsEditing(false)}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}