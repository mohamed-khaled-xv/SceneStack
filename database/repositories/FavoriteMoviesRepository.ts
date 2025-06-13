// database/repositories/FavoriteMoviesRepository.ts
import { SQLiteDatabase } from 'expo-sqlite';
import { Movie } from '../../types/movie';

export async function insertFavoriteMovie(
  db: SQLiteDatabase,
  movie: Movie
) {
  await db.runAsync(
    'INSERT INTO favorite_movies (id, title, poster_path, release_date) VALUES (?, ?, ?, ?)',
    movie.id, movie.title, movie.poster_path, movie.release_date ?? null
  );
}

export async function getAllFavoriteMovies(db: SQLiteDatabase) {
  return await db.getAllAsync<Movie>('SELECT * FROM favorite_movies');
}

// NEW: Delete a movie by its ID
export async function deleteFavoriteMovie(db: SQLiteDatabase, id: number) {
  await db.runAsync('DELETE FROM favorite_movies WHERE id = ?', id);
}

export async function isMovieFavorite(db: SQLiteDatabase, id: number): Promise<boolean> {
  const result = await db.getFirstAsync('SELECT 1 FROM favorite_movies WHERE id = ?', id);
  return !!result;
}
