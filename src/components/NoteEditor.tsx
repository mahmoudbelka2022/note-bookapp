import React, { useState } from 'react';
import { useNotesStore } from '../store/notesStore';
import { Save, Trash2 } from 'lucide-react';

interface NoteEditorProps {
  noteId?: string;
  initialTitle?: string;
  initialContent?: string;
  onClose?: () => void;
}

export function NoteEditor({ noteId, initialTitle = '', initialContent = '', onClose }: NoteEditorProps) {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const { addNote, updateNote, deleteNote } = useNotesStore();

  const handleSave = () => {
    if (noteId) {
      updateNote(noteId, { title, content });
    } else {
      addNote({ title, content });
    }
    onClose?.();
  };

  const handleDelete = () => {
    if (noteId) {
      deleteNote(noteId);
      onClose?.();
    }
  };

  return (
    <div className="space-y-4 bg-white p-6 rounded-lg shadow-lg">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Note title"
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Start writing..."
        rows={8}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
      />
      <div className="flex justify-end space-x-2">
        {noteId && (
          <button
            onClick={handleDelete}
            className="flex items-center px-4 py-2 text-red-600 hover:bg-red-50 rounded-md"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete
          </button>
        )}
        <button
          onClick={handleSave}
          className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
        >
          <Save className="w-4 h-4 mr-2" />
          Save
        </button>
      </div>
    </div>
  );
}