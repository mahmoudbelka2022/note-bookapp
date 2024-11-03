import React from 'react';
import { useNotesStore } from '../store/notesStore';
import { Clock, Edit } from 'lucide-react';

interface NotesListProps {
  onSelectNote: (noteId: string) => void;
}

export function NotesList({ onSelectNote }: NotesListProps) {
  const { notes } = useNotesStore();

  return (
    <div className="space-y-4">
      {notes.map((note) => (
        <div
          key={note.id}
          onClick={() => onSelectNote(note.id)}
          className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer"
        >
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-medium text-gray-900">{note.title}</h3>
            <Edit className="w-4 h-4 text-gray-400" />
          </div>
          <p className="mt-1 text-gray-600 line-clamp-2">{note.content}</p>
          <div className="mt-2 flex items-center text-sm text-gray-500">
            <Clock className="w-4 h-4 mr-1" />
            <span>{new Date(note.updatedAt).toLocaleDateString()}</span>
          </div>
        </div>
      ))}
    </div>
  );
}