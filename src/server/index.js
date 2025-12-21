import "dotenv/config";
import express from "express";
import cors from "cors";

// Use mock database instead of MongoDB for development
const USE_MOCK_DB = process.env.USE_MOCK_DB !== "false";

if (!USE_MOCK_DB) {
  try {
    import("mongoose").then((mongooseModule) => {
      const mongoose = mongooseModule.default;
      const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017/hospital-ms";
      mongoose
        .connect(mongoUri, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        })
        .catch((err) => console.error("MongoDB connection error:", err));
    });
  } catch (err) {
    console.warn("MongoDB not available, using mock database");
  }
}

// Routes
import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import doctorRoutes from "./routes/doctorRoutes.js";
import patientRoutes from "./routes/patientRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";
import prescriptionRoutes from "./routes/prescriptionRoutes.js";
import billingRoutes from "./routes/billingRoutes.js";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // API Routes
  app.use("/api/auth", authRoutes);
  app.use("/api/admin", adminRoutes);
  app.use("/api/doctor", doctorRoutes);
  app.use("/api/patient", patientRoutes);
  app.use("/api/appointments", appointmentRoutes);
  app.use("/api/prescriptions", prescriptionRoutes);
  app.use("/api/billing", billingRoutes);

  // Health check
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", message: "Hospital Management System API" });
  });

  return app;
}
