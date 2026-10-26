# NOTORA Developer Documentation

NOTORA is a futuristic 3D notes application built with React, Three.js, and TipTap.

## Architecture

The application is split into three main layers:
1. **Core Logic (`src/core`)**: Handles data persistence using IndexedDB via Dexie.js.
2. **State Management (`src/store`)**: Uses Zustand for global state, ensuring a reactive link between the 3D scene and the UI.
3. **3D Scene (`src/scene`)**: Built with `@react-three/fiber` and `@react-three/drei`. The scene is independent of the notes logic, consuming state from the store.
4. **UI Layer (`src/ui`)**: A glassmorphism-inspired interface for editing notes using TipTap.

## Key Components

- `World.tsx`: The main Three.js canvas and environment setup.
- `NotePaper.tsx`: A customized 3D representation of a note with floating physics and cursor responsiveness.
- `Editor.tsx`: The rich text editor interface.
- `NotesService`: A service layer for all CRUD operations on the notes database.

## Tech Stack

- **Frontend**: React 18, TypeScript
- **3D Engine**: Three.js, React Three Fiber (R3F), React Three Drei
- **Editor**: TipTap (ProseMirror)
- **Database**: IndexedDB (Dexie.js)
- **State**: Zustand
- **Styling**: CSS3 with Glassmorphism and CSS Variables

## Development Guide

### Adding New Features
- **3D Changes**: Modify `NotePaper.tsx` for individual note behavior or `World.tsx` for global environment changes.
- **Data Changes**: Update `types.ts` first, then `db.ts` (for schema changes) and `notes.ts` (for logic).
- **UI Changes**: Edit `Editor.tsx` or components in `src/ui/components`.

### Run the App
```bash
npm run dev
```

## Design Principles
- **Minimalism**: Avoid clutter; use whitespace and depth.
- **Depth**: Use Z-axis movement and shadows to create a tactile feel.
- **Fluidity**: Every interaction should have a lerped transition.
