import { seriesModle } from "../models/webseries.model.js";
import { movieModel } from "../models/movie.model.js";
import { likeModel } from "../models/like.model.js";
import mongoose from "mongoose";

export const getAllContent = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 7;

    // Filter query
    const query = {};
    if (req.query.poster === "true") {
      query.poster = true;
    }

    // Fetch both movies and series asynchronously
    const [seriesResult, movieResult] = await Promise.allSettled([
      seriesModle.find(query).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit),
      movieModel.find(query).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit),
    ]);

    // Extract fulfilled results
    const series = seriesResult.status === "fulfilled" ? seriesResult.value : [];
    const movies = movieResult.status === "fulfilled" ? movieResult.value : [];

    // Merge and sort results
    const allContent = [...series, ...movies];

    // Count total documents
    const totalMovies = await movieModel.countDocuments(query);
    const totalShows = await seriesModle.countDocuments(query);
    const totalContent = totalMovies + totalShows;

    // Correct hasMore logic
    const hasMore = (page * limit) < totalContent;

    res.status(200).json({
      success: true,
      data: allContent,
      hasMore,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server down getAllContent",
    });
  }
};




export const countView = async (req, res) => {
  try {
    const { id } = req.params;

    // Try to find the content in movies or series
    const movie = await movieModel.findById(id);
    const series = await seriesModle.findById(id);

    const content = movie || series;

    if (!content) {
      return res
        .status(404)
        .json({ success: false, message: "Content not found" });
    }

    // Increment the visit count
    content.visitCount = (content.visitCount || 0) + 1;
    await content.save();

    res.status(200).json({ success: true, visitCount: content.visitCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error updating visit count",
      error: error.message,
    });
  }
};

export const toggleLike = async (req, res) => {
  try {
    const { userId, contentId, contentType } = req.body;

    if (!userId || !contentId || !contentType) {
      return res
        .status(400)
        .json({ error: "User ID, Content ID, and Content Type are required" });
    }

    if (!["movie", "web_series"].includes(contentType)) {
      return res.status(400).json({ error: "Invalid content type" });
    }

    // Determine the correct model based on contentType
    const contentModel = contentType === "movie" ? movieModel : seriesModle;

    // Check if user already liked the content
    const existingLike = await likeModel.findOne({ userId, contentId });

    if (existingLike) {
      // User wants to unlike (remove like)
      await likeModel.findOneAndDelete({ userId, contentId });
      await contentModel.findByIdAndUpdate(contentId, {
        $inc: { likeCount: -1 },
      }); // Decrease like count
      return res.json({ message: `${contentType} unliked!`, liked: false });
    }

    // User wants to like
    await new likeModel({ userId, contentId, contentType }).save();
    await contentModel.findByIdAndUpdate(contentId, { $inc: { likeCount: 1 } }); // Increase like count

    res.json({ message: `${contentType} liked!`, liked: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const checkLike = async (req, res) => {
  try {
    const { userId, contentId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId, contentId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid series ID",
      });
    }

    if (!userId || !contentId) {
      return res
        .status(400)
        .json({ error: "User ID and Content ID are required" });
    }

    const existingLike = await likeModel.findOne({ userId, contentId });

    res.json({ isLiked: !!existingLike }); // Return true if liked, false otherwise
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
