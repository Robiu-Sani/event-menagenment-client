import { useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { Calendar, Clock, MapPin, User, Filter, Search } from "lucide-react";
import axios from "axios";

export default function AddEventForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch events from API
  const fetchEvents = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        "https://task-lime-one.vercel.app/api/events"
      );
      setEvents(response.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch events");
    } finally {
      setIsLoading(false);
    }
  };

  console.log(fetchEvents);

  // Submit new event
  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "https://task-lime-one.vercel.app/api/events",
        {
          ...data,
          attendeeCount: 0, // Default value
        }
      );
      setEvents([...events, response.data]);
      reset();
      toast.success("Event added successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add event");
    }
  };

  // Filter events based on selected filter and search term
  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const eventDate = new Date(event.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    switch (filter) {
      case "today":
        return (
          matchesSearch && eventDate.toDateString() === today.toDateString()
        );
      case "week": {
        const nextWeek = new Date(today);
        nextWeek.setDate(today.getDate() + 7);
        return matchesSearch && eventDate >= today && eventDate <= nextWeek;
      }
      case "month": {
        const nextMonth = new Date(today);
        nextMonth.setMonth(today.getMonth() + 1);
        return matchesSearch && eventDate >= today && eventDate <= nextMonth;
      }
      default:
        return matchesSearch;
    }
  });

  return (
    <div className="max-w-6xl mx-auto p-6">
      <Toaster position="top-right" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Add Event Form */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Create New Event
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Event Title *
              </label>
              <input
                {...register("title", { required: "Title is required" })}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  errors.title ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter event title"
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.title.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Your Name *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  {...register("name", { required: "Name is required" })}
                  className={`w-full pl-10 pr-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter your name"
                />
              </div>
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="date"
                    {...register("date", { required: "Date is required" })}
                    className={`w-full pl-10 pr-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                      errors.date ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                </div>
                {errors.date && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.date.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Time *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Clock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="time"
                    {...register("time", { required: "Time is required" })}
                    className={`w-full pl-10 pr-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                      errors.time ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                </div>
                {errors.time && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.time.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  {...register("location", {
                    required: "Location is required",
                  })}
                  className={`w-full pl-10 pr-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                    errors.location ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter event location"
                />
              </div>
              {errors.location && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.location.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description *
              </label>
              <textarea
                {...register("description", {
                  required: "Description is required",
                })}
                rows={3}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  errors.description ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Describe your event"
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.description.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {isLoading ? "Adding..." : "Add Event"}
            </button>
          </form>
        </div>

        {/* Events List with Filter */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <h2 className="text-2xl font-bold text-gray-900">Your Events</h2>

            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search events..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Filter className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none bg-white"
                >
                  <option value="all">All Events</option>
                  <option value="today">Today</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                </select>
              </div>
            </div>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
          ) : filteredEvents.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No events found. Create your first event!
            </div>
          ) : (
            <div className="space-y-4">
              {filteredEvents.map((event) => (
                <div
                  key={event.id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow"
                >
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium text-lg text-gray-900">
                      {event.title}
                    </h3>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                      {event.attendeeCount} attending
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">By {event.name}</p>
                  <div className="flex items-center text-sm text-gray-500 mt-2">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>
                      {new Date(event.date).toLocaleDateString("en-US", {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                      })}{" "}
                      at {event.time}
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500 mt-1">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{event.location}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                    {event.description}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
