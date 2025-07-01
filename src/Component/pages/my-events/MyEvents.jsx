import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Plus, Edit, Trash2, Calendar, MapPin, Users } from "lucide-react";
import toast from "react-hot-toast";
import useGetUserData from "../../default/useGetUserData";
import Swal from "sweetalert2";
import EventBanner from "./EventBanner";

export default function MyEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userData } = useGetUserData();
  const navigate = useNavigate();

  // Fetch user's events
  useEffect(() => {
    const fetchMyEvents = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("accessToken");

        if (!token) {
          throw new Error("You need to log in first");
        }

        const response = await axios.get(
          `${import.meta.env.VITE_SERVER}/api/v1/my-events`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response.data.success) {
          setEvents(response.data.data);
          setError(null);
        } else {
          throw new Error(response.data.message || "Failed to fetch events");
        }
      } catch (err) {
        console.error("Error fetching events:", err);
        const errorMessage =
          err.response?.data?.message ||
          err.message ||
          "Error loading your events";
        setError(errorMessage);

        // Only show toast for errors other than "no events found"
        if (err.response?.status !== 404) {
          toast.error(errorMessage);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMyEvents();
  }, []);

  // Handle delete event
  const handleDelete = async (eventId) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        const token = localStorage.getItem("accessToken");
        await axios.delete(`http://localhost:5000/api/v1/event/${eventId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setEvents(events.filter((event) => event._id !== eventId));
        toast.success("Event deleted successfully!");
        Swal.fire("Deleted!", "Your event has been deleted.", "success");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to delete event";
      toast.error(errorMessage);

      // If unauthorized, redirect to login
      if (error.response?.status === 401 || error.response?.status === 403) {
        navigate("/login");
      }
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <EventBanner />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
            >
              <div className="p-5">
                <div className="h-6 bg-gray-200 rounded w-3/4 animate-pulse mb-3"></div>
                <div className="h-4 bg-gray-200 rounded w-full animate-pulse mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse mb-4"></div>
                <div className="h-10 bg-gray-200 rounded-md animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <EventBanner />

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg mb-6">
          <p className="text-red-700">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-2 text-sm text-red-600 hover:underline"
          >
            Try again
          </button>
        </div>
      )}

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">My Events</h1>
        <button
          onClick={() => navigate("/add-event")}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <Plus className="h-5 w-5" /> Create New Event
        </button>
      </div>

      {events.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-100">
          <p className="text-gray-500 mb-4">
            You haven't created any events yet
          </p>
          <button
            onClick={() => navigate("/add-event")}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
          >
            Create Your First Event
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div
              key={event._id}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 overflow-hidden"
            >
              <div className="p-5">
                <div className="flex items-center justify-between mb-3">
                  {event.category && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                      {event.category}
                    </span>
                  )}
                  <div className="flex items-center text-sm text-gray-500">
                    <Users className="h-4 w-4 mr-1" />
                    <span>{event.attendeeCount || 0}</span>
                  </div>
                </div>

                <h3 className="text-lg font-medium text-gray-900 mb-2 line-clamp-2">
                  {event.title}
                </h3>

                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <Calendar className="h-4 w-4 mr-1.5" />
                  <span>
                    {new Date(event.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      weekday: "short",
                    })}
                    {event.time && ` • ${event.time}`}
                  </span>
                </div>

                {event.location && (
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <MapPin className="h-4 w-4 mr-1.5" />
                    <span className="line-clamp-1">{event.location}</span>
                  </div>
                )}

                {event.description && (
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {event.description}
                  </p>
                )}

                <div className="flex justify-between items-center pt-4 border-t">
                  <div className="flex gap-2">
                    <button
                      onClick={() => navigate(`/edit-event/${event._id}`)}
                      className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                      title="Edit event"
                    >
                      <Edit className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(event._id)}
                      className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete event"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                  <span className="text-sm text-gray-500">
                    {event.attendeeCount || 0} attendees
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
