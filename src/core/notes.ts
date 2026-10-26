import { db } from './db';
import type { Note } from './types';

export const NotesService = {
  async getAllNotes(): Promise<Note[]> {
    return await db.notes.toArray();
  },

  async getNoteById(id: number): Promise<Note | undefined> {
    return await db.notes.get(id);
  },

  async createNote(note: Omit<Note, 'id'>): Promise<number> {
    return await db.notes.add(note);
  },

  async updateNote(id: number, updates: Partial<Note>): Promise<void> {
    await db.notes.update(id, {
      ...updates,
      updatedAt: Date.now()
    });
  },

  async deleteNote(id: number): Promise<void> {
    await db.notes.delete(id);
  },

  async seedNotes(): Promise<void> {
    const count = await db.notes.count();
    if (count === 0) {
      const initialNotes: Omit<Note, 'id'>[] = [
        {
          title: 'Welcome to NOTORA',
          content: '<p>This is a futuristic 3D notes app. Click on a note to edit it!</p>',
          position: { x: 0, y: 0, z: 0 },
          rotation: { x: 0, y: 0, z: 0 },
          createdAt: Date.now(),
          updatedAt: Date.now(),
          color: '#ffffff'
        },
        {
          title: 'Design Principles',
          content: '<p>Minimalism, Depth, and Fluidity.</p>',
          position: { x: 2, y: 1, z: -2 },
          rotation: { x: 0.1, y: 0.2, z: -0.1 },
          createdAt: Date.now(),
          updatedAt: Date.now(),
          color: '#e0e0e0'
        },
        {
          title: 'Tech Stack',
          content: '<p>React + Three.js + TipTap + Dexie.</p>',
          position: { x: -2, y: 1.5, z: -1 },
          rotation: { x: -0.1, y: -0.2, z: 0.1 },
          createdAt: Date.now(),
          updatedAt: Date.now(),
          color: '#d0d0d0'
        }
      ];
      await db.notes.bulkAdd(initialNotes);
    }
  }
};
