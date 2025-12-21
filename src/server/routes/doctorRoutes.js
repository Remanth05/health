import express from "express";
import {
  getDoctorAppointments,
  updateAppointmentDiagnosis,
  writePrescription,
  getPatientMedicalHistory,
  createMedicalRecord,
} from "../controllers/doctorController.js";
import { authMiddleware, roleMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);
router.use(roleMiddleware(["doctor"]));

router.get("/appointments", getDoctorAppointments);
router.put("/appointments/:appointmentId/diagnosis", updateAppointmentDiagnosis);
router.post("/prescriptions", writePrescription);
router.get("/patients/:patientId/medical-history", getPatientMedicalHistory);
router.post("/medical-records", createMedicalRecord);

export default router;
