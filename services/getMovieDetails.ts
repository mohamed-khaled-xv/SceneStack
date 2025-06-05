import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3/movie';
const BEARER_TOKEN = process.env.EXPO_PUBLIC_API_TOKEN; // Read from .env

export const getMovieDetails = async (id: number) => {
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
    console.error(`Failed to fetch movie details for ID ${id}:`, error);
    throw error;
  }
};
