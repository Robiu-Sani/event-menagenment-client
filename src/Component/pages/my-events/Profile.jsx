import axios from "axios";
import { useEffect, useState } from "react";
import useContextData from "../../custom-hook/useContext";

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
        const response = await axios.get("http://localhost:5000/api/v1/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserData(response.data.data);
        // Initialize edit form with current user data
        setEditForm({
          name: response.data.data.name,
          email: response.data.data.email,
          photoUrl: response.data.data.photoUrl,
        });
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch user data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [token]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        "http://localhost:5000/api/v1/me",
        editForm,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      handleUserData(response.data.data);
      setUserData((prev) => ({ ...prev, ...editForm }));
      setSuccessMessage("Profile updated successfully!");
      setIsEditModalOpen(false);
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update profile");
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      // You'll need to implement this endpoint in your backend
      await axios.put(
        "http://localhost:5000/api/v1/me/password",
        passwordForm,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccessMessage("Password changed successfully!");
      setIsPasswordModalOpen(false);
      setPasswordForm({ currentPassword: "", newPassword: "" });
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to change password");
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      // In a real app, you would upload to cloud storage or your server
      // This is a simplified version that just uses a local URL
      const reader = new FileReader();
      reader.onloadend = () => {
        const photoUrl = reader.result;
        setEditForm((prev) => ({ ...prev, photoUrl }));
      };
      reader.readAsDataURL(file);
    } catch (err) {
      setError("Failed to process image");
    }
  };

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
    <div className="min-h-screen bg-gray-100">
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

      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-indigo-800 text-white shadow-lg">
        <div className="container mx-auto px-6 py-16">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:mr-8 mb-6 md:mb-0">
              <img
                src={userData.photoUrl}
                alt="Profile"
                className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
              />
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-2">{userData.name}</h1>
              <p className="text-xl mb-4">{userData.email}</p>
              <span className="inline-block bg-white text-blue-600 px-4 py-1 rounded-full text-sm font-semibold">
                {userData.role}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
              Profile Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-4">
                  Personal Details
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Full Name</p>
                    <p className="text-gray-800 font-medium">{userData.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email Address</p>
                    <p className="text-gray-800 font-medium">
                      {userData.email}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Role</p>
                    <p className="text-gray-800 font-medium capitalize">
                      {userData.role}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-4">
                  Account Information
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">User ID</p>
                    <p className="text-gray-800 font-medium">{userData._id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Account Created</p>
                    <p className="text-gray-800 font-medium">
                      {new Date(
                        userData.createdAt || Date.now()
                      ).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">
                Profile Photo
              </h3>
              <div className="flex items-center space-x-6">
                <img
                  src={userData.photoUrl}
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover border-2 border-gray-200"
                />
              </div>
            </div>
          </div>

          <div className="bg-gray-50 px-8 py-4 border-t flex justify-between">
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
            >
              Edit Profile
            </button>
            <button
              onClick={() => setIsPasswordModalOpen(true)}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              Change Password
            </button>
          </div>
        </div>
      </main>

      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">Edit Profile</h3>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleUpdateProfile}>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="name"
                >
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={editForm.name}
                  onChange={(e) =>
                    setEditForm({ ...editForm, name: e.target.value })
                  }
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={editForm.email}
                  onChange={(e) =>
                    setEditForm({ ...editForm, email: e.target.value })
                  }
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="photo"
                >
                  Profile Photo URL
                </label>
                <input
                  id="photo"
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                  value={editForm.photoUrl}
                  onChange={(e) =>
                    setEditForm({ ...editForm, photoUrl: e.target.value })
                  }
                />
                <p className="text-sm text-gray-500 mb-2">OR</p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0
                    file:text-sm file:font-semibold
                    file:bg-blue-50 file:text-blue-700
                    hover:file:bg-blue-100"
                />
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Change Password Modal */}
      {isPasswordModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">
                Change Password
              </h3>
              <button
                onClick={() => setIsPasswordModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleChangePassword}>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="currentPassword"
                >
                  Current Password
                </label>
                <input
                  id="currentPassword"
                  type="password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={passwordForm.currentPassword}
                  onChange={(e) =>
                    setPasswordForm({
                      ...passwordForm,
                      currentPassword: e.target.value,
                    })
                  }
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="newPassword"
                >
                  New Password
                </label>
                <input
                  id="newPassword"
                  type="password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={passwordForm.newPassword}
                  onChange={(e) =>
                    setPasswordForm({
                      ...passwordForm,
                      newPassword: e.target.value,
                    })
                  }
                  required
                  minLength="6"
                />
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsPasswordModalOpen(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Change Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
