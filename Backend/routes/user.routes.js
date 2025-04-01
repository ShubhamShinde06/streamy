import { Router } from "express";
import verifyToken from "../middleware/verifyToken.js";
import {
  adminAllusers,
  adminLogin,
  checkAuth,
  forgotPassword,
  login,
  logout,
  resetPassword,
  signUp,
  verifyEmail,
} from "../controllers/user.controller.js";

const route = Router();

route.get("/check-auth", verifyToken, checkAuth);

route.post("/signup", signUp);
route.post("/logout", logout);
route.post("/login", login);
route.post("/admin-login", adminLogin);

route.get("/users-get", adminAllusers);

route.post("/verify-email", verifyEmail);
route.post("/forgot-password", forgotPassword);
route.post("/reset-password/:token", resetPassword);

export default route;
