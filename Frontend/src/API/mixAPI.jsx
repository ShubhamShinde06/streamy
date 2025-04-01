import { create } from "zustand";
import axios from "axios";
import {server } from '../App'

export const mixApi = create((set) => ({
  data: [],  // ✅ Initialize as an empty array
  error: null,
  isLoading: false,
  hasMore: true, // ✅ Track if more data is available
  page: 1, // ✅ Track current page number

  mixDataGet: async (page) => {
    set({ isLoading: true, error: null });

    try {
      const response = await axios.get(server +`/api/mix/get-mix?page=${page}&limit=7`);
      
      set((state) => ({
        data: page === 1 ? response.data.data : [...state.data, ...response.data.data], // ✅ Append new data
        hasMore: response.data.hasMore, // ✅ Update `hasMore`
        isLoading: false,
      }));
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error fetching data",
        isLoading: false,
      });
    }
  },

  addToList: async (userId, itemId, itemType) => {
    set({ isLoading: true, error: null });

    try {
      const response = await axios.post(server + `/api/mylist/add`, {
        userId,
        itemId,
        itemType,
      });
      set({
        Data: response.data.data,
        message: response.data.message,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error addToList",
        isLoading: false,
      });
    }
  },

  deleteToList: async (userId, saveId) => {
    set({ isLoading: true, error: null });

    try {
      const response = await axios.delete(
        server +  `/api/mylist/delete/${saveId}/${userId}`,
      );
      set({
        Data: response.data.data,
        message: response.data.message,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error addToList",
        isLoading: false,
      });
    }
  },

  mylistaGet: async (userId) => {
    set({ isLoading: true, error: null });

    try {
      const response = await axios.get(server +`/api/mylist/get/${userId}`);  
      set({
        data: response.data.data,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error fetching data",
        isLoading: false,
      });
    }
  },

}));
