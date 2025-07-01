import { Home, CalendarPlus, Calendar, LogIn } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import useGetUserData from "./useGetUserData";
import { useState } from "react";
import Swal from "sweetalert2";

const NavBar = () => {
  const [callBox, setCallBox] = useState(false);
  const { userData, refetch } = useGetUserData();
  const navigate = useNavigate();

  const handleLogout = () => {
    setCallBox(false);
    Swal.fire({
      title: "Are you sure?",
      text: "Are You Really Wanot To Logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout!",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("accessToken");
        refetch();
        window.location.reload();
        navigate("/login");
        Swal.fire({
          title: "Logged Out!",
          text: "You have been logged out successfully.",
          icon: "success",
        });
      }
    });
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and website name */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <img className="h-8 w-8" src="/logo.png" alt="Gather Up Logo" />
              <span className="ml-2 text-xl font-bold text-indigo-600">
                Gather Up
              </span>
            </Link>
          </div>

          {/* Main navigation links */}
          <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
            <Link
              to="/"
              className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium flex items-center"
            >
              <Home className="h-4 w-4 mr-1" />
              Home
            </Link>
            <Link
              to="/events"
              className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium flex items-center"
            >
              <Calendar className="h-4 w-4 mr-1" />
              Events
            </Link>
            <Link
              to="/add-event"
              className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium flex items-center"
            >
              <CalendarPlus className="h-4 w-4 mr-1" />
              Add Event
            </Link>
            <Link
              to="/my-events"
              className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium flex items-center"
            >
              <Calendar className="h-4 w-4 mr-1" />
              My Events
            </Link>
          </div>

          {userData ? (
            <div className="h-auto relative flex items-center">
              <div
                onClick={() => setCallBox(!callBox)}
                className="w-[50px] cursor-pointer h-[50px] flex justify-center items-center rounded-full border-2 overflow-hidden"
              >
                <img
                  src={
                    userData.photoUrl ||
                    "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
                  }
                  className="max-h-full max-w-full"
                />
              </div>
              {callBox && (
                <div className="absolute top-[55px] flex flex-col gap-2 right-0 w-[250px] bg-white rounded-md border p-3">
                  <div className="p-2 text-sm text-center bg-gray-50 rounded-md">
                    {userData.name}
                  </div>
                  <Link
                    onClick={() => setCallBox(false)}
                    to={`/profile`}
                    className="p-2 border text-sm text-center bg-gray-50 rounded-md"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="p-2 border text-sm font-bold text-center bg-red-100 rounded-md"
                  >
                    LogOut
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center">
              <Link
                to="/login"
                className="ml-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <LogIn className="h-4 w-4 mr-1" />
                Sign In
              </Link>
            </div>
          )}
          {/* Sign In button */}
        </div>
      </div>

      {/* Mobile menu button (hidden on larger screens) */}
      <div className="md:hidden flex justify-between items-center px-4 py-2">
        <button
          type="button"
          className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-indigo-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
          aria-controls="mobile-menu"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          {/* Hamburger icon */}
          <svg
            className="block h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        {userData ? (
          <div className="h-auto relative flex items-center">
            <div
              onClick={() => setCallBox(!callBox)}
              className="w-[50px] cursor-pointer h-[50px] flex justify-center items-center rounded-full border-2 overflow-hidden"
            >
              <img
                src={
                  userData.photoUrl ||
                  "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
                }
                className="max-h-full max-w-full"
              />
            </div>
            {callBox && (
              <div className="absolute top-[55px] flex flex-col gap-2 right-0 w-[250px] bg-white rounded-md border p-3">
                <div className="p-2 text-sm text-center bg-gray-50 rounded-md">
                  {userData.name}
                </div>
                <Link
                  onClick={() => setCallBox(false)}
                  to={`/profile`}
                  className="p-2 border text-sm text-center bg-gray-50 rounded-md"
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="p-2 border text-sm font-bold text-center bg-red-100 rounded-md"
                >
                  LogOut
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link
            to="/login"
            className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <LogIn className="h-4 w-4 mr-1" />
            Sign In
          </Link>
        )}
      </div>

      {/* Mobile menu (hidden by default) */}
      <div className="md:hidden hidden" id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            to="/"
            className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-base font-medium flex items-center"
          >
            <Home className="h-4 w-4 mr-2" />
            Home
          </Link>
          <Link
            to="/events"
            className="text-gray-700 hover:text-indigo-600  px-3 py-2 rounded-md text-base font-medium flex items-center"
          >
            <Calendar className="h-4 w-4 mr-2" />
            Events
          </Link>
          <Link
            to="/add-event"
            className="text-gray-700 hover:text-indigo-600  px-3 py-2 rounded-md text-base font-medium flex items-center"
          >
            <CalendarPlus className="h-4 w-4 mr-2" />
            Add Event
          </Link>
          <Link
            to="/my-events"
            className="text-gray-700 hover:text-indigo-600  px-3 py-2 rounded-md text-base font-medium flex items-center"
          >
            <Calendar className="h-4 w-4 mr-2" />
            My Events
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
