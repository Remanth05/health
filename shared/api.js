// Shared API interfaces and types for client-server communication
// This file exports types that both client and server can use

export const USER_ROLES = {
  ADMIN: "admin",
  DOCTOR: "doctor",
  PATIENT: "patient",
};

export const APPOINTMENT_STATUS = {
  SCHEDULED: "scheduled",
  COMPLETED: "completed",
  CANCELLED: "cancelled",
  RESCHEDULED: "rescheduled",
};

export const PRESCRIPTION_STATUS = {
  ACTIVE: "active",
  EXPIRED: "expired",
  CANCELLED: "cancelled",
};

export const BILLING_STATUS = {
  PENDING: "pending",
  PAID: "paid",
  PARTIALLY_PAID: "partially_paid",
  OVERDUE: "overdue",
};

export const RECORD_TYPE = {
  CONSULTATION: "consultation",
  LAB: "lab",
  IMAGING: "imaging",
  PROCEDURE: "procedure",
  VACCINATION: "vaccination",
};

// API Response Types
export const ApiResponse = {
  success: (data, message = "Success") => ({
    success: true,
    message,
    data,
  }),
  error: (message = "Error", code = "ERROR") => ({
    success: false,
    message,
    code,
  }),
};
