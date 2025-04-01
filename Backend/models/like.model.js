import mongoose from "mongoose";

const likeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user", // Reference to User model
      required: true,
    },
    contentId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    contentType: {
      type: String,
      enum: ["movie", "web_series"], // Identify if it’s a movie or web series
      required: true,
    },
  },
  { timestamps: true },
);

export const likeModel =
  mongoose.models.Like || mongoose.model("Like", likeSchema);
