import axios from 'axios';
import { MovieTrailerInterface, MovieTrailerResult } from '@/types/movie';

const BASE_URL = 'https://api.themoviedb.org/3/movie';
const BEARER_TOKEN = process.env.EXPO_PUBLIC_API_TOKEN;


export const getMovieTrailer = async (id: number): Promise<MovieTrailerResult | null> => {
  try {
    const response = await axios.get<MovieTrailerInterface>(`${BASE_URL}/${id}/videos`, {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${BEARER_TOKEN}`,
      },
      params: {
        language: 'en-US',
      },
    });

    const results = response.data.results;
    if (!results || results.length === 0) return null;

    // Only YouTube, official videos
    const youtubeOfficial = results
      .filter(v => v.site === "YouTube" && v.official)
      .sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime());

    // Prefer Trailer
    const trailer = youtubeOfficial.find(v => v.type === "Trailer");
    if (trailer) return trailer;

    // Else, prefer Teaser
    const teaser = youtubeOfficial.find(v => v.type === "Teaser");
    if (teaser) return teaser;

    return youtubeOfficial[0] || null;
  } catch (error) {
    console.error(`Failed to fetch movie trailer for ID ${id}:`, error);
    return null;
  }
};
