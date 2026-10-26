import React from 'react';
import { Editor } from '@tiptap/react';

interface ToolbarProps {
  editor: Editor | null;
}

export const Toolbar: React.FC<ToolbarProps> = ({ editor }) => {
  if (!editor) return null;

  const buttons = [
    {
      label: 'B',
      action: () => editor.chain().focus().toggleBold().run(),
      isActive: editor.isActive('bold'),
      title: 'Bold',
    },
    {
      label: 'I',
      action: () => editor.chain().focus().toggleItalic().run(),
      isActive: editor.isActive('italic'),
      title: 'Italic',
    },
    {
      label: 'U',
      action: () => editor.chain().focus().toggleUnderline?.().run(), // Note: Underline requires a separate extension
      isActive: editor.isActive('underline'),
      title: 'Underline',
    },
    {
      label: 'List',
      action: () => editor.chain().focus().toggleBulletList().run(),
      isActive: editor.isActive('bulletList'),
      title: 'Bullet List',
    },
    {
      label: 'Order',
      action: () => editor.chain().focus().toggleOrderedList().run(),
      isActive: editor.isActive('orderedList'),
      title: 'Ordered List',
    },
    {
      label: 'Undo',
      action: () => editor.chain().focus().undo().run(),
      isActive: false,
      title: 'Undo',
    },
    {
      label: 'Redo',
      action: () => editor.chain().focus().redo().run(),
      isActive: false,
      title: 'Redo',
    },
  ];

  return (
    <div className="editor-toolbar">
      {buttons.map((btn, i) => (
        <button
          key={i}
          onClick={btn.action}
          className={`toolbar-btn ${btn.isActive ? 'active' : ''}`}
          title={btn.title}
        >
          {btn.label}
        </button>
      ))}
    </div>
  );
};
