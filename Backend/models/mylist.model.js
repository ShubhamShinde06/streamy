import mongoose from "mongoose";

const mylistSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  itemId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: "itemType",
  },
  itemType: {
    type: String,
    enum: ["movie", "web_series"],
    required: true,
  },
});

export const listModel =
  mongoose.models.mylist || mongoose.model("mylist", mylistSchema);
