import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import Header from "../components/Header";
import { Calendar, FileText, Users, Stethoscope, Pill, DollarSign } from "lucide-react";
import { toast } from "sonner";

export default function DoctorDashboard() {
  const { token, user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("appointments");

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch("/api/doctor/appointments", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch appointments");
        }

        const data = await response.json();
        setAppointments(data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
        toast.error("Failed to load appointments");
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchAppointments();
    }
  }, [token]);

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const response = await fetch("/api/prescriptions", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setPrescriptions(data);
        }
      } catch (error) {
        console.error("Error fetching prescriptions:", error);
      }
    };

    if (token) {
      fetchPrescriptions();
    }
  }, [token]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const stats = {
    totalAppointments: appointments.length,
    scheduledAppointments: appointments.filter((a) => a.status === "scheduled").length,
    completedAppointments: appointments.filter((a) => a.status === "completed").length,
    cancelledAppointments: appointments.filter((a) => a.status === "cancelled").length,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Welcome, Dr. {user?.lastName}</h1>
          <p className="text-gray-600 text-lg">Doctor Dashboard</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={<Calendar className="h-8 w-8" />}
            color="blue"
            title="Total Appointments"
            value={stats.totalAppointments}
          />
          <StatCard
            icon={<Calendar className="h-8 w-8" />}
            color="green"
            title="Scheduled"
            value={stats.scheduledAppointments}
          />
          <StatCard
            icon={<FileText className="h-8 w-8" />}
            color="purple"
            title="Completed"
            value={stats.completedAppointments}
          />
          <StatCard
            icon={<Users className="h-8 w-8" />}
            color="pink"
            title="Cancelled"
            value={stats.cancelledAppointments}
          />
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-4 mb-8 border-b border-gray-200">
          {["appointments", "prescriptions", "medical-records", "patients"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 font-medium border-b-2 transition-colors ${
                activeTab === tab
                  ? "border-blue-600 text-blue-600"
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
                <Stethoscope className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 text-lg">No appointments scheduled</p>
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
                          {appointment.patient?.firstName} {appointment.patient?.lastName}
                        </h3>
                        <p className="text-gray-600 mt-1">
                          Date: {new Date(appointment.appointmentDate).toLocaleDateString()}
                        </p>
                        <p className="text-gray-600">Time: {appointment.timeSlot}</p>
                        <p className="text-gray-600 mt-2">Reason: {appointment.reason}</p>
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
                <p className="text-gray-600 text-lg">No prescriptions issued yet</p>
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
                          Prescription for {prescription.patient?.firstName}{" "}
                          {prescription.patient?.lastName}
                        </h3>
                        <p className="text-gray-600 mt-1">
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
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Medical Records Tab */}
        {activeTab === "medical-records" && (
          <div className="bg-white rounded-xl p-8 text-center">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 text-lg">No medical records available</p>
            <p className="text-gray-500 mt-2">Medical records will appear here</p>
          </div>
        )}

        {/* Patients Tab */}
        {activeTab === "patients" && (
          <div className="bg-white rounded-xl p-8 text-center">
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 text-lg">No patients assigned yet</p>
            <p className="text-gray-500 mt-2">Your patients will appear here</p>
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({ icon, color, title, value }) {
  const colorClasses = {
    blue: "bg-blue-50",
    green: "bg-green-50",
    purple: "bg-purple-50",
    pink: "bg-pink-50",
  };

  const iconColorClasses = {
    blue: "text-blue-600",
    green: "text-green-600",
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
