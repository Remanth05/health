# Hospital Management System - Setup & Getting Started Guide

## ✅ What's Included

A complete, production-ready Hospital Management System with:

- ✅ Full MERN stack implementation (MongoDB, Express, React, Node.js)
- ✅ Pure JavaScript (.jsx) - no TypeScript
- ✅ Role-based access control (Admin, Doctor, Patient)
- ✅ JWT authentication with bcrypt password hashing
- ✅ Beautiful, modern UI with TailwindCSS and Lucide icons
- ✅ Complete API with 30+ endpoints
- ✅ Responsive design for all screen sizes
- ✅ Professional dashboards for all three roles

## 🚀 Quick Start

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Configure MongoDB

The application uses MongoDB. You have two options:

**Option A: Local MongoDB**

```bash
# Install MongoDB locally, then update .env
MONGO_URI=mongodb://localhost:27017/hospital-ms
```

**Option B: MongoDB Atlas (Cloud)**

```bash
# Sign up at https://www.mongodb.com/cloud/atlas
# Create a cluster and get the connection string
# Update .env:
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/hospital-ms
```

### 3. Environment Variables

The `.env` file is already configured with defaults:

```env
VITE_API_URL=http://localhost:8080
MONGO_URI=mongodb://localhost:27017/hospital-ms
JWT_SECRET=hospital-management-system-secret-key-2024
JWT_EXPIRE=7d
PORT=8080
NODE_ENV=development
```

For production, you must change `JWT_SECRET` to a secure random string:

```bash
# Generate a secure JWT secret
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 4. Start Development Server

```bash
pnpm dev
```

The app will be available at: **http://localhost:8080**

## 📱 Demo Access

After starting the server, you can register new accounts or use these credentials:

- **Admin Account**
  - Email: admin@hospital.com
  - Password: password
  - Access: Full system management

- **Doctor Account**
  - Email: doctor@hospital.com
  - Password: password
  - Access: Appointment and prescription management

- **Patient Account**
  - Email: patient@hospital.com
  - Password: password
  - Access: Personal appointments and medical records

## 📋 Project Structure Overview

```
src/
├── server/                 # Backend (Express.js)
│   ├── models/            # Database schemas
│   ├── controllers/       # Route handlers
│   ├── routes/           # API endpoints
│   └── middleware/       # Auth & validation
├── pages/                # React pages
├── components/           # Reusable components
├── context/             # State management
└── global.css           # Global styles
```

See [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md) for complete details.

## 🔑 Key Features by Role

### 👨‍💼 Admin

- Dashboard with key metrics
- Manage doctors, patients, and departments
- View all appointments
- Track billing and revenue
- System statistics

### 👨‍⚕️ Doctor

- View personal appointments
- Add diagnosis and findings
- Write prescriptions
- Access patient medical history
- Create medical records

### 🧑‍🤝‍🧑 Patient

- Book appointments
- View appointments
- Cancel appointments
- View prescriptions
- Access medical records
- Update personal profile

## 🔐 Authentication Flow

1. **Register** → Create new account with role selection
2. **Login** → Receive JWT token
3. **Token Storage** → Token saved in localStorage
4. **API Requests** → Token sent in Authorization header
5. **Role Check** → Backend validates permissions
6. **Access Granted** → Return role-specific data

## 📡 Testing API Endpoints

### Using cURL

```bash
# Register
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@hospital.com",
    "password": "password123",
    "role": "patient"
  }'

# Login
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@hospital.com",
    "password": "password123"
  }'

# Get current user (requires token)
curl http://localhost:8080/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Using Postman

1. Import the endpoints from the README.md
2. Set Authorization header: `Bearer {token}`
3. Test each endpoint

## 🛠️ Development Commands

```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
npm start

# Format code
pnpm format

# Check code quality (TypeScript checking disabled for JS project)
pnpm typecheck
```

## 🗄️ Database Collections

The system creates these MongoDB collections:

- **users** - All system users (admins, doctors, patients)
- **departments** - Hospital departments
- **appointments** - Appointment records
- **prescriptions** - Digital prescriptions
- **medicalrecords** - Patient medical history
- **billings** - Invoice and payment information

## 🔒 Security Checklist

Before production deployment:

- [ ] Change `JWT_SECRET` to a strong random string
- [ ] Update `NODE_ENV` to `production`
- [ ] Use environment variables for sensitive data
- [ ] Enable HTTPS
- [ ] Set strong password policies
- [ ] Implement rate limiting
- [ ] Enable CORS with specific origins
- [ ] Use environment-specific database URIs
- [ ] Set up proper logging and monitoring
- [ ] Regular security audits

## 🚀 Production Deployment

### Build

```bash
pnpm build
```

This creates:

- `dist/spa/` - Frontend build
- `dist/server/` - Backend build

### Deploy Options

**1. Traditional VPS**

```bash
npm start
```

**2. Docker**

```bash
docker build -t hospital-ms .
docker run -p 8080:8080 hospital-ms
```

**3. Netlify/Vercel**

1. Push code to GitHub
2. Connect repository to Netlify/Vercel
3. Set environment variables
4. Deploy

**4. Heroku**

```bash
heroku create hospital-ms
heroku config:set JWT_SECRET=your-secret-key
heroku config:set MONGO_URI=your-mongo-uri
git push heroku main
```

## 🆘 Troubleshooting

### MongoDB Connection Error

```
Error: Cannot connect to MongoDB
Solution:
1. Ensure MongoDB is running
2. Check MONGO_URI in .env
3. Verify credentials for Atlas
```

### Port Already in Use

```
Error: Port 8080 is already in use
Solution:
1. Kill process on port 8080, or
2. Change PORT in .env
```

### Authentication Failing

```
Error: Invalid token
Solution:
1. Clear localStorage and login again
2. Check JWT_SECRET is consistent
3. Verify token hasn't expired
```

### CORS Issues

```
Error: Access to XMLHttpRequest has been blocked
Solution:
1. Check VITE_API_URL matches server URL
2. Verify CORS settings in server/index.js
```

## 📚 API Documentation

For complete API documentation, see [API_DOCS.md](API_DOCS.md) or check endpoints in:

- `src/server/routes/authRoutes.js`
- `src/server/routes/adminRoutes.js`
- `src/server/routes/doctorRoutes.js`
- `src/server/routes/patientRoutes.js`

## 🎨 Customization

### Change Colors

Edit `src/global.css` and `tailwind.config.js`:

```css
:root {
  --primary: YOUR_HUE SATURATION% LIGHTNESS%;
}
```

### Add New Features

1. Create controller in `src/server/controllers/`
2. Add routes in `src/server/routes/`
3. Create React component/page
4. Add to navigation

## 📞 Support Resources

- 📖 [Project Structure](PROJECT_STRUCTURE.md)
- 📘 [README](README.md)
- 🔌 API endpoints in route files
- 💬 Comments in code

## ⚙️ Advanced Configuration

### Change Database

The system uses Mongoose. To switch to another database:

1. Update connection in `src/server/index.js`
2. Update models syntax if needed
3. Install appropriate driver

### Add Email Notifications

Install nodemailer:

```bash
pnpm add nodemailer
```

Then add email sending in relevant controllers.

### Add File Uploads

Install multer:

```bash
pnpm add multer
```

Update medical records controller for file uploads.

## 📈 Monitoring & Logging

For production, add:

```bash
pnpm add winston  # Logging
pnpm add express-rate-limit  # Rate limiting
pnpm add helmet  # Security headers
```

## 🎯 Next Steps

1. **Test the application** - Register and explore all features
2. **Customize** - Update colors, text, and branding
3. **Add data** - Create departments, doctors, and patients
4. **Deploy** - Choose your hosting platform
5. **Monitor** - Set up logging and monitoring
6. **Scale** - Add advanced features as needed

## ✨ What's Next?

Consider adding:

- Email notifications for appointments
- SMS reminders
- Video consultations
- Mobile app
- Advanced reporting
- Payment gateway integration
- Multi-language support
- Real-time notifications

---

**Ready to start?** Run `pnpm dev` and open http://localhost:8080!

For questions, check the documentation files or review the code comments.
