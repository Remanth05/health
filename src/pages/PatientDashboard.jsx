import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { Calendar, FileText, Pill, Users, Plus, Stethoscope, DollarSign } from "lucide-react";
import { toast } from "sonner";

export default function PatientDashboard() {
  const { token, user } = useAuth();
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("appointments");
  const [showDoctorList, setShowDoctorList] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [appointmentsRes, prescriptionsRes, doctorsRes] = await Promise.all([
          fetch("/api/patient/appointments", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
          fetch("/api/patient/prescriptions", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
          fetch("/api/doctors"),
        ]);

        if (appointmentsRes.ok) {
          const appointmentsData = await appointmentsRes.json();
          setAppointments(appointmentsData);
        }

        if (prescriptionsRes.ok) {
          const prescriptionsData = await prescriptionsRes.json();
          setPrescriptions(prescriptionsData);
        }

        if (doctorsRes.ok) {
          const doctorsData = await doctorsRes.json();
          setDoctors(doctorsData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchData();
    }
  }, [token]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  const stats = {
    totalAppointments: appointments.length,
    upcomingAppointments: appointments.filter(
      (a) => a.status === "scheduled" && new Date(a.appointmentDate) > new Date()
    ).length,
    completedAppointments: appointments.filter((a) => a.status === "completed").length,
    activePrescriptions: prescriptions.filter((p) => p.status === "active").length,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Welcome, {user?.firstName}</h1>
            <p className="text-gray-600 text-lg">Patient Dashboard</p>
          </div>
          <button
            onClick={() => {
              // Show available doctors and allow selection
              setShowDoctorList(!showDoctorList);
            }}
            className="flex items-center space-x-2 px-6 py-3 rounded-lg bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-semibold hover:from-emerald-700 hover:to-emerald-800 transition-all"
          >
            <Plus className="h-5 w-5" />
            <span>Book Appointment</span>
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={<Calendar className="h-8 w-8" />}
            color="emerald"
            title="Total Appointments"
            value={stats.totalAppointments}
          />
          <StatCard
            icon={<Calendar className="h-8 w-8" />}
            color="blue"
            title="Upcoming"
            value={stats.upcomingAppointments}
          />
          <StatCard
            icon={<FileText className="h-8 w-8" />}
            color="purple"
            title="Completed"
            value={stats.completedAppointments}
          />
          <StatCard
            icon={<Pill className="h-8 w-8" />}
            color="pink"
            title="Active Prescriptions"
            value={stats.activePrescriptions}
          />
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-4 mb-8 border-b border-gray-200">
          {["appointments", "prescriptions", "medical-records", "profile"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 font-medium border-b-2 transition-colors ${
                activeTab === tab
                  ? "border-emerald-600 text-emerald-600"
                  : "border-transparent text-gray-600 hover:text-gray-900"
              }`}
            >
              {tab
                .split("-")
                .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                .join(" ")}
            </button>
          ))}
        </div>

        {/* Appointments Tab */}
        {activeTab === "appointments" && (
          <div className="space-y-4">
            {appointments.length === 0 ? (
              <div className="bg-white rounded-xl p-8 text-center">
                <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 text-lg">No appointments yet</p>
                <p className="text-gray-500 mt-2">Book your first appointment to get started</p>
              </div>
            ) : (
              <div className="space-y-4">
                {appointments.map((appointment) => (
                  <div
                    key={appointment._id}
                    className="bg-white rounded-xl p-6 shadow-lg hover:shadow-elevated transition-all"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          Dr. {appointment.doctor?.lastName}
                        </h3>
                        <p className="text-gray-600 mt-1">
                          Department: {appointment.department?.name}
                        </p>
                        <p className="text-gray-600">
                          Date: {new Date(appointment.appointmentDate).toLocaleDateString()}
                        </p>
                        <p className="text-gray-600">Time: {appointment.timeSlot}</p>
                      </div>
                      <div className="text-right">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getStatusBadge(
                            appointment.status
                          )}`}
                        >
                          {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Prescriptions Tab */}
        {activeTab === "prescriptions" && (
          <div className="space-y-4">
            {prescriptions.length === 0 ? (
              <div className="bg-white rounded-xl p-8 text-center">
                <Pill className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 text-lg">No prescriptions yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {prescriptions.map((prescription) => (
                  <div
                    key={prescription._id}
                    className="bg-white rounded-xl p-6 shadow-lg hover:shadow-elevated transition-all"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          Prescription from Dr. {prescription.doctor?.lastName}
                        </h3>
                        <p className="text-gray-600 mt-2">
                          Issued: {new Date(prescription.issuedDate).toLocaleDateString()}
                        </p>
                        <div className="mt-4">
                          <p className="font-semibold text-gray-900">Medications:</p>
                          <ul className="mt-2 space-y-2">
                            {prescription.medications?.map((med, idx) => (
                              <li key={idx} className="text-gray-600 text-sm">
                                • {med.name} - {med.dosage} - {med.frequency}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <div className="text-right">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getPrescriptionStatusBadge(
                            prescription.status
                          )}`}
                        >
                          {prescription.status.charAt(0).toUpperCase() +
                            prescription.status.slice(1)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Placeholder for other tabs */}
        {activeTab !== "appointments" && activeTab !== "prescriptions" && (
          <div className="bg-white rounded-xl p-8 text-center">
            <p className="text-gray-600 text-lg">
              {activeTab
                .split("-")
                .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                .join(" ")}{" "}
              section coming soon...
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({ icon, color, title, value }) {
  const colorClasses = {
    emerald: "bg-emerald-50",
    blue: "bg-blue-50",
    purple: "bg-purple-50",
    pink: "bg-pink-50",
  };

  const iconColorClasses = {
    emerald: "text-emerald-600",
    blue: "text-blue-600",
    purple: "text-purple-600",
    pink: "text-pink-600",
  };

  return (
    <div className={`${colorClasses[color]} rounded-xl p-6`}>
      <div className={`${iconColorClasses[color]} mb-2`}>{icon}</div>
      <p className="text-gray-600 text-sm">{title}</p>
      <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
    </div>
  );
}

function getStatusBadge(status) {
  const badges = {
    scheduled: "bg-blue-100 text-blue-800",
    completed: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
    rescheduled: "bg-yellow-100 text-yellow-800",
  };
  return badges[status] || "bg-gray-100 text-gray-800";
}

function getPrescriptionStatusBadge(status) {
  const badges = {
    active: "bg-green-100 text-green-800",
    expired: "bg-red-100 text-red-800",
    cancelled: "bg-gray-100 text-gray-800",
  };
  return badges[status] || "bg-gray-100 text-gray-800";
}
