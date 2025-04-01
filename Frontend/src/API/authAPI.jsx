import { create } from "zustand";
import axios from "axios";

axios.defaults.withCredentials = true;

export const authApi = create((set) => ({
  user: null,
  isAuthenticted: null,
  error: null,
  isLoading: false,
  isCheckingAuth: true,
  message: null,

  signup: async (name, email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(
         "/api/auth/signup",
        { name, email, password },
        {
          withCredentials: true,
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        },
      );
      set({ user: response.data.data, isAuthenticted: true, isLoading: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error signing up",
        isLoading: false,
      });
      throw error;
    }
  },

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(
        "/api/auth/login",
        { email, password },
        {
          withCredentials: true,
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        },
      );
      set({ user: response.data.data, isAuthenticted: true, isLoading: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error signing up",
        isLoading: false,
      });
      throw error;
    }
  },

  logout: async () => {
    set({ isLoading: true, error: null });
    try {
      await axios.post( `/api/auth/logout`);
      set({
        user: null,
        isAuthenticated: false,
        error: null,
        isLoading: false,
      });
    } catch (error) {
      set({ error: "Error logging out", isLoading: false });
      throw error;
    }
  },

  verifyEmail: async (code) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post( "/api/auth/verify-email", {
        code,
      });
      set({ user: response.data.data, isAuthenticted: true, isLoading: false });
      return response.data;
    } catch (error) {
      set({
        error: error.response.data.message || "Error verify email",
        isLoading: false,
      });
      throw error;
    }
  },

  checkAuth: async () => {
    set({ isCheckingAuth: true, error: null });
    try {
      const response = await axios.get( `/api/auth/check-auth`, {
        withCredentials: true,
      });
      set({
        user: response.data.user,
        isAuthenticated: true,
        isCheckingAuth: false,
      });
    } catch (error) {
      set({ error: null, isCheckingAuth: false, isAuthenticated: false });
      throw error;
    }
  },

  forgotPassword: async (email) => {
    set({ isLoading: true, error: null, message: null });
    try {
      const response = await axios.post( "/api/auth/forgot-password", {
        email,
      });
      set({ message: response.data.message, isLoading: false });
    } catch (error) {
      set({
        isLoading: false,
        error: error.response.data.message || "Error sending reset password",
      });
      throw error;
    }
  },

  resetPassword: async (token, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(
         `/api/auth/reset-password/${token}`,
        { password },
      );
      set({ message: response.data.message, isLoading: false });
    } catch (error) {
      set({
        isLoading: false,
        error: error.response.data.message || "Error resetting password",
      });
      throw error;
    }
  },
}));
