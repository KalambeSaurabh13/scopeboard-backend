
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import employeeRoutes from "./routes/employeeRoutes.js";
import requestLogger from "./middleware/requestLogger.js";
import notFound from "./middleware/notFound.js";
import { errorHandler } from "./middleware/errorHandler.js";
import documentRoutes from "./routes/documentRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import departmentRoutes from "./routes/departmentRoutes.js";

import helmet from "helmet";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger.js";

dotenv.config();
const allowedOrigins = [
    "http://localhost:5173"
];
const app = express();
app.use(helmet());
// 1. Built-in and third-party middleware
app.use(cors({
    origin: ["http://localhost:5173","http://localhost:5174"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

// 3. Parse JSON
app.use(express.json({ limit: "100kb" }));

// 4. Request logging
app.use((req, res, next) => {
    console.log(req.method, req.url);
    next();
});

// 3. Health check
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "ScopeBoard API is running",
  });
});

// 4. Application routes
app.use("/api/auth", authRoutes);


app.use("/api/employees", employeeRoutes);
app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec)
);
app.use("/api/documents", documentRoutes);
app.use("/api/departments", departmentRoutes);

// 5. Handle unknown routes
app.use(notFound);

// 6. Centralized error handler (always last)
app.use(errorHandler);


// 7. Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
