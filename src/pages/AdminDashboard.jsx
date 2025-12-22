import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import Header from "../components/Header";
import { Users, Stethoscope, Calendar, Building2, DollarSign, BarChart3, Pill } from "lucide-react";
import { toast } from "sonner";

export default function AdminDashboard() {
  const { token, user } = useAuth();
  const [stats, setStats] = useState(null);
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [statsRes, medicinesRes] = await Promise.all([
          fetch("/api/admin/dashboard-stats", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
          fetch("/api/medicines"),
        ]);

        if (!statsRes.ok) {
          throw new Error("Failed to fetch stats");
        }

        const data = await statsRes.json();
        setStats(data);

        if (medicinesRes.ok) {
          const medicinesData = await medicinesRes.json();
          setMedicines(medicinesData);
        }
      } catch (error) {
        console.error("Error fetching stats:", error);
        toast.error("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchStats();
    }
  }, [token]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Welcome, {user?.firstName}</h1>
          <p className="text-gray-600 text-lg">Admin Dashboard</p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-4 mb-8 border-b border-gray-200 overflow-x-auto">
          {["overview", "doctors", "patients", "appointments", "billing", "medicines"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 font-medium border-b-2 transition-colors ${
                activeTab === tab
                  ? "border-purple-600 text-purple-600"
                  : "border-transparent text-gray-600 hover:text-gray-900"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                icon={<Stethoscope className="h-8 w-8" />}
                color="purple"
                title="Doctors"
                value={stats?.totalDoctors || 0}
              />
              <StatCard
                icon={<Users className="h-8 w-8" />}
                color="blue"
                title="Patients"
                value={stats?.totalPatients || 0}
              />
              <StatCard
                icon={<Calendar className="h-8 w-8" />}
                color="green"
                title="Appointments"
                value={stats?.totalAppointments || 0}
              />
              <StatCard
                icon={<Building2 className="h-8 w-8" />}
                color="pink"
                title="Departments"
                value={stats?.totalDepartments || 0}
              />
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Appointment Status Chart */}
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-green-600" />
                  Appointment Status
                </h3>
                <div className="space-y-3">
                  {stats?.appointmentStats?.map((stat) => (
                    <div key={stat._id} className="flex items-center justify-between">
                      <span className="text-gray-600 capitalize">{stat._id}</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${getStatusColor(stat._id)}`}
                            style={{
                              width: `${(stat.count / stats?.totalAppointments) * 100}%`,
                            }}
                          ></div>
                        </div>
                        <span className="text-gray-900 font-semibold w-8 text-right">
                          {stat.count}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Revenue Chart */}
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <DollarSign className="h-5 w-5 mr-2 text-orange-600" />
                  Revenue by Status
                </h3>
                <div className="space-y-3">
                  {stats?.revenueStats?.map((stat) => (
                    <div key={stat._id} className="flex items-center justify-between">
                      <span className="text-gray-600 capitalize">{stat._id}</span>
                      <span className="text-gray-900 font-semibold">
                        ${stat.total?.toFixed(2) || "0.00"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Doctors Tab */}
        {activeTab === "doctors" && (
          <div className="bg-white rounded-xl p-8">
            <div className="flex items-center space-x-3 mb-6">
              <Stethoscope className="h-6 w-6 text-purple-600" />
              <h3 className="text-lg font-semibold text-gray-900">Doctor Management</h3>
            </div>
            <div className="text-center py-8">
              <Stethoscope className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 text-lg">No doctors to manage</p>
              <p className="text-gray-500 mt-2">New doctors will appear here</p>
            </div>
          </div>
        )}

        {/* Patients Tab */}
        {activeTab === "patients" && (
          <div className="bg-white rounded-xl p-8">
            <div className="flex items-center space-x-3 mb-6">
              <Users className="h-6 w-6 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">Patient Management</h3>
            </div>
            <div className="text-center py-8">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 text-lg">No patients to manage</p>
              <p className="text-gray-500 mt-2">New patients will appear here</p>
            </div>
          </div>
        )}

        {/* Appointments Tab */}
        {activeTab === "appointments" && (
          <div className="bg-white rounded-xl p-8">
            <div className="flex items-center space-x-3 mb-6">
              <Calendar className="h-6 w-6 text-green-600" />
              <h3 className="text-lg font-semibold text-gray-900">Appointment Management</h3>
            </div>
            <div className="text-center py-8">
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 text-lg">No appointments to manage</p>
              <p className="text-gray-500 mt-2">Appointments will appear here</p>
            </div>
          </div>
        )}

        {/* Billing Tab */}
        {activeTab === "billing" && (
          <div className="bg-white rounded-xl p-8">
            <div className="flex items-center space-x-3 mb-6">
              <BarChart3 className="h-6 w-6 text-orange-600" />
              <h3 className="text-lg font-semibold text-gray-900">Billing & Revenue</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6 border border-green-200">
                <p className="text-sm text-gray-600 mb-2">Total Revenue</p>
                <p className="text-3xl font-bold text-green-700">$0.00</p>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 border border-blue-200">
                <p className="text-sm text-gray-600 mb-2">Amount Paid</p>
                <p className="text-3xl font-bold text-blue-700">$0.00</p>
              </div>
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-6 border border-orange-200">
                <p className="text-sm text-gray-600 mb-2">Amount Due</p>
                <p className="text-3xl font-bold text-orange-700">$0.00</p>
              </div>
            </div>
            <div className="text-center py-8">
              <DollarSign className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 text-lg">No billing records yet</p>
              <p className="text-gray-500 mt-2">Billing information will appear here</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({ icon, color, title, value }) {
  const colorClasses = {
    purple: "bg-purple-50",
    blue: "bg-blue-50",
    green: "bg-green-50",
    pink: "bg-pink-50",
  };

  const iconColorClasses = {
    purple: "text-purple-600",
    blue: "text-blue-600",
    green: "text-green-600",
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

function getStatusColor(status) {
  const colors = {
    scheduled: "bg-blue-500",
    completed: "bg-green-500",
    cancelled: "bg-red-500",
    rescheduled: "bg-yellow-500",
  };
  return colors[status] || "bg-gray-500";
}
