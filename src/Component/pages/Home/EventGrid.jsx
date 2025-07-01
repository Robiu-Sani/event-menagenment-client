import { Calendar, MapPin, Users } from "lucide-react";
import useContextData from "../../custom-hook/useContext";
import useGetUserData from "../../default/useGetUserData";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useState } from "react";
import axios from "axios";

const EventGrid = () => {
  const { homeEvents } = useContextData();
  const { userData } = useGetUserData();
  const userEmail = userData?.email || "";
  const navigate = useNavigate();
  const [loadingStates, setLoadingStates] = useState({});

  const handleJoinEvent = async (eventId, currentAttendees = []) => {
    // Check if user is logged in
    const token = localStorage.getItem("accessToken");
    if (!token || !userEmail) {
      toast.error("Please login to join events");
      navigate("/login");
      return;
    }

    // Check if already joined
    if (currentAttendees.includes(userEmail)) {
      toast.error("You've already joined this event");
      return;
    }

    try {
      setLoadingStates((prev) => ({ ...prev, [eventId]: true }));

      const response = await axios.put(
        `/api/v1/event/${eventId}/join`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        // You might want to refresh the events data here
        // or update the specific event in the state
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error joining event:", error);
      toast.error(
        error.response?.data?.message ||
          "Failed to join event. Please try again."
      );
    } finally {
      setLoadingStates((prev) => ({ ...prev, [eventId]: false }));
    }
  };

  return (
    <div className="px-4 container mx-auto py-8 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {homeEvents.map((event) => {
          const isAttendee = event.attendees?.includes(userEmail);
          const isDisabled = isAttendee;

          return (
            <div
              key={event._id}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 overflow-hidden"
            >
              <div className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                    {event.category}
                  </span>
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
                    })}{" "}
                    • {event.time}
                  </span>
                </div>

                <div className="flex items-center text-sm text-gray-500">
                  <MapPin className="h-4 w-4 mr-1.5" />
                  <span className="line-clamp-1">{event.location}</span>
                </div>

                <button
                  onClick={() => handleJoinEvent(event._id, event.attendees)}
                  disabled={isDisabled || loadingStates[event._id]}
                  className={`mt-4 w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                    isDisabled
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-indigo-600 hover:bg-indigo-700"
                  } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors`}
                >
                  {loadingStates[event._id]
                    ? "Processing..."
                    : isAttendee
                    ? "Already Joined"
                    : "Join Event"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EventGrid;
