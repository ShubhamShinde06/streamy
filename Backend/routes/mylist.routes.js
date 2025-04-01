import { Router } from "express";
import {
  addToList,
  deleteToList,
  getToList,
} from "../controllers/mylist.controller.js";
import verifyToken from "../middleware/verifyToken.js";

const route = Router();

route.post("/add", verifyToken, addToList);
route.get("/get/:userId", verifyToken, getToList);
route.delete("/delete/:saveId/:userId", verifyToken, deleteToList);

export default route;
