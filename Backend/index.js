import app from "./app.js";
import dotenv from "dotenv";
import connectDB from "./db/index.db.js";
import connectCloudinary from "./utils/cloudinary.utils.js";
import path from "path";
import express from "express";

dotenv.config();

// const __dirname = path.resolve();
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "/frontend/dist")));

//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
//   });
// } else {
//   app.get("/", (req, res) => {
//     res.send("API is Running Successfully");
//   });
// }

connectCloudinary();
connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`server is running at port : ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log("Soory not working", error);
  });
