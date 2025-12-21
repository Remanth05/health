import express from "express";
import {
  getDashboardStats,
  getAllDoctors,
  getAllPatients,
  getAllDepartments,
  createDepartment,
  getAllAppointments,
  getBillingInfo,
} from "../controllers/adminController.js";
import { authMiddleware, roleMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);
router.use(roleMiddleware(["admin"]));

router.get("/dashboard-stats", getDashboardStats);
router.get("/doctors", getAllDoctors);
router.get("/patients", getAllPatients);
router.get("/departments", getAllDepartments);
router.post("/departments", createDepartment);
router.get("/appointments", getAllAppointments);
router.get("/billing", getBillingInfo);

export default router;
