import express from "express";
import Appointment from "../models/Appointment.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

router.get("/", async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate("patient")
      .populate("doctor")
      .populate("department");
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch appointments" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id)
      .populate("patient")
      .populate("doctor")
      .populate("department");
    res.json(appointment);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch appointment" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { doctor, appointmentDate, timeSlot, reason, department } = req.body;
    const patientId = req.user.id;

    if (!doctor || !appointmentDate || !timeSlot) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const appointment = new Appointment({
      patient: patientId,
      doctor,
      appointmentDate,
      timeSlot,
      reason,
      department,
      status: "scheduled",
    });

    await appointment.save();
    const populatedAppointment = await appointment.populate([
      { path: "patient" },
      { path: "doctor" },
      { path: "department" },
    ]);

    res.status(201).json(populatedAppointment);
  } catch (error) {
    console.error("Error creating appointment:", error);
    res.status(500).json({ error: "Failed to create appointment" });
  }
});

export default router;
