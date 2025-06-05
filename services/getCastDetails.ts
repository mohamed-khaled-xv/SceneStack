import axios from 'axios';
import { CastDetail } from '../types/Cast'; // Adjust the import path as necessary    
import { MovieDetailsInterface } from '../types/movie';
const BASE_URL = 'https://api.themoviedb.org/3/person';
const BEARER_TOKEN = process.env.EXPO_PUBLIC_API_TOKEN; // Read from .env

/**
 * Fetches detailed information about a cast member by their ID.
 * @param id The TMDB person ID.
 * @returns A Promise containing the cast details.
 */
export const getCastDetails = async (id: number): Promise<CastDetail> => {
  try {
    const response = await axios.get(`${BASE_URL}/${id}`, {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${BEARER_TOKEN}`,
      },
      params: {
        language: 'en-US',
      },
    });

    return response.data;
  } catch (error) {
    console.error(`Failed to fetch cast details for ID ${id}:`, error);
    throw error;
  }
};

export const getCastMovies = async (id: number): Promise<MovieDetailsInterface[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/${id}/movie_credits`, {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${BEARER_TOKEN}`,
        },
        params: {
          language: 'en-US',
        },
      });

    return response.data.cast;
  } catch (error) {
    console.error(`Failed to fetch cast movies for ID ${id}:`, error);
    throw error;
  }
};
