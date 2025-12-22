import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";

// Routes
import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import doctorRoutes from "./routes/doctorRoutes.js";
import patientRoutes from "./routes/patientRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";
import prescriptionRoutes from "./routes/prescriptionRoutes.js";
import billingRoutes from "./routes/billingRoutes.js";
import publicDoctorRoutes from "./routes/publicDoctorRoutes.js";
import medicineRoutes from "./routes/medicineRoutes.js";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Connect to MongoDB
  const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017/hospital-ms";
  
  mongoose
    .connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("✅ MongoDB connected successfully");
    })
    .catch((err) => {
      console.error("❌ MongoDB connection error:", err.message);
    });

  // API Routes
  app.use("/api/auth", authRoutes);
  app.use("/api/admin", adminRoutes);
  app.use("/api/doctor", doctorRoutes);
  app.use("/api/patient", patientRoutes);
  app.use("/api/appointments", appointmentRoutes);
  app.use("/api/prescriptions", prescriptionRoutes);
  app.use("/api/billing", billingRoutes);
  app.use("/api/doctors", publicDoctorRoutes);

  // Health check
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", message: "Hospital Management System API" });
  });

  return app;
}
