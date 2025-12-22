import express from "express";
import { getAllDoctors, getDoctorById } from "../controllers/doctorController.js";

const router = express.Router();

router.get("/", getAllDoctors);
router.get("/:doctorId", getDoctorById);

export default router;
