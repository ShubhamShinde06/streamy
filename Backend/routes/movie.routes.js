import { Router } from "express";
import {
  deleteMovie,
  getMovies,
  singleMovie,
  updateMovie,
  uploadMovie,
} from "../controllers/movie.controller.js";
import upload from "../middleware/multer.middleware.js";

const route = Router();

route.post(
  "/upload",
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
  ]),
  uploadMovie,
);
route.get("/get-movies", getMovies);
route.get("/get-single-movies/:id", singleMovie);
route.delete("/delete-movie/:id", deleteMovie);
route.put("/update-movie/:id", updateMovie);

export default route;
