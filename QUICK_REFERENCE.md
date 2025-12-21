# Quick Reference Guide

## 🚀 Start Here

```bash
# Install & Run
pnpm install
pnpm dev

# Open in browser
http://localhost:8080
```

## 📁 File Locations

| What              | Where                            |
| ----------------- | -------------------------------- |
| Home Page         | `src/pages/Home.jsx`             |
| Login Form        | `src/pages/Login.jsx`            |
| Admin Dashboard   | `src/pages/AdminDashboard.jsx`   |
| Doctor Dashboard  | `src/pages/DoctorDashboard.jsx`  |
| Patient Dashboard | `src/pages/PatientDashboard.jsx` |
| Header/Nav        | `src/components/Header.jsx`      |
| Authentication    | `src/context/AuthContext.jsx`    |
| Routes            | `src/App.jsx`                    |
| Styles            | `src/global.css`                 |
| API Base          | `src/server/index.js`            |
| Models            | `src/server/models/*.js`         |
| Controllers       | `src/server/controllers/*.js`    |
| Routes            | `src/server/routes/*.js`         |

## 🔑 Key Files

### Database Models

- `User.js` - Users with roles
- `Department.js` - Departments
- `Appointment.js` - Appointments
- `Prescription.js` - Prescriptions
- `MedicalRecord.js` - Medical records
- `Billing.js` - Billing info

### API Controllers

- `authController.js` - Auth logic
- `adminController.js` - Admin operations
- `doctorController.js` - Doctor operations
- `patientController.js` - Patient operations

## 🔐 Demo Credentials

```
Admin:     admin@hospital.com / password
Doctor:    doctor@hospital.com / password
Patient:   patient@hospital.com / password
```

(Register first to create accounts)

## 🛠️ Common Commands

| Command       | Purpose              |
| ------------- | -------------------- |
| `pnpm dev`    | Start dev server     |
| `pnpm build`  | Build for production |
| `npm start`   | Run production build |
| `pnpm format` | Format code          |

## 📡 Important API Endpoints

### Auth

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`

### Admin

- `GET /api/admin/dashboard-stats`
- `GET /api/admin/doctors`
- `GET /api/admin/patients`
- `GET /api/admin/departments`

### Doctor

- `GET /api/doctor/appointments`
- `PUT /api/doctor/appointments/:id/diagnosis`
- `POST /api/doctor/prescriptions`

### Patient

- `POST /api/patient/appointments`
- `GET /api/patient/appointments`
- `GET /api/patient/prescriptions`
- `PUT /api/patient/profile`

## 🎨 Color Palette

| Color       | Variable                  |
| ----------- | ------------------------- |
| Primary     | `hsl(var(--primary))`     |
| Secondary   | `hsl(var(--secondary))`   |
| Accent      | `hsl(var(--accent))`      |
| Destructive | `hsl(var(--destructive))` |

## 📊 Role Permissions

| Action             | Admin | Doctor | Patient |
| ------------------ | ----- | ------ | ------- |
| View Dashboard     | ✅    | ✅     | ✅      |
| Manage Users       | ✅    | ❌     | ❌      |
| View Appointments  | ✅    | ✅     | ✅      |
| Book Appointment   | ❌    | ❌     | ✅      |
| Write Prescription | ❌    | ✅     | ❌      |
| Manage Billing     | ✅    | ❌     | ❌      |

## 🔐 Auth Token Usage

```javascript
// Token is auto-added to requests
fetch("/api/endpoint", {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
```

## 🌐 Environment Variables

```env
VITE_API_URL=http://localhost:8080
MONGO_URI=mongodb://localhost:27017/hospital-ms
JWT_SECRET=your-secret-key
PORT=8080
```

## 📱 Responsive Breakpoints

- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## 🎯 Common Tasks

### Add New Page

1. Create file in `src/pages/NewPage.jsx`
2. Add route in `src/App.jsx`
3. Update Header navigation

### Add New API Endpoint

1. Create controller function
2. Add route handler
3. Update route file
4. Call from React component

### Change Colors

Edit in `src/global.css`:

```css
--primary: 222.2 47.4% 11.2%;
```

## 🐛 Troubleshooting Quick Fixes

| Issue                  | Fix                               |
| ---------------------- | --------------------------------- |
| Port 8080 in use       | Change PORT in `.env`             |
| MongoDB not connecting | Check MONGO_URI in `.env`         |
| Can't login            | Clear localStorage, restart       |
| CORS error             | Check VITE_API_URL matches server |
| Styles not loading     | Run `pnpm install` again          |

## 📚 Documentation

- **Setup**: SETUP_GUIDE.md
- **Structure**: PROJECT_STRUCTURE.md
- **Details**: IMPLEMENTATION_SUMMARY.md
- **Main Docs**: README.md

## 🚀 Deploy

```bash
# Build
pnpm build

# Test build locally
npm start

# Deploy dist/ folder to hosting
# (Netlify, Vercel, AWS, etc.)
```

## 💡 Tips

- Check `src/context/AuthContext.jsx` for auth functions
- Use `useAuth()` hook in components
- Always wrap protected routes with `<ProtectedRoute>`
- Add new models in `src/server/models/`
- Controllers follow pattern: controller → route → page
- Tailwind classes for styling (no inline CSS)
- Use Lucide icons from `lucide-react`

## 🔗 Quick Links

- React Docs: https://react.dev
- Tailwind CSS: https://tailwindcss.com
- Express Docs: https://expressjs.com
- MongoDB: https://mongodb.com
- Lucide Icons: https://lucide.dev

---

**Need more help?** Check PROJECT_STRUCTURE.md or SETUP_GUIDE.md
