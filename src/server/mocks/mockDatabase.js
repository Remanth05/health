// In-memory mock database for development/testing
// This simulates MongoDB without requiring an actual database server

const mockDatabase = {
  users: [],
  departments: [],
  appointments: [],
  prescriptions: [],
  medicalRecords: [],
  billings: [],
};

let idCounter = {
  users: 1,
  departments: 1,
  appointments: 1,
  prescriptions: 1,
  medicalRecords: 1,
  billings: 1,
};

// Mock User model
export class User {
  constructor(data) {
    this._id = String(idCounter.users++);
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.email = data.email;
    this.password = data.password;
    this.phone = data.phone || "";
    this.role = data.role || "patient";
    this.isActive = data.isActive !== false;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  async save() {
    // Check if user already exists
    const existing = mockDatabase.users.find((u) => u.email === this.email);
    if (existing && existing._id !== this._id) {
      const error = new Error("Email already registered");
      error.code = 11000;
      throw error;
    }

    const index = mockDatabase.users.findIndex((u) => u._id === this._id);
    if (index >= 0) {
      mockDatabase.users[index] = this;
    } else {
      mockDatabase.users.push(this);
    }
    return this;
  }

  async comparePassword(enteredPassword) {
    // Simple mock comparison (in real app, use bcrypt)
    // For testing, just compare directly
    return enteredPassword === this.password;
  }

  toJSON() {
    const { password, ...rest } = this;
    return rest;
  }

  static async findOne(query) {
    const key = Object.keys(query)[0];
    const value = query[key];
    return mockDatabase.users.find((u) => u[key] === value);
  }

  static async findById(id) {
    return mockDatabase.users.find((u) => u._id === id);
  }

  static async countDocuments(query = {}) {
    if (Object.keys(query).length === 0) {
      return mockDatabase.users.length;
    }
    const key = Object.keys(query)[0];
    const value = query[key];
    return mockDatabase.users.filter((u) => u[key] === value).length;
  }

  static async find(query = {}) {
    if (Object.keys(query).length === 0) {
      return mockDatabase.users;
    }
    const key = Object.keys(query)[0];
    const value = query[key];
    return mockDatabase.users.filter((u) => u[key] === value);
  }

  select(fields) {
    return this;
  }

  populate(field) {
    return this;
  }
}

// Mock Department model
export class Department {
  constructor(data) {
    this._id = String(idCounter.departments++);
    this.name = data.name;
    this.description = data.description || "";
    this.icon = data.icon || "";
    this.doctors = data.doctors || [];
    this.isActive = data.isActive !== false;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  async save() {
    const index = mockDatabase.departments.findIndex((d) => d._id === this._id);
    if (index >= 0) {
      mockDatabase.departments[index] = this;
    } else {
      mockDatabase.departments.push(this);
    }
    return this;
  }

  static async find(query = {}) {
    if (Object.keys(query).length === 0) {
      return mockDatabase.departments;
    }
    const key = Object.keys(query)[0];
    const value = query[key];
    return mockDatabase.departments.filter((d) => d[key] === value);
  }

  static async countDocuments(query = {}) {
    return mockDatabase.departments.length;
  }

  populate(field) {
    return this;
  }
}

// Mock Appointment model
export class Appointment {
  constructor(data) {
    this._id = String(idCounter.appointments++);
    this.patient = data.patient;
    this.doctor = data.doctor;
    this.department = data.department;
    this.appointmentDate = data.appointmentDate;
    this.timeSlot = data.timeSlot;
    this.status = data.status || "scheduled";
    this.reason = data.reason || "";
    this.notes = data.notes || "";
    this.diagnosis = data.diagnosis || "";
    this.prescription = data.prescription || null;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  async save() {
    const index = mockDatabase.appointments.findIndex((a) => a._id === this._id);
    if (index >= 0) {
      mockDatabase.appointments[index] = this;
    } else {
      mockDatabase.appointments.push(this);
    }
    return this;
  }

  static async find(query = {}) {
    let results = [...mockDatabase.appointments];
    Object.keys(query).forEach((key) => {
      results = results.filter((a) => String(a[key]) === String(query[key]));
    });
    return results;
  }

  static async countDocuments(query = {}) {
    return mockDatabase.appointments.length;
  }

  static async findById(id) {
    return mockDatabase.appointments.find((a) => a._id === id);
  }

  static async aggregate(pipeline) {
    // Simple mock aggregation for group by status
    const groupStage = pipeline.find((p) => p.$group);
    if (groupStage && groupStage.$group._id) {
      const groupBy = groupStage.$group._id;
      const grouped = {};
      mockDatabase.appointments.forEach((a) => {
        const key = a[groupBy];
        if (!grouped[key]) {
          grouped[key] = { _id: key, count: 0 };
        }
        grouped[key].count++;
      });
      return Object.values(grouped);
    }
    return mockDatabase.appointments;
  }

  populate(field) {
    return this;
  }
}

// Mock Prescription model
export class Prescription {
  constructor(data) {
    this._id = String(idCounter.prescriptions++);
    this.appointment = data.appointment;
    this.patient = data.patient;
    this.doctor = data.doctor;
    this.medications = data.medications || [];
    this.notes = data.notes || "";
    this.issuedDate = data.issuedDate || new Date();
    this.expiryDate = data.expiryDate;
    this.status = data.status || "active";
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  async save() {
    const index = mockDatabase.prescriptions.findIndex((p) => p._id === this._id);
    if (index >= 0) {
      mockDatabase.prescriptions[index] = this;
    } else {
      mockDatabase.prescriptions.push(this);
    }
    return this;
  }

  static async find(query = {}) {
    let results = [...mockDatabase.prescriptions];
    Object.keys(query).forEach((key) => {
      results = results.filter((p) => String(p[key]) === String(query[key]));
    });
    return results;
  }

  populate(field) {
    return this;
  }
}

// Mock MedicalRecord model
export class MedicalRecord {
  constructor(data) {
    this._id = String(idCounter.medicalRecords++);
    this.patient = data.patient;
    this.appointment = data.appointment || null;
    this.doctor = data.doctor;
    this.recordType = data.recordType;
    this.description = data.description;
    this.findings = data.findings || "";
    this.attachments = data.attachments || [];
    this.isPrivate = data.isPrivate || false;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  async save() {
    const index = mockDatabase.medicalRecords.findIndex((m) => m._id === this._id);
    if (index >= 0) {
      mockDatabase.medicalRecords[index] = this;
    } else {
      mockDatabase.medicalRecords.push(this);
    }
    return this;
  }

  static async find(query = {}) {
    let results = [...mockDatabase.medicalRecords];
    Object.keys(query).forEach((key) => {
      results = results.filter((m) => String(m[key]) === String(query[key]));
    });
    return results;
  }

  populate(field) {
    return this;
  }
}

// Mock Billing model
export class Billing {
  constructor(data) {
    this._id = String(idCounter.billings++);
    this.patient = data.patient;
    this.appointment = data.appointment;
    this.invoiceNumber = data.invoiceNumber;
    this.items = data.items || [];
    this.subtotal = data.subtotal || 0;
    this.tax = data.tax || 0;
    this.discount = data.discount || 0;
    this.total = data.total || 0;
    this.amountPaid = data.amountPaid || 0;
    this.amountDue = data.amountDue || 0;
    this.paymentMethod = data.paymentMethod || "";
    this.status = data.status || "pending";
    this.dueDate = data.dueDate;
    this.paidDate = data.paidDate;
    this.notes = data.notes || "";
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  async save() {
    const index = mockDatabase.billings.findIndex((b) => b._id === this._id);
    if (index >= 0) {
      mockDatabase.billings[index] = this;
    } else {
      mockDatabase.billings.push(this);
    }
    return this;
  }

  static async find(query = {}) {
    let results = [...mockDatabase.billings];
    Object.keys(query).forEach((key) => {
      results = results.filter((b) => String(b[key]) === String(query[key]));
    });
    return results;
  }

  populate(field) {
    return this;
  }
}

export default mockDatabase;
