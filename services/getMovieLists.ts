// services/getMovieLists.ts
import axios from "axios";

const BASE_URL = 'https://api.themoviedb.org/3/movie';
const BEARER_TOKEN = process.env.EXPO_PUBLIC_API_TOKEN; // Make sure this is set in your .env

// Supported movie list types
export type MovieListType = "now_playing" | "popular" | "top_rated" | "upcoming";

// Create an Axios instance with default config
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${BEARER_TOKEN}`,
  },
});

// General fetcher for any movie list
export const getMovieList = async (
  category: MovieListType,
  page: number = 1,
  language: string = 'en-US'
) => {
  try {
    const response = await api.get(`/${category}?language=${language}&page=${page}`);
    return response.data; // { results: Movie[], ... }
  } catch (err) {
    console.error("Failed to fetch movie list:", err);
    throw err;
  }
};
