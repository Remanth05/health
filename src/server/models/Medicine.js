import mongoose from "mongoose";

const medicineSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    genericName: {
      type: String,
    },
    manufacturer: {
      type: String,
    },
    category: {
      type: String,
      enum: [
        "antibiotic",
        "pain-relief",
        "allergy",
        "cardiovascular",
        "diabetes",
        "respiratory",
        "digestive",
        "general",
      ],
      default: "general",
    },
    dosage: {
      type: String,
    },
    price: {
      type: Number,
      default: 0,
    },
    quantity: {
      type: Number,
      default: 0,
    },
    unit: {
      type: String,
      default: "tablets",
    },
    description: {
      type: String,
    },
    sideEffects: {
      type: String,
    },
    contraindications: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Medicine", medicineSchema);
