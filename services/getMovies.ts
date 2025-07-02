// services/getMovies.ts
import axios from 'axios';
import { GetMoviesParams } from '../types/movie';

const BASE_URL = 'https://api.themoviedb.org/3';
const BEARER_TOKEN = process.env.EXPO_PUBLIC_API_TOKEN; // Make sure this is set

export const getMovies = async ({
  query, // <-- Add this param for text search
  sortBy = 'popularity.desc',
  page = 1,
  withCastId,
  includeAdult = false,
  includeVideo = false,
  language = 'en-US',
  genreId,
}: GetMoviesParams = {}) => {
  const isSearch = !!query;
  const url = isSearch ? `${BASE_URL}/search/movie` : `${BASE_URL}/discover/movie`;

  try {
    const params: any = {
      page,
      include_adult: includeAdult,
      include_video: includeVideo,
      language,
      ...(isSearch ? { query } : { sort_by: sortBy }),
      ...(withCastId && { with_cast: withCastId }),
      ...(genreId && { with_genres: genreId }),
    };

    const response = await axios.get(url, {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${BEARER_TOKEN}`,
      },
      params,
    });

    return response.data;
  } catch (error) {
    console.error('Failed to fetch movies:', error);
    throw error;
  }
};
