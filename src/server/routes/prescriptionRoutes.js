import express from "express";
import Prescription from "../models/Prescription.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

router.get("/", async (req, res) => {
  try {
    const prescriptions = await Prescription.find()
      .populate("patient")
      .populate("doctor")
      .populate("appointment");
    res.json(prescriptions);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch prescriptions" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const prescription = await Prescription.findById(req.params.id)
      .populate("patient")
      .populate("doctor")
      .populate("appointment");
    res.json(prescription);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch prescription" });
  }
});

export default router;
