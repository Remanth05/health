import express from "express";
import {
  bookAppointment,
  getMyAppointments,
  cancelAppointment,
  getMyPrescriptions,
  getMyMedicalRecords,
  updateProfile,
} from "../controllers/patientController.js";
import { authMiddleware, roleMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);
router.use(roleMiddleware(["patient"]));

router.post("/appointments", bookAppointment);
router.get("/appointments", getMyAppointments);
router.delete("/appointments/:appointmentId", cancelAppointment);
router.get("/prescriptions", getMyPrescriptions);
router.get("/medical-records", getMyMedicalRecords);
router.put("/profile", updateProfile);

export default router;
