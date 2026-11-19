
import "dotenv/config";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "15m";

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is missing from environment variables");
}

export const generateToken = (user) => {
  return jwt.sign(
    {
      email: user.email,
      role: user.role
    },
    JWT_SECRET,
    {
      subject: String(user.id),
      expiresIn: JWT_EXPIRES_IN,
      algorithm: "HS256"
    }
  );
};

export const verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET, {
    algorithms: ["HS256"]
  });
};
