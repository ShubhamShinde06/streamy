import mongoose from "mongoose";

const SeriesSchema = new mongoose.Schema(
  {
    image: { type: Array, required: true },
    category: { type: String, default: "series" },
    poster: { type: Boolean },
    series_name: { type: String, required: true },
    genre: { type: [Array], required: true },
    plot: { type: String, required: true },
    release_year_start: { type: Number, required: true },
    total_seasons: { type: Number, required: true },
    rating: { type: Number, required: true },
    director: { type: String, required: true },
    characters: { type: [Array], required: true },
    likeCount: {
      type: Number,
      default: 0, // Initialize like count to 0
    },
    visitCount: {
      type: Number,
      default: 0, // Initial count is 0
    },
    seasons: {
      type: [
        {
          season_number: { type: Number, required: true },
          release_year: { type: Number, required: true },
          episodes: [
            {
              episode_number: { type: Number, required: true },
              title: { type: String, required: true },
              videoLink: { type: String, required: true },
              downloadLink: { type: String, required: true },
              runtime_minutes: { type: String, required: true },
              plot: { type: String, required: true },
            },
          ],
        },
      ],
      default: [],
    },
  },
  { timestamps: true },
);

export const seriesModle =
  mongoose.models.web_series || mongoose.model("web_series", SeriesSchema);
