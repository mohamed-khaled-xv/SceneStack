import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3/movie';
const BEARER_TOKEN = process.env.EXPO_PUBLIC_API_TOKEN;

export const getMovieRecommendations = async (movieId: number) => {
  try {
    const response = await axios.get(`${BASE_URL}/${movieId}/recommendations`, {
      headers: {
        Authorization: `Bearer ${BEARER_TOKEN}`,
      },
      params: {
        language: 'en-US',
        page: 1,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error("Error fetching movie recommendations:", error);
    return [];
  }
};
