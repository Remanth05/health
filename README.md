# Hospital Management System (HMS)

A complete, production-ready Hospital Management System built with the MERN stack (MongoDB, Express.js, React.js, Node.js). Featuring role-based access control, appointment scheduling, medical records management, prescriptions, and billing.

## ✨ Key Features

### 🔐 Authentication & Authorization

- JWT-based authentication
- Bcrypt password hashing
- Role-based access control (Admin, Doctor, Patient)
- Protected API endpoints

### 👥 Role Management

**Admin**

- Dashboard with key metrics and statistics
- Manage doctors, patients, and staff
- Department management
- Appointment oversight
- Billing and revenue tracking

**Doctor**

- View assigned appointments
- Add diagnosis and medical findings
- Write and manage prescriptions
- Access patient medical history
- Manage medical records

**Patient**

- Register and manage account
- Book and manage appointments
- View prescriptions
- Access medical records
- Update health information

### 📋 Core Features

- **Appointment Scheduling** - Intelligent appointment booking with conflict detection
- **Medical Records** - Comprehensive patient medical history
- **Prescriptions** - Digital prescription management
- **Billing** - Invoice generation and payment tracking
- **Analytics** - Dashboard with key metrics

## 🛠️ Technology Stack

- **Frontend**: React 18 + React Router 6
- **Backend**: Express.js + Node.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT + Bcrypt
- **Styling**: Tailwind CSS 3 + Lucide Icons
- **Build Tool**: Vite
- **Language**: JavaScript (JSX) only, no TypeScript

## 📦 Installation

### Prerequisites

- Node.js 16+ and npm/pnpm
- MongoDB (local or Atlas)

### Setup Steps

```bash
# 1. Clone or extract the project
cd hospital-management-system

# 2. Install dependencies
pnpm install

# 3. Configure environment variables
cp .env.example .env
# Edit .env and update MongoDB URI and JWT_SECRET

# 4. Start the development server
pnpm dev
```

The application will run on `http://localhost:8080`

## 🚀 Development

```bash
# Start dev server (hot reload)
pnpm dev

# Build for production
pnpm build

# Start production server
npm start

# Format code
pnpm format
```

## 📁 Project Structure

```
src/
├── server/              # Backend (Express + Mongoose)
│   ├── models/          # Database schemas
│   ├── controllers/     # Route handlers
│   ├── routes/          # API endpoints
│   └── middleware/      # Authentication & authorization
├── pages/               # React pages
├── components/          # Reusable components
├── context/             # State management (Auth)
└── global.css          # Global styles
```

See [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md) for detailed documentation.

## 🔌 API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Admin

- `GET /api/admin/dashboard-stats` - Dashboard statistics
- `GET /api/admin/doctors` - List doctors
- `GET /api/admin/patients` - List patients
- `GET /api/admin/departments` - List departments
- `POST /api/admin/departments` - Create department
- `GET /api/admin/appointments` - View all appointments
- `GET /api/admin/billing` - View billing information

### Doctor

- `GET /api/doctor/appointments` - My appointments
- `PUT /api/doctor/appointments/:id/diagnosis` - Update diagnosis
- `POST /api/doctor/prescriptions` - Write prescription
- `GET /api/doctor/patients/:id/medical-history` - Patient history
- `POST /api/doctor/medical-records` - Create medical record

### Patient

- `POST /api/patient/appointments` - Book appointment
- `GET /api/patient/appointments` - My appointments
- `DELETE /api/patient/appointments/:id` - Cancel appointment
- `GET /api/patient/prescriptions` - My prescriptions
- `GET /api/patient/medical-records` - My records
- `PUT /api/patient/profile` - Update profile

## 🔐 Demo Credentials

For testing purposes, you can use these credentials (after registering with these details):

- **Admin**: admin@hospital.com / password
- **Doctor**: doctor@hospital.com / password
- **Patient**: patient@hospital.com / password

> Note: Change these credentials before deploying to production!

## 🎨 UI/UX

- **Modern Design** - Clean, professional interface
- **Responsive** - Mobile-friendly design
- **Accessible** - WCAG compliant
- **Dark Mode** - Built-in dark mode support
- **Smooth Animations** - Framer Motion and Tailwind animations

## 📝 Environment Variables

```env
# API Configuration
VITE_API_URL=http://localhost:8080

# Database
MONGO_URI=mongodb://localhost:27017/hospital-ms

# Authentication
JWT_SECRET=your-secret-key-change-in-production
JWT_EXPIRE=7d

# Server
PORT=8080
NODE_ENV=development
```

## 🔒 Security Features

- **Password Hashing** - Bcrypt with salt rounds
- **JWT Authentication** - Secure token-based auth
- **Role-Based Access** - Middleware-enforced permissions
- **Input Validation** - Zod schema validation
- **CORS Protection** - Configured CORS
- **Environment Variables** - Sensitive data protection

## 🚀 Deployment

### Docker

```bash
docker build -t hospital-ms .
docker run -p 8080:8080 hospital-ms
```

### Netlify / Vercel

1. Connect your repository
2. Set environment variables
3. Deploy

The project includes configurations for seamless deployment.

## 📚 Documentation

- [Project Structure](PROJECT_STRUCTURE.md) - Detailed folder and file organization
- [API Documentation](API.md) - Comprehensive API reference

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Create a feature branch
2. Commit your changes
3. Push to the branch
4. Create a Pull Request

## 📄 License

MIT License - feel free to use this project for commercial and personal use.

## 🆘 Support

For issues and questions:

1. Check the [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md)
2. Review the API endpoints
3. Check environment variables
4. Ensure MongoDB is running

## 🎯 Roadmap

- [ ] Real-time notifications
- [ ] PDF report generation
- [ ] Video consultation integration
- [ ] Mobile app
- [ ] Advanced analytics
- [ ] Multi-language support
- [ ] Payment gateway integration
- [ ] Telemedicine features

---

**Version**: 1.0.0
**Last Updated**: December 2024
**Status**: ✅ Production Ready
