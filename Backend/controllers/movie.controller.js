import { v2 as cloudinary } from "cloudinary";
import { movieModel } from "../models/movie.model.js";
import mongoose from "mongoose";

export const uploadMovie = async (req, res) => {
  const {
    title,
    release_year,
    runtime_minutes,
    director,
    genre,
    plot,
    rating,
    video_link,
    download_link,
    characters,
    poster,
  } = req.body;

  try {
    const parsedGenre = JSON.parse(genre);
    const parsedCharacters = JSON.parse(characters);

    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];

    const images = [image1, image2].filter((item) => item !== undefined);

    let imagesUrl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image", // Specify that the resource is an image
          use_filename: true, // Use the original file name
          unique_filename: false, // Avoid generating a random unique name
        });
        return result.secure_url;
      }),
    );

    const movieData = {
      title,
      image: imagesUrl,
      release_year,
      runtime_minutes,
      director,
      genre: parsedGenre,
      plot,
      rating,
      video_link,
      download_link,
      characters: parsedCharacters,
      poster: poster === "true" ? true : false,
    };

    const movie = new movieModel(movieData);
    await movie.save();

    res.status(201).json({
      success: true,
      message: "Movie Added",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server down uploadMovie",
    });
  }
};

export const getMovies = async (req, res) => {
  try {
    const movies = await movieModel.find();
    const countMovies = await movieModel.countDocuments()

    res.status(200).json({
      success: true,
      total: countMovies,
      movies,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server down getMovies",
    });
  }
};

export const deleteMovie = async (req, res) => {
  try {
    const { id } = req.params;

    const movie = await movieModel.findByIdAndDelete(id);

    if (!movie) {
      res.status(404).json({
        success: false,
        message: "movie not found!",
      });
    }

    res.json({
      success: true,
      message: "Movie deleted",
    });
  } catch (error) {
    res.status(500).json({ message: "Error deleteMovie ", error });
  }
};

export const singleMovie = async (req, res) => {
  try {
    const { id } = req.params;

    const movie = await movieModel.findById(id);
    res.json({
      success: true,
      movie,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error in singleMovie",
    });
  }
};

export const updateMovie = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid movie ID" });
    }

    const updatedMovie = await movieModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedMovie) {
      return res.status(404).json({ error: "movie not found" });
    }
    return res.status(200).json({
      success: true,
      message: "updated",
      updatedMovie,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "server error updateMovie",
    });
  }
};
