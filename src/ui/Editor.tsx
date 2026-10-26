import React, { useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useNoteStore } from '../store/useNoteStore';
import { Toolbar } from './components/Toolbar';

export const Editor: React.FC = () => {
  const { activeNoteId, notes, setActiveNote, updateNote } = useNoteStore();
  const activeNote = notes.find((n) => n.id === activeNoteId);

  const editor = useEditor({
    extensions: [StarterKit],
    content: '',
    onUpdate: ({ editor }) => {
      if (activeNoteId) {
        updateNote(activeNoteId, { content: editor.getHTML() });
      }
    },
  });

  useEffect(() => {
    if (editor && activeNote) {
      editor.commands.setContent(activeNote.content);
    }
  }, [activeNoteId, activeNote, editor]);

  if (!activeNote) return null;

  return (
    <div className="editor-overlay">
      <div className="editor-glass">
        <div className="editor-header">
          <input
            className="editor-title"
            value={activeNote.title}
            onChange={(e) => updateNote(activeNoteId!, { title: e.target.value })}
          />
          <button className="close-button" onClick={() => setActiveNote(null)}>✕</button>
        </div>
        <Toolbar editor={editor} />
        <div className="editor-content">
          <EditorContent editor={editor} />
        </div>
      </div>
    </div>
  );
};
