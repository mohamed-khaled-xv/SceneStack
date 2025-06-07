import { SQLiteDatabase } from 'expo-sqlite';
import { Movie } from '../../types/Movie';

export async function insertMovie(
  db: SQLiteDatabase,
  movie: Movie
) {
  await db.runAsync(
    'INSERT INTO movies (id, title, poster_path, release_date) VALUES (?, ?, ?, ?)',
    movie.id, movie.title, movie.poster_path, movie.release_date ?? null
  );
}

export async function getAllMovies(db: SQLiteDatabase) {
  return await db.getAllAsync<Movie>('SELECT * FROM movies');
}

// NEW: Delete a movie by its ID
export async function deleteMovie(db: SQLiteDatabase, id: number) {
  await db.runAsync('DELETE FROM movies WHERE id = ?', id);
}

export async function isMovieBookmarked(db: SQLiteDatabase, id: number): Promise<boolean> {
  const result = await db.getFirstAsync('SELECT 1 FROM movies WHERE id = ?', id);
  return !!result;
}
