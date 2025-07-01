import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  User,
  Mail,
  Shield,
  Calendar,
  Edit,
  Lock,
  Image as ImageIcon,
} from "lucide-react";
import toast from "react-hot-toast";

export default function Profile() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    photoUrl: "",
  });
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
  });
  const [successMessage, setSuccessMessage] = useState("");

  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    if (!token) return;

    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER}/api/v1/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUserData(response.data.data);
        setEditForm({
          name: response.data.data.name,
          email: response.data.data.email,
          photoUrl:
            response.data.data.photoUrl || "https://avatar.vercel.sh/default",
        });
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch user data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [token]);

  // ... (keep all your existing handler functions)

  if (!token) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="p-8 bg-white rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Access Denied
          </h2>
          <p className="text-gray-600">Please log in to view your profile.</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="p-8 bg-white rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Success Message */}
      {successMessage && (
        <div className="fixed top-4 right-4 z-50">
          <div className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center">
            <span>{successMessage}</span>
            <button
              onClick={() => setSuccessMessage("")}
              className="ml-4 text-white hover:text-gray-200"
            >
              &times;
            </button>
          </div>
        </div>
      )}

      {/* New Banner Header */}
      <div className="p-4 pb-0">
        <div className="relative container mx-auto pt-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl overflow-hidden shadow-lg">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
          </div>

          <div className="relative z-10 p-8 md:p-12">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8">
              {/* Profile Image */}
              <div className="relative group">
                <img
                  src={userData.photoUrl || "https://avatar.vercel.sh/default"}
                  alt="Profile"
                  className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white/80 shadow-xl object-cover"
                />
                {/* hidden profile edit part  */}
                <button
                  onClick={() => setIsEditModalOpen(true)}
                  className="absolute hidden bottom-0 right-0 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-all"
                >
                  <Edit className="h-5 w-5 text-indigo-600" />
                </button>
              </div>

              {/* Profile Info */}
              <div className="text-white">
                <h1 className="text-3xl md:text-4xl font-bold mb-2">
                  {userData.name}
                </h1>
                <p className="text-lg md:text-xl text-indigo-100 mb-4">
                  {userData.email}
                </p>
                <div className="flex flex-wrap gap-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white/20 backdrop-blur-sm">
                    <Shield className="h-4 w-4 mr-1" />
                    {userData.role}
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white/20 backdrop-blur-sm">
                    <Calendar className="h-4 w-4 mr-1" />
                    Joined {new Date(userData.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute right-0 top-0 h-full w-1/3">
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-purple-400 rounded-full opacity-20"></div>
            <div className="absolute -right-10 -bottom-10 w-80 h-80 bg-indigo-400 rounded-full opacity-20"></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4  py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Account Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden lg:col-span-2">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">
                Account Information
              </h2>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-indigo-50 p-3 rounded-lg mr-4">
                    <User className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Full Name
                    </h3>
                    <p className="text-lg font-medium text-gray-900">
                      {userData.name}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-indigo-50 p-3 rounded-lg mr-4">
                    <Mail className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Email Address
                    </h3>
                    <p className="text-lg font-medium text-gray-900">
                      {userData.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-indigo-50 p-3 rounded-lg mr-4">
                    <Shield className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Account Type
                    </h3>
                    <p className="text-lg font-medium text-gray-900 capitalize">
                      {userData.role}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-indigo-50 p-3 rounded-lg mr-4">
                    <Calendar className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Member Since
                    </h3>
                    <p className="text-lg font-medium text-gray-900">
                      {new Date(userData.createdAt).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                    </p>
                  </div>
                </div>
              </div>

              {/* there hidden edit part  */}
              <div className="mt-8 hidden flex-wrap gap-4">
                <button
                  onClick={() => setIsEditModalOpen(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  <Edit className="h-5 w-5" />
                  Edit Profile
                </button>
                <button
                  onClick={() => setIsPasswordModalOpen(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-white text-indigo-600 border border-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors"
                >
                  <Lock className="h-5 w-5" />
                  Change Password
                </button>
              </div>
            </div>
          </div>

          {/* Activity Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">
                Your Activity
              </h2>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="bg-green-50 p-3 rounded-lg mr-4">
                      <Calendar className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">
                        Events Attended
                      </h3>
                      <p className="text-lg font-medium text-gray-900">12</p>
                    </div>
                  </div>
                  <Link
                    to="/events"
                    className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                  >
                    View All
                  </Link>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="bg-blue-50 p-3 rounded-lg mr-4">
                      <Calendar className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">
                        Upcoming Events
                      </h3>
                      <p className="text-lg font-medium text-gray-900">3</p>
                    </div>
                  </div>
                  <Link
                    to="/events"
                    className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                  >
                    View All
                  </Link>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="bg-purple-50 p-3 rounded-lg mr-4">
                      <ImageIcon className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">
                        Photos Shared
                      </h3>
                      <p className="text-lg font-medium text-gray-900">8</p>
                    </div>
                  </div>
                  <Link
                    to="/gallery"
                    className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                  >
                    View All
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Keep your existing modals here */}
      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            {/* ... existing edit modal content ... */}
          </div>
        </div>
      )}

      {/* Change Password Modal */}
      {isPasswordModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            {/* ... existing password modal content ... */}
          </div>
        </div>
      )}
    </div>
  );
}
