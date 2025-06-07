import { type SQLiteDatabase } from 'expo-sqlite';

export async function migrateDbIfNeeded(db: SQLiteDatabase) {
  const DATABASE_VERSION = 1;
  // PRAGMA returns { user_version: number } | null
  const result = await db.getFirstAsync<{ user_version: number }>('PRAGMA user_version');
  const user_version = result?.user_version ?? 0; // Fallback to 0 if null

  if (user_version >= DATABASE_VERSION) return;

  if (user_version === 0) {
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS movies (
        id INTEGER PRIMARY KEY NOT NULL,
        title TEXT,
        poster_path TEXT,
        release_date TEXT
        
      );
      CREATE TABLE IF NOT EXISTS casts (
        id INTEGER PRIMARY KEY NOT NULL,
        movie_id INTEGER,
        name TEXT,
        character TEXT,
        profile_path TEXT
      );
    `);
    await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
  }
}
