import User from "../models/User.js";
import Department from "../models/Department.js";
import Appointment from "../models/Appointment.js";
import Billing from "../models/Billing.js";

export const getDashboardStats = async (req, res) => {
  try {
    const totalDoctors = await User.countDocuments({ role: "doctor" });
    const totalPatients = await User.countDocuments({ role: "patient" });
    const totalAppointments = await Appointment.countDocuments();
    const totalDepartments = await Department.countDocuments();

    const appointmentStats = await Appointment.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    const revenueStats = await Billing.aggregate([
      {
        $group: {
          _id: "$status",
          total: { $sum: "$total" },
        },
      },
    ]);

    res.json({
      totalDoctors,
      totalPatients,
      totalAppointments,
      totalDepartments,
      appointmentStats,
      revenueStats,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch dashboard stats" });
  }
};

export const getAllDoctors = async (req, res) => {
  try {
    const doctors = await User.find({ role: "doctor" }).populate("department");
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch doctors" });
  }
};

export const getAllPatients = async (req, res) => {
  try {
    const patients = await User.find({ role: "patient" });
    res.json(patients);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch patients" });
  }
};

export const getAllDepartments = async (req, res) => {
  try {
    const departments = await Department.find().populate("head");
    res.json(departments);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch departments" });
  }
};

export const createDepartment = async (req, res) => {
  try {
    const { name, description, icon } = req.body;

    const department = new Department({
      name,
      description,
      icon,
    });

    await department.save();
    res.status(201).json(department);
  } catch (error) {
    res.status(500).json({ error: "Failed to create department" });
  }
};

export const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate("patient")
      .populate("doctor")
      .populate("department");
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch appointments" });
  }
};

export const getBillingInfo = async (req, res) => {
  try {
    const billings = await Billing.find().populate("patient").populate("appointment");
    res.json(billings);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch billing information" });
  }
};
