// services/getCast.ts
import axios from 'axios';
import { CastMember } from '../types/CastMemberInterface';

const BASE_URL = 'https://api.themoviedb.org/3';
const BEARER_TOKEN = process.env.EXPO_PUBLIC_API_TOKEN;

export const getCast = async (movieId: number): Promise<CastMember[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/${movieId}/credits`, {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${BEARER_TOKEN}`,
      },
    });

    return response.data.cast;
  } catch (error) {
    console.error('Failed to fetch movie cast:', error);
    throw error;
  }
};
