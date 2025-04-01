import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({
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
  selectedIssue: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

export const reportModel =
  mongoose.models.report || mongoose.model("report", reportSchema);
