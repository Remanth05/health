import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Header from "../components/Header";
import { Star, Calendar, ArrowLeft, MapPin, Briefcase } from "lucide-react";
import { toast } from "sonner";

export default function DoctorProfile() {
  const { doctorId } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const response = await fetch(`/api/doctors/${doctorId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch doctor details");
        }

        const data = await response.json();
        setDoctor(data);
      } catch (error) {
        console.error("Error fetching doctor:", error);
        toast.error("Failed to load doctor details");
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchDoctor();
    }
  }, [doctorId, token]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <p className="text-gray-600 text-lg">Doctor not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 mb-8"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back</span>
        </button>

        {/* Doctor Card */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-32"></div>

          <div className="px-8 pb-8">
            {/* Doctor Info */}
            <div className="flex flex-col md:flex-row gap-8 -mt-16 mb-8">
              {/* Avatar */}
              <div className="flex-shrink-0">
                <div className="w-32 h-32 bg-blue-100 rounded-2xl border-4 border-white flex items-center justify-center">
                  <Briefcase className="h-16 w-16 text-blue-600" />
                </div>
              </div>

              {/* Details */}
              <div className="flex-grow pt-8">
                <h1 className="text-4xl font-bold text-gray-900">Dr. {doctor.firstName} {doctor.lastName}</h1>
                <p className="text-xl text-blue-600 font-semibold mt-2">{doctor.specialization}</p>
                {doctor.experience && (
                  <p className="text-gray-600 mt-2">{doctor.experience} years of experience</p>
                )}
              </div>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 pt-8 border-t border-gray-200">
              {doctor.phone && (
                <div>
                  <p className="text-sm text-gray-600">Phone</p>
                  <p className="text-lg font-semibold text-gray-900">{doctor.phone}</p>
                </div>
              )}
              {doctor.email && (
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="text-lg font-semibold text-gray-900">{doctor.email}</p>
                </div>
              )}
              {doctor.licenseNumber && (
                <div>
                  <p className="text-sm text-gray-600">License Number</p>
                  <p className="text-lg font-semibold text-gray-900">{doctor.licenseNumber}</p>
                </div>
              )}
            </div>

            {/* Book Appointment Button */}
            <button
              onClick={() => navigate(`/book-appointment/${doctorId}`)}
              className="w-full md:w-auto flex items-center justify-center space-x-2 px-8 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold hover:from-blue-700 hover:to-blue-800 transition-all"
            >
              <Calendar className="h-5 w-5" />
              <span>Book Appointment</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
