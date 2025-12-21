import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { ArrowRight, Stethoscope, Users, Calendar, FileText, BarChart3, Shield } from "lucide-react";

export default function Home() {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="pt-20 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900">
                  Healthcare Made
                  <span className="block gradient-primary text-transparent bg-clip-text">
                    Intelligent & Simple
                  </span>
                </h1>
                <p className="text-xl text-gray-600 max-w-xl">
                  Complete Hospital Management System for doctors, patients, and administrators.
                  Manage appointments, medical records, prescriptions, and billing all in one place.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                {isAuthenticated ? (
                  <>
                    {user?.role === "admin" && (
                      <button
                        onClick={() => navigate("/admin")}
                        className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold hover:from-purple-700 hover:to-purple-800 transition-all"
                      >
                        Admin Dashboard
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </button>
                    )}
                    {user?.role === "doctor" && (
                      <button
                        onClick={() => navigate("/doctor")}
                        className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold hover:from-blue-700 hover:to-blue-800 transition-all"
                      >
                        Doctor Dashboard
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </button>
                    )}
                    {user?.role === "patient" && (
                      <button
                        onClick={() => navigate("/patient")}
                        className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-semibold hover:from-emerald-700 hover:to-emerald-800 transition-all"
                      >
                        Patient Dashboard
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </button>
                    )}
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => navigate("/register")}
                      className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold hover:from-purple-700 hover:to-purple-800 transition-all"
                    >
                      Get Started
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </button>
                    <button
                      onClick={() => navigate("/login")}
                      className="inline-flex items-center justify-center px-8 py-3 rounded-lg border-2 border-gray-300 text-gray-900 font-semibold hover:border-gray-400 hover:bg-gray-50 transition-all"
                    >
                      Sign In
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-200 via-pink-200 to-blue-200 rounded-3xl blur-3xl opacity-30"></div>
              <div className="relative bg-white rounded-3xl p-8 shadow-elevated">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col items-center justify-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl">
                    <Stethoscope className="h-8 w-8 text-purple-600 mb-2" />
                    <p className="text-sm font-semibold text-gray-900">Expert Doctors</p>
                  </div>
                  <div className="flex flex-col items-center justify-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl">
                    <Users className="h-8 w-8 text-blue-600 mb-2" />
                    <p className="text-sm font-semibold text-gray-900">Patient Care</p>
                  </div>
                  <div className="flex flex-col items-center justify-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl">
                    <Calendar className="h-8 w-8 text-green-600 mb-2" />
                    <p className="text-sm font-semibold text-gray-900">Appointments</p>
                  </div>
                  <div className="flex flex-col items-center justify-center p-6 bg-gradient-to-br from-pink-50 to-pink-100 rounded-2xl">
                    <FileText className="h-8 w-8 text-pink-600 mb-2" />
                    <p className="text-sm font-semibold text-gray-900">Records</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Powerful Features for Modern Healthcare
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to manage your healthcare facility efficiently
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-elevated transition-all duration-300"
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br from-purple-100 to-purple-200 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-purple-600 to-purple-700 rounded-3xl p-12 text-center text-white">
          <h2 className="text-4xl font-bold mb-4">Ready to Transform Your Hospital?</h2>
          <p className="text-lg text-purple-100 mb-8">
            Join thousands of healthcare facilities using our modern management system
          </p>
          {!isAuthenticated && (
            <button
              onClick={() => navigate("/register")}
              className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-white text-purple-600 font-semibold hover:bg-gray-100 transition-all"
            >
              Start Your Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          )}
        </div>
      </section>
    </div>
  );
}

const features = [
  {
    icon: <Stethoscope className="h-6 w-6 text-purple-600" />,
    title: "Doctor Management",
    description: "Manage doctor profiles, specializations, schedules, and availability effortlessly",
  },
  {
    icon: <Users className="h-6 w-6 text-blue-600" />,
    title: "Patient Care",
    description: "Complete patient management with medical history and health records",
  },
  {
    icon: <Calendar className="h-6 w-6 text-green-600" />,
    title: "Smart Scheduling",
    description: "Intelligent appointment scheduling with conflict detection and reminders",
  },
  {
    icon: <FileText className="h-6 w-6 text-pink-600" />,
    title: "Prescriptions",
    description: "Digital prescription management with medication tracking",
  },
  {
    icon: <BarChart3 className="h-6 w-6 text-orange-600" />,
    title: "Billing & Analytics",
    description: "Complete billing system with invoice generation and financial reports",
  },
  {
    icon: <Shield className="h-6 w-6 text-indigo-600" />,
    title: "Security & Privacy",
    description: "Enterprise-grade security with role-based access control",
  },
];
