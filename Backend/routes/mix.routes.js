import { Router } from "express";
import {
  toggleLike,
  countView,
  getAllContent,
  checkLike,
} from "../controllers/mix.controller.js";

const route = Router();

route.get("/get-mix", getAllContent);
route.get("/check-like/:userId/:contentId", checkLike);

route.post("/content/:id", countView);
route.post("/toggle-like", toggleLike);

export default route;
