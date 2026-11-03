
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import employeeRoutes from "./routes/employeeRoutes.js";
import requestLogger from "./middleware/requestLogger.js";
import notFound from "./middleware/notFound.js";
import { errorHandler } from "./middleware/errorHandler.js";

dotenv.config();

const app = express();

// 1. Built-in and third-party middleware
app.use(cors());
app.use(express.json());

// 2. Custom middleware
app.use(requestLogger);

// 3. Health check
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "ScopeBoard API is running",
  });
});

// 4. Application routes
app.use("/api/employees", employeeRoutes);

// 5. Handle unknown routes
app.use(notFound);

// 6. Centralized error handler (always last)
app.use(errorHandler);

// 7. Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
