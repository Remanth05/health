import Appointment from "../models/Appointment.js";
import Prescription from "../models/Prescription.js";
import MedicalRecord from "../models/MedicalRecord.js";
import User from "../models/User.js";

export const bookAppointment = async (req, res) => {
  try {
    const { doctorId, departmentId, appointmentDate, timeSlot, reason } = req.body;

    const appointment = new Appointment({
      patient: req.user.id,
      doctor: doctorId,
      department: departmentId,
      appointmentDate,
      timeSlot,
      reason,
    });

    await appointment.save();
    res.status(201).json(appointment);
  } catch (error) {
    res.status(500).json({ error: "Failed to book appointment" });
  }
};

export const getMyAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({
      patient: req.user.id,
    })
      .populate("doctor")
      .populate("department");

    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch appointments" });
  }
};

export const cancelAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.params;

    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }

    if (appointment.patient.toString() !== req.user.id) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    appointment.status = "cancelled";
    await appointment.save();

    res.json(appointment);
  } catch (error) {
    res.status(500).json({ error: "Failed to cancel appointment" });
  }
};

export const getMyPrescriptions = async (req, res) => {
  try {
    const prescriptions = await Prescription.find({
      patient: req.user.id,
    }).populate("doctor");

    res.json(prescriptions);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch prescriptions" });
  }
};

export const getMyMedicalRecords = async (req, res) => {
  try {
    const records = await MedicalRecord.find({
      patient: req.user.id,
    }).populate("doctor");

    res.json(records);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch medical records" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      phone,
      address,
      city,
      state,
      zipCode,
      dateOfBirth,
      gender,
      medicalHistory,
      allergies,
    } = req.body;

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (phone) user.phone = phone;
    if (address) user.address = address;
    if (city) user.city = city;
    if (state) user.state = state;
    if (zipCode) user.zipCode = zipCode;
    if (dateOfBirth) user.dateOfBirth = dateOfBirth;
    if (gender) user.gender = gender;
    if (medicalHistory) user.medicalHistory = medicalHistory;
    if (allergies) user.allergies = allergies;

    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to update profile" });
  }
};
