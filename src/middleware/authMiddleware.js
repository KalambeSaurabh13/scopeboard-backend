
import { verifyToken } from "../utils/jwtUtils.js";

export const authenticateToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Authentication token is required"
      });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Invalid authentication token"
      });
    }

    // Verify signature and expiry
    const decoded = verifyToken(token);

    // Attach verified identity to request
    req.user = {
      id: Number(decoded.sub),
      email: decoded.email,
      role: decoded.role
    };
console.log(req.user.role);
    next();

  } catch (error) {
    if (
      error.name === "TokenExpiredError" ||
      error.name === "JsonWebTokenError" ||
      error.name === "NotBeforeError"
    ) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired token"
      });
    }

    next(error);
  }
};
