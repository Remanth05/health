import Medicine from "../models/Medicine.js";

export const getAllMedicines = async (req, res) => {
  try {
    const medicines = await Medicine.find({ isActive: true });
    res.json(medicines);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch medicines" });
  }
};

export const getMedicineById = async (req, res) => {
  try {
    const { medicineId } = req.params;
    const medicine = await Medicine.findById(medicineId);

    if (!medicine) {
      return res.status(404).json({ error: "Medicine not found" });
    }

    res.json(medicine);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch medicine" });
  }
};

export const createMedicine = async (req, res) => {
  try {
    const { name, genericName, manufacturer, category, dosage, price, quantity, unit, description, sideEffects, contraindications } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Medicine name is required" });
    }

    const existingMedicine = await Medicine.findOne({ name });
    if (existingMedicine) {
      return res.status(400).json({ error: "Medicine already exists" });
    }

    const medicine = new Medicine({
      name,
      genericName,
      manufacturer,
      category,
      dosage,
      price,
      quantity,
      unit,
      description,
      sideEffects,
      contraindications,
    });

    await medicine.save();
    res.status(201).json(medicine);
  } catch (error) {
    console.error("Error creating medicine:", error);
    res.status(500).json({ error: "Failed to create medicine" });
  }
};

export const updateMedicine = async (req, res) => {
  try {
    const { medicineId } = req.params;
    const { name, genericName, manufacturer, category, dosage, price, quantity, unit, description, sideEffects, contraindications, isActive } = req.body;

    const medicine = await Medicine.findById(medicineId);
    if (!medicine) {
      return res.status(404).json({ error: "Medicine not found" });
    }

    if (name && name !== medicine.name) {
      const existingMedicine = await Medicine.findOne({ name });
      if (existingMedicine) {
        return res.status(400).json({ error: "Medicine name already exists" });
      }
      medicine.name = name;
    }

    if (genericName) medicine.genericName = genericName;
    if (manufacturer) medicine.manufacturer = manufacturer;
    if (category) medicine.category = category;
    if (dosage) medicine.dosage = dosage;
    if (price !== undefined) medicine.price = price;
    if (quantity !== undefined) medicine.quantity = quantity;
    if (unit) medicine.unit = unit;
    if (description) medicine.description = description;
    if (sideEffects) medicine.sideEffects = sideEffects;
    if (contraindications) medicine.contraindications = contraindications;
    if (isActive !== undefined) medicine.isActive = isActive;

    await medicine.save();
    res.json(medicine);
  } catch (error) {
    console.error("Error updating medicine:", error);
    res.status(500).json({ error: "Failed to update medicine" });
  }
};

export const deleteMedicine = async (req, res) => {
  try {
    const { medicineId } = req.params;

    const medicine = await Medicine.findById(medicineId);
    if (!medicine) {
      return res.status(404).json({ error: "Medicine not found" });
    }

    medicine.isActive = false;
    await medicine.save();

    res.json({ message: "Medicine deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete medicine" });
  }
};

export const updateInventory = async (req, res) => {
  try {
    const { medicineId } = req.params;
    const { quantityChange } = req.body;

    if (quantityChange === undefined) {
      return res.status(400).json({ error: "Quantity change is required" });
    }

    const medicine = await Medicine.findById(medicineId);
    if (!medicine) {
      return res.status(404).json({ error: "Medicine not found" });
    }

    medicine.quantity += quantityChange;

    if (medicine.quantity < 0) {
      return res.status(400).json({ error: "Insufficient inventory" });
    }

    await medicine.save();
    res.json(medicine);
  } catch (error) {
    res.status(500).json({ error: "Failed to update inventory" });
  }
};

export const getLowStockMedicines = async (req, res) => {
  try {
    const medicines = await Medicine.find({ 
      isActive: true,
      quantity: { $lt: 10 }
    });

    res.json(medicines);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch low stock medicines" });
  }
};
