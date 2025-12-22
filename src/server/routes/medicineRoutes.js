import express from "express";
import {
  getAllMedicines,
  getMedicineById,
  createMedicine,
  updateMedicine,
  deleteMedicine,
  updateInventory,
  getLowStockMedicines,
} from "../controllers/medicineController.js";
import { authMiddleware, roleMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public routes - anyone can view medicines
router.get("/", getAllMedicines);
router.get("/:medicineId", getMedicineById);

// Protected routes - only admin can manage medicines
router.use(authMiddleware);
router.use(roleMiddleware(["admin"]));

router.post("/", createMedicine);
router.put("/:medicineId", updateMedicine);
router.delete("/:medicineId", deleteMedicine);
router.patch("/:medicineId/inventory", updateInventory);
router.get("/low-stock", getLowStockMedicines);

export default router;
