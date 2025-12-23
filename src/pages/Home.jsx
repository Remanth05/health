import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import {
  ArrowRight,
  Stethoscope,
  Users,
  Calendar,
  FileText,
  BarChart3,
  Shield,
  Star,
} from "lucide-react";
import { toast } from "sonner";

const DOCTOR_QUOTES = [
  "Healthcare is the cornerstone of a healthy nation.",
  "Your health is an investment, not an expense.",
  "Compassion and expertise, our commitment to you.",
  "Healing starts with listening and understanding.",
];

export default function Home() {
  const { user, isAuthenticated, token } = useAuth();
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const [loadingDoctors, setLoadingDoctors] = useState(true);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch("/api/doctors");
        if (response.ok) {
          const data = await response.json();
          setDoctors(data.slice(0, 4));
        }
      } catch (error) {
        console.error("Error fetching doctors:", error);
      } finally {
        setLoadingDoctors(false);
      }
    };

    fetchDoctors();
  }, []);

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
                        className="inline-flex items-center justify-center px-8 py-4 rounded-lg bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold hover:from-purple-700 hover:to-purple-800 transition-all shadow-lg hover:shadow-xl"
                      >
                        Admin Dashboard
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </button>
                    )}
                    {user?.role === "doctor" && (
                      <button
                        onClick={() => navigate("/doctor")}
                        className="inline-flex items-center justify-center px-8 py-4 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl"
                      >
                        Doctor Dashboard
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </button>
                    )}
                    {user?.role === "patient" && (
                      <>
                        <button
                          onClick={() => navigate("/patient")}
                          className="inline-flex items-center justify-center px-8 py-4 rounded-lg bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-semibold hover:from-emerald-700 hover:to-emerald-800 transition-all shadow-lg hover:shadow-xl"
                        >
                          Patient Dashboard
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </button>
                        <button
                          onClick={() => navigate("/medicines")}
                          className="inline-flex items-center justify-center px-8 py-4 rounded-lg bg-gradient-to-r from-pink-600 to-pink-700 text-white font-semibold hover:from-pink-700 hover:to-pink-800 transition-all shadow-lg hover:shadow-xl"
                        >
                          Browse Medicines
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </button>
                      </>
                    )}
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => navigate("/register")}
                      className="inline-flex items-center justify-center px-8 py-4 rounded-lg bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold hover:from-purple-700 hover:to-purple-800 transition-all shadow-lg hover:shadow-xl"
                    >
                      Get Started
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </button>
                    <button
                      onClick={() => navigate("/login")}
                      className="inline-flex items-center justify-center px-8 py-4 rounded-lg border-2 border-gray-300 text-gray-900 font-semibold hover:border-purple-400 hover:bg-purple-50 transition-all"
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
                  <div
                    className="flex flex-col items-center justify-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl cursor-pointer hover:shadow-lg transition-all"
                    onClick={() => isAuthenticated && navigate("/patient")}
                  >
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
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Expert Doctors Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Our Expert Doctors
            </h2>
            <p className="text-xl text-gray-600">
              Meet our highly qualified healthcare professionals
            </p>
          </div>

          {loadingDoctors ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
            </div>
          ) : doctors.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {doctors.map((doctor, index) => (
                <div
                  key={doctor._id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer"
                  onClick={() =>
                    isAuthenticated && doctor.role === "doctor" && navigate(`/doctor/${doctor._id}`)
                  }
                >
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-24"></div>
                  <div className="px-6 pb-6 pt-4">
                    <div className="mb-4">
                      <h3 className="text-lg font-bold text-gray-900">
                        Dr. {doctor.firstName} {doctor.lastName}
                      </h3>
                      <p className="text-sm text-purple-600 font-semibold mt-1">
                        {doctor.specialization || "Specialist"}
                      </p>
                    </div>

                    <div className="mb-4 p-3 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                      <p className="text-sm italic text-gray-700">
                        "{DOCTOR_QUOTES[index % DOCTOR_QUOTES.length]}"
                      </p>
                    </div>

                    <div className="flex items-center space-x-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                      <span className="text-sm text-gray-600 ml-2">(4.9)</span>
                    </div>

                    {isAuthenticated ? (
                      <button
                        onClick={() => navigate(`/doctor/${doctor._id}`)}
                        className="w-full px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold hover:from-purple-700 hover:to-purple-800 transition-all"
                      >
                        View Profile
                      </button>
                    ) : (
                      <button
                        onClick={() => navigate("/register")}
                        className="w-full px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold hover:from-purple-700 hover:to-purple-800 transition-all"
                      >
                        Book Now
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No doctors available at the moment</p>
            </div>
          )}
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
    description:
      "Manage doctor profiles, specializations, schedules, and availability effortlessly",
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
