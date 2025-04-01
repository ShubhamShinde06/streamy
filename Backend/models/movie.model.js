import mongoose, { Schema } from "mongoose";

const movieSchema = new mongoose.Schema(
  {
    image: {
      type: Array,
      required: true,
    },
    category: {
      type: String,
      default: "movie",
    },
    poster: {
      type: Boolean,
    },
    title: {
      type: String,
      required: true,
    },
    release_year: {
      type: Number,
      required: true,
    },
    runtime_minutes: {
      type: String,
      required: true,
    },
    director: {
      type: String,
      required: true,
    },
    genre: {
      type: [Array],
      required: true,
    },
    plot: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    video_link: {
      type: String,
      required: true,
    },
    download_link: {
      type: String,
      required: true,
    },
    characters: {
      type: [Array],
      required: true,
    },
    visitCount: {
      type: Number,
      default: 0, // Initial count is 0
    },
    likeCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

export const movieModel =
  mongoose.models.movie || mongoose.model("movie", movieSchema);
