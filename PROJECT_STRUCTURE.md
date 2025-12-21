# Hospital Management System - Project Structure Documentation

## Overview
A complete Hospital Management System built with the MERN stack (MongoDB, Express.js, React.js, Node.js) using pure JavaScript with .jsx files. The system features role-based access control (Admin, Doctor, Patient), appointment management, medical records, prescriptions, and billing.

## 📁 Complete Project Structure

```
hospital-management-system/
├── src/
│   ├── server/                          # Backend - Express.js API
│   │   ├── index.js                     # Main Express server setup
│   │   ├── node-build.js                # Node.js production entry point
│   │   │
│   │   ├── models/                      # Mongoose schemas
│   │   │   ├── User.js                  # User model (Admin, Doctor, Patient)
│   │   │   ├── Department.js            # Department model
│   │   │   ├── Appointment.js           # Appointment model
│   │   │   ├── Prescription.js          # Prescription model
│   │   │   ├── MedicalRecord.js         # Medical record model
│   │   │   └── Billing.js               # Billing/Invoice model
│   │   │
│   │   ├── controllers/                 # Route handlers
│   │   │   ├── authController.js        # Authentication (register, login)
│   │   │   ├── adminController.js       # Admin operations
│   │   │   ├── doctorController.js      # Doctor operations
│   │   │   └── patientController.js     # Patient operations
│   │   │
│   │   ├── routes/                      # API endpoints
│   │   │   ├── authRoutes.js            # /api/auth endpoints
│   │   │   ├── adminRoutes.js           # /api/admin endpoints
│   │   │   ├── doctorRoutes.js          # /api/doctor endpoints
│   │   │   ├── patientRoutes.js         # /api/patient endpoints
│   │   │   ├── appointmentRoutes.js     # /api/appointments endpoints
│   │   │   ├── prescriptionRoutes.js    # /api/prescriptions endpoints
│   │   │   └── billingRoutes.js         # /api/billing endpoints
│   │   │
│   │   └── middleware/                  # Custom middleware
│   │       └── authMiddleware.js        # JWT verification & role-based access
│   │
│   ├── pages/                           # Frontend - React pages
│   │   ├── Home.jsx                     # Landing page with hero section
│   │   ├── Login.jsx                    # User login page
│   │   ├── Register.jsx                 # User registration page
│   │   ├── NotFound.jsx                 # 404 page
│   │   ├── AdminDashboard.jsx           # Admin dashboard
│   │   ├── DoctorDashboard.jsx          # Doctor dashboard
│   │   └── PatientDashboard.jsx         # Patient dashboard
│   │
│   ├── components/                      # Reusable React components
│   │   ├── Header.jsx                   # Navigation header
│   │   └── ProtectedRoute.jsx           # Route protection component
│   │
│   ├── context/                         # React Context
│   │   └── AuthContext.jsx              # Authentication state management
│   │
│   ├── App.jsx                          # Main App component with routing
│   ├── main.jsx                         # React entry point
│   └── global.css                       # Global styles & Tailwind directives
│
├── public/                              # Static assets
│   ├── placeholder.svg
│   └── robots.txt
│
├── Configuration Files
│   ├── index.html                       # HTML entry point
│   ├── vite.config.js                   # Vite client config (React + Express)
│   ├── vite.config.server.js            # Vite server build config
│   ├── tailwind.config.js               # Tailwind CSS configuration
│   ├── postcss.config.js                # PostCSS configuration
│   ├── package.json                     # Dependencies and scripts
│   ├── .env                             # Environment variables (local)
│   ├── .env.example                     # Environment variables template
│   └── .gitignore                       # Git ignore rules
│
└── Documentation
    └── PROJECT_STRUCTURE.md             # This file
```

## 🔑 Key Components

### Backend Structure

#### Models (Database Schemas)
- **User.js** - Stores user information with roles (admin, doctor, patient)
  - Password hashing with bcrypt
  - Role-specific fields (specialization for doctors, medical history for patients)
  
- **Department.js** - Hospital departments
  - Associated doctors
  - Department head

- **Appointment.js** - Appointment scheduling
  - Patient-Doctor mapping
  - Status tracking (scheduled, completed, cancelled, rescheduled)
  - Linked to prescriptions and diagnoses

- **Prescription.js** - Digital prescriptions
  - Medications with dosage and frequency
  - Status tracking (active, expired, cancelled)
  - Linked to appointments

- **MedicalRecord.js** - Patient medical history
  - Consultation notes
  - Lab results, imaging, procedures
  - File attachments

- **Billing.js** - Invoice and payment tracking
  - Appointment-based billing
  - Invoice generation
  - Payment status tracking

#### Controllers & Routes

**Authentication** (`authController.js`, `authRoutes.js`)
- User registration with role selection
- User login with JWT token generation
- Current user fetch endpoint
- Bcrypt password hashing

**Admin Operations** (`adminController.js`, `adminRoutes.js`)
- Dashboard statistics
- Doctor management
- Patient management
- Department management
- Appointment oversight
- Billing reports

**Doctor Operations** (`doctorController.js`, `doctorRoutes.js`)
- View appointments
- Add diagnosis to appointments
- Write prescriptions
- View patient medical history
- Create medical records

**Patient Operations** (`patientController.js`, `patientRoutes.js`)
- Book appointments
- View own appointments
- Cancel appointments
- View prescriptions
- View medical records
- Update profile

#### Middleware
- **authMiddleware.js** - JWT verification and role-based access control
  - Protects routes requiring authentication
  - Validates user roles for specific endpoints

### Frontend Structure

#### Pages
- **Home.jsx** - Landing page with feature showcase
- **Login.jsx** - User authentication
- **Register.jsx** - New user registration with role selection
- **AdminDashboard.jsx** - Admin overview with statistics
- **DoctorDashboard.jsx** - Doctor appointment and patient management
- **PatientDashboard.jsx** - Patient appointments and prescriptions
- **NotFound.jsx** - 404 error page

#### Components
- **Header.jsx** - Navigation bar (responsive, mobile-friendly)
- **ProtectedRoute.jsx** - Route protection based on user role

#### Context
- **AuthContext.jsx** - Global authentication state
  - User login/logout
  - Token management
  - Role-based state

## 🔐 Authentication & Security

### JWT-based Authentication
- Tokens generated on login/registration
- Tokens stored in localStorage
- Token passed in Authorization headers for API calls
- Automatic token refresh on app load

### Password Security
- Bcrypt hashing with salt rounds
- Passwords never stored in plaintext
- `comparePassword()` method for authentication

### Role-Based Access Control
- Middleware checks user role on protected routes
- Three roles: admin, doctor, patient
- Each role has specific permissions

## 🎨 Styling

- **Tailwind CSS 3** for utility-first styling
- **Lucide React** for icons
- Responsive design (mobile-first)
- Custom gradient utilities
- Dark mode support (CSS variables)

## 🚀 Running the Application

### Development
```bash
# Install dependencies
pnpm install

# Start dev server (client + server)
pnpm dev
```
- Frontend: http://localhost:8080
- Backend API: http://localhost:8080/api

### Production Build
```bash
# Build client and server
pnpm build

# Start production server
npm start
```

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user (protected)

### Admin
- `GET /api/admin/dashboard-stats` - Dashboard statistics
- `GET /api/admin/doctors` - List all doctors
- `GET /api/admin/patients` - List all patients
- `GET /api/admin/departments` - List departments
- `POST /api/admin/departments` - Create department
- `GET /api/admin/appointments` - List all appointments
- `GET /api/admin/billing` - Get billing info

### Doctor
- `GET /api/doctor/appointments` - My appointments
- `PUT /api/doctor/appointments/:id/diagnosis` - Update diagnosis
- `POST /api/doctor/prescriptions` - Create prescription
- `GET /api/doctor/patients/:id/medical-history` - Patient history
- `POST /api/doctor/medical-records` - Create medical record

### Patient
- `POST /api/patient/appointments` - Book appointment
- `GET /api/patient/appointments` - My appointments
- `DELETE /api/patient/appointments/:id` - Cancel appointment
- `GET /api/patient/prescriptions` - My prescriptions
- `GET /api/patient/medical-records` - My medical records
- `PUT /api/patient/profile` - Update profile

### General
- `GET /api/appointments` - Get appointments
- `GET /api/prescriptions` - Get prescriptions
- `GET /api/billing` - Get billing info
- `GET /api/health` - Health check

## 🗄️ Environment Variables

```
VITE_API_URL=http://localhost:8080        # API base URL
MONGO_URI=mongodb://localhost:27017/...  # MongoDB connection
JWT_SECRET=your-secret-key               # JWT signing key
JWT_EXPIRE=7d                            # Token expiration
PORT=8080                                # Server port
NODE_ENV=development                     # Environment
```

## 📦 Dependencies

### Core
- `react@18.3.1` - UI library
- `express@5.1.0` - Backend framework
- `mongoose@7.7.0` - MongoDB ORM
- `react-router-dom@6.30.1` - Client-side routing

### Security
- `bcrypt@5.1.1` - Password hashing
- `jsonwebtoken@9.1.2` - JWT generation/verification

### Styling
- `tailwindcss@3.4.17` - CSS framework
- `lucide-react@0.539.0` - Icon library

### Utilities
- `zod@3.25.76` - Schema validation
- `sonner@1.7.4` - Toast notifications
- `@tanstack/react-query@5.84.2` - Data fetching

## 🔄 Data Flow

```
User Registration/Login
    ↓
Credentials validated (bcrypt)
    ↓
JWT token generated
    ↓
Token stored in localStorage
    ↓
Protected routes check token
    ↓
Role middleware validates permissions
    ↓
API returns role-specific data
```

## ✨ Features

### For Patients
- ✅ Register and login
- ✅ Book appointments with doctors
- ✅ View appointment history
- ✅ Cancel appointments
- ✅ View prescriptions
- ✅ Access medical records
- ✅ Update personal profile

### For Doctors
- ✅ View assigned appointments
- ✅ Update patient diagnosis
- ✅ Write and manage prescriptions
- ✅ Access patient medical history
- ✅ Create medical records

### For Administrators
- ✅ Dashboard with statistics
- ✅ Manage doctors and patients
- ✅ Manage departments
- ✅ Overview of appointments
- ✅ Billing and revenue tracking

## 🛠️ Development Notes

- All files use JavaScript (.js/.jsx) - no TypeScript
- Modular architecture for easy maintenance
- Clean separation of concerns (models, controllers, routes)
- RESTful API design
- Protected routes with JWT
- Responsive UI with Tailwind CSS
- Role-based access control throughout

## 📝 File Naming Conventions

- **Components**: PascalCase (e.g., `Header.jsx`)
- **Pages**: PascalCase (e.g., `AdminDashboard.jsx`)
- **Controllers/Routes**: camelCase (e.g., `authController.js`)
- **Models**: PascalCase (e.g., `User.js`)
- **Utils/Helpers**: camelCase (e.g., `authMiddleware.js`)

## 🎯 Next Steps for Enhancement

1. Add appointment booking UI with date/time picker
2. Implement prescription printing/PDF generation
3. Add medical record file uploads
4. Implement email notifications
5. Add analytics charts for admin
6. Implement payment gateway integration
7. Add user profile picture uploads
8. Implement appointment reminders
9. Add staff management module
10. Implement reporting and analytics

---

**Created**: December 2024
**Framework**: React + Express + MongoDB
**Language**: JavaScript (JSX)
**Status**: Production Ready
