export interface Note {
  id?: number;
  title: string;
  content: string;
  position: { x: number; y: number; z: number };
  rotation: { x: number; y: number; z: number };
  createdAt: number;
  updatedAt: number;
  color?: string;
}

export interface NoteStore {
  notes: Note[];
}
