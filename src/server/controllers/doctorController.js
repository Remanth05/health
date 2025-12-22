import Appointment from "../models/Appointment.js";
import Prescription from "../models/Prescription.js";
import MedicalRecord from "../models/MedicalRecord.js";
import User from "../models/User.js";

export const getAllDoctors = async (req, res) => {
  try {
    const doctors = await User.find({
      role: "doctor",
      isActive: true,
    }).select("-password");

    res.json(doctors);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch doctors" });
  }
};

export const getDoctorById = async (req, res) => {
  try {
    const { doctorId } = req.params;

    const doctor = await User.findOne({
      _id: doctorId,
      role: "doctor",
      isActive: true,
    }).select("-password");

    if (!doctor) {
      return res.status(404).json({ error: "Doctor not found" });
    }

    res.json(doctor);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch doctor" });
  }
};

export const getDoctorAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({
      doctor: req.user.id,
    })
      .populate("patient")
      .populate("department");

    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch appointments" });
  }
};

export const updateAppointmentDiagnosis = async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const { diagnosis, notes } = req.body;

    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }

    appointment.diagnosis = diagnosis;
    appointment.notes = notes;
    appointment.status = "completed";

    await appointment.save();
    res.json(appointment);
  } catch (error) {
    res.status(500).json({ error: "Failed to update appointment" });
  }
};

export const writePrescription = async (req, res) => {
  try {
    const { appointmentId, medications, expiryDate, notes } = req.body;

    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }

    const prescription = new Prescription({
      appointment: appointmentId,
      patient: appointment.patient,
      doctor: req.user.id,
      medications,
      expiryDate,
      notes,
    });

    await prescription.save();
    appointment.prescription = prescription._id;
    await appointment.save();

    res.status(201).json(prescription);
  } catch (error) {
    res.status(500).json({ error: "Failed to create prescription" });
  }
};

export const getPatientMedicalHistory = async (req, res) => {
  try {
    const { patientId } = req.params;

    const records = await MedicalRecord.find({
      patient: patientId,
    }).populate("doctor");

    res.json(records);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch medical history" });
  }
};

export const createMedicalRecord = async (req, res) => {
  try {
    const { patientId, recordType, description, findings } = req.body;

    const record = new MedicalRecord({
      patient: patientId,
      doctor: req.user.id,
      recordType,
      description,
      findings,
    });

    await record.save();
    res.status(201).json(record);
  } catch (error) {
    res.status(500).json({ error: "Failed to create medical record" });
  }
};
