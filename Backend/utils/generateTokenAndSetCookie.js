import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (res, userId) => {
  if (!process.env.JWT_SECRET) {
    return res.json("JWT_SECRET is missing");
  }

  const token = jwt.sign({ userId }, 'streamyeasytowatch', {
    expiresIn: "7d",
  });

  res.cookie("token", token, {
    httpOnly: true, // Prevents JavaScript access
    secure: process.env.NODE_ENV === "production", // Ensures it works only over HTTPS
    sameSite: "None", // Allows cross-site cookies
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  return token;
};

export default generateTokenAndSetCookie;
