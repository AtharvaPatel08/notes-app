import Dexie, { type Table } from 'dexie';
import type { Note } from './types';

export class NotoraDB extends Dexie {
  notes!: Table<Note, number>;

  constructor() {
    super('NotoraDB');
    this.version(1).stores({
      notes: '++id, title, createdAt'
    });
  }
}

export const db = new NotoraDB();
