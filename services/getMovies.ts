// services/getMovies.ts
import axios from 'axios';
import { GetMoviesParams } from '../types/movie';
const BASE_URL = 'https://api.themoviedb.org/3/discover/movie';
const BEARER_TOKEN = process.env.EXPO_PUBLIC_API_TOKEN; // Replace with actual token or import from env


export const getMovies = async ({
  sortBy = 'popularity.desc',
  page = 1,
  withCastId,
  includeAdult = false,
  includeVideo = false,
  language = 'en-US',
    genreId, 
}: GetMoviesParams = {}) => {
  try {
    const params = {
      sort_by: sortBy,
      page,
      include_adult: includeAdult,
      include_video: includeVideo,
      language,
      ...(withCastId && { with_cast: withCastId }),
        ...(genreId && { with_genres: genreId }), 
    };

    const response = await axios.get(BASE_URL, {
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
