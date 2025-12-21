import express from "express";
import Billing from "../models/Billing.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

router.get("/", async (req, res) => {
  try {
    const billings = await Billing.find().populate("patient").populate("appointment");
    res.json(billings);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch billing information" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const billing = await Billing.findById(req.params.id)
      .populate("patient")
      .populate("appointment");
    res.json(billing);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch billing information" });
  }
});

export default router;
