import { Router } from "express";
import verifyToken from "../middleware/verifyToken.js";
import {
  addReport,
  deleteReport,
  getReport,
} from "../controllers/report.controller.js";

const route = Router();

route.post("/add", verifyToken, addReport);
route.get("/get", getReport);
route.post("/delete", deleteReport);

export default route;
