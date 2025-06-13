import { type SQLiteDatabase } from 'expo-sqlite';

export async function migrateDbIfNeeded(db: SQLiteDatabase) {
  const DATABASE_VERSION = 2;
  const result = await db.getFirstAsync<{ user_version: number }>('PRAGMA user_version');
  const user_version = result?.user_version ?? 0;

  // Run migrations for all versions below the latest
  if (user_version < 1) {
    // Initial creation (v1)
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS favorite_movies (
        id INTEGER PRIMARY KEY NOT NULL,
        title TEXT,
        poster_path TEXT,
        release_date TEXT
      );
      CREATE TABLE IF NOT EXISTS to_watch_movies (
        id INTEGER PRIMARY KEY NOT NULL,
        title TEXT,
        poster_path TEXT,
        release_date TEXT
      );
    `);
    await db.execAsync(`PRAGMA user_version = 1`);
  }
  // If you add new migrations in the future, do:
  if (user_version < 2) {
    // (For example: add new columns, new tables, etc.)
    // For now, nothing else to do.
    await db.execAsync(`PRAGMA user_version = 2`);
  }
}
