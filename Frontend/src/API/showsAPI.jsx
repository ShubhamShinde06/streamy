import { create } from "zustand";
import axios from "axios";

export const showsApi = create((set) => ({
  data: null,
  error: null,
  isLoading: false,
  message: null,

  showsGet: async () => {
    set({ isLoading: true, error: null });
    try {
        const response = await axios.get("/api/series/get-series");
      set({
        data: response.data.series,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error updating view count",
        isLoading: false,
      });
    }
  },

  showSingleGet: async (id) => {
    set({ isLoading: true, error: null });
    try {
        const response = await axios.get(`/api/series/${id}`);
      set({
        data: response.data.series,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error updating view count",
        isLoading: false,
      });
    }
  },

  showVideoLinkGet: async (seriesId, episodeId) => {
    set({ isLoading: true, error: null });
    try {
        const response = await axios.get(`/api/series/${seriesId}/${episodeId}`);
      set({
        data: response.data.episode,
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
