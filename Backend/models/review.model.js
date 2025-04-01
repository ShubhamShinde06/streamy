import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  reviewer: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
});

export const reviewModel =
  mongoose.models.review || mongoose.model("review", reviewSchema);
