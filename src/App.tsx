import { useEffect } from 'react';
import { World } from './scene/World';
import { Editor } from './ui/Editor';
import { useNoteStore } from './store/useNoteStore';
import './index.css';

function App() {
  const { loadNotes, addNote } = useNoteStore();

  useEffect(() => {
    loadNotes();
  }, [loadNotes]);

  const handleAddNote = () => {
    addNote({
      title: 'New Note',
      content: '<p>Start typing...</p>',
      position: { 
        x: (Math.random() - 0.5) * 10, 
        y: (Math.random() - 0.5) * 5, 
        z: (Math.random() - 0.5) * 10 
      },
      rotation: { 
        x: Math.random() * 0.2, 
        y: Math.random() * 0.2, 
        z: Math.random() * 0.2 
      },
      createdAt: Date.now(),
      updatedAt: Date.now(),
      color: '#ffffff'
    });
  };

  return (
    <div className="app-container">
      <World />
      <Editor />
      <div className="ui-layer">
        <div className="brand">
          <h1>NOTORA</h1>
          <p>Futuristic 3D Notes</p>
        </div>
        <button className="add-note-btn" onClick={handleAddNote}>
          <span>+</span> New Note
        </button>
      </div>
    </div>
  );
}

export default App;
