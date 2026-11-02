
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import employeeRoutes from "./routes/employeeRoutes.js";

dotenv.config();

const app = express();

// 1. Middleware
app.use(cors());
app.use(express.json());

// 2. Request logger middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// 3. Health check API
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "ScopeBoard API is running",
  });
});

// 4. Employee routes
app.use("/api/employees", employeeRoutes);

// 5. Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
