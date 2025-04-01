import { create } from "zustand";
import axios from "axios";

export const moviesApi = create((set) => ({
  data: null,
  error: null,
  isLoading: false,
  message: null,

  moviesGet: async () => {
    set({ isLoading: true, error: null });
    try {
        const response = await axios.get("/api/movies/get-movies");
      set({
        data: response.data.movies,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error updating view count",
        isLoading: false,
      });
    }
  },

  movieSingleGet: async (id) => {
    set({ isLoading: true, error: null });
    try {
        const response = await axios.get(`/api/movies/get-single-movies/${id}`);
      set({
        data: response.data.movie,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error updating view count",
        isLoading: false,
      });
    }
  },

  movieVideoLinkGet: async (id) => {
    set({ isLoading: true, error: null });
    try {
        const response = await axios.get(`/api/movies/get-single-movies/${id}`);
      set({
        data: response.data.movie,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error updating view count",
        isLoading: false,
      });
    }
  },


}));
