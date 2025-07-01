import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Plus,
  ChevronLeft,
  ChevronRight,
  Edit,
  Trash2,
  Calendar,
  MapPin,
  Users,
} from "lucide-react";
import toast from "react-hot-toast";
import useGetUserData from "../../default/useGetUserData";
import Swal from "sweetalert2";

export default function AllEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit] = useState(12);
  const { userData } = useGetUserData();
  const navigate = useNavigate();

  // Fetch events
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("accessToken");
        const response = await axios.get(
          `http://localhost:5000/api/v1/events?limit=${limit}&page=${page}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setEvents(response.data.data);
        setTotalPages(response.data.pagination.totalPages);
        setError(null);
      } catch (err) {
        setError(err.response?.data?.message || "Error loading events");
        toast.error(err.response?.data?.message || "Failed to load events");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [page, limit]);

  // Handle delete event
  const handleDelete = async (eventId) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          const token = localStorage.getItem("accessToken");
          axios.delete(`http://localhost:5000/api/v1/event/${eventId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setEvents(events.filter((event) => event._id !== eventId));
          toast.success("Event deleted successfully!");

          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        }
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete event");
    }
  };

  // Handle join event
  const handleJoin = async (eventId) => {
    try {
      const token = localStorage.getItem("accessToken");
      await axios.put(
        `http://localhost:5000/api/v1/events/${eventId}/join`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Update the local state to reflect the join
      setEvents(
        events.map((event) => {
          if (event._id === eventId) {
            return {
              ...event,
              attendeeCount: event.attendeeCount + 1,
              attendees: [...(event.attendees || []), userData?.email],
            };
          }
          return event;
        })
      );

      toast.success("Successfully joined the event!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to join event");
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
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

  // Error state
  if (error) {
    return (
      <div className="container mx-auto p-4">
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
          <p className="text-red-700">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-2 text-sm text-red-600 hover:underline"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">All Events</h1>
        <button
          onClick={() => navigate("/add-event")}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <Plus className="h-5 w-5" /> Create Event
        </button>
      </div>

      {events.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-100">
          <p className="text-gray-500">No events found</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {events.map((event) => {
              const isCreator =
                userData && event.creatorEmail === userData.email;
              const hasJoined =
                userData && event.attendees?.includes(userData.email);

              return (
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
                    <p>{event?.description}</p>

                    <div className="flex justify-between items-center pt-4 border-t">
                      <div className="flex gap-2">
                        {isCreator && (
                          <>
                            <button
                              onClick={() =>
                                navigate(`/edit-event/${event._id}`)
                              }
                              className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                            >
                              <Edit className="h-5 w-5" />
                            </button>
                            <button
                              onClick={() => handleDelete(event._id)}
                              className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          </>
                        )}
                      </div>
                      <button
                        onClick={() => handleJoin(event._id)}
                        disabled={hasJoined}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                          hasJoined
                            ? "bg-gray-100 text-gray-600 cursor-not-allowed"
                            : "bg-indigo-600 hover:bg-indigo-700 text-white"
                        }`}
                      >
                        {hasJoined ? "Joined" : "Join"}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(p - 1, 1))}
                disabled={page === 1}
                className="p-2 rounded-lg disabled:opacity-50 hover:bg-gray-100 transition-colors"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pageNum =
                  page <= 3
                    ? i + 1
                    : page >= totalPages - 2
                    ? totalPages - 4 + i
                    : page - 2 + i;
                return (
                  <button
                    key={pageNum}
                    onClick={() => setPage(pageNum)}
                    className={`w-10 h-10 rounded-lg transition-colors ${
                      page === pageNum
                        ? "bg-indigo-600 text-white"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}

              {totalPages > 5 && page < totalPages - 2 && (
                <span className="px-2">...</span>
              )}

              <button
                onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                disabled={page === totalPages}
                className="p-2 rounded-lg disabled:opacity-50 hover:bg-gray-100 transition-colors"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
