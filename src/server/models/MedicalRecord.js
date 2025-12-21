import mongoose from "mongoose";

const medicalRecordSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    appointment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    recordType: {
      type: String,
      enum: ["consultation", "lab", "imaging", "procedure", "vaccination"],
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    findings: {
      type: String,
    },
    attachments: [
      {
        fileName: String,
        fileUrl: String,
        uploadDate: Date,
      },
    ],
    isPrivate: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("MedicalRecord", medicalRecordSchema);
