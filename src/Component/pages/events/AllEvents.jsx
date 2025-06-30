import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Plus,
  ChevronLeft,
  ChevronRight,
  Search,
  CalendarDays,
  Filter,
  X,
} from "lucide-react";
import EventCard from "./EventCard";

export default function AllEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit] = useState(12);
  const [filters, setFilters] = useState({
    search: "",
    date: "",
    category: "all",
  });
  const navigate = useNavigate();

  // Build query string from filters
  const buildQueryString = () => {
    const params = new URLSearchParams();
    params.append("limit", limit);
    params.append("page", page);
    if (filters.search) params.append("search", filters.search);
    if (filters.date) params.append("date", filters.date);
    if (filters.category !== "all") params.append("category", filters.category);
    return params.toString();
  };

  // Fetch events with debouncing
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("accessToken");
        const queryString = buildQueryString();

        const response = await axios.get(
          `http://localhost:5000/api/v1/events?${queryString}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setEvents(response.data.data);
        setTotalPages(response.data.pagination.totalPages);
        setError(null);
      } catch (err) {
        setError(err.response?.data?.message || "Error loading events");
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(fetchEvents, 300);
    return () => clearTimeout(timer);
  }, [page, filters, limit]);

  // Handle join event
  const handleJoinEvent = async (eventId) => {
    try {
      const token = localStorage.getItem("accessToken");
      await axios.put(
        `http://localhost:5000/api/v1/events/${eventId}/join`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // Optimistic UI update
      setEvents(
        events.map((e) =>
          e._id === eventId ? { ...e, attendeeCount: e.attendeeCount + 1 } : e
        )
      );
    } catch (err) {
      setError("Failed to join event");
    }
  };

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
    setPage(1); // Reset to first page when filters change
  };

  // Clear all filters
  const handleClearFilters = () => {
    setFilters({
      search: "",
      date: "",
      category: "all",
    });
    setPage(1);
  };

  // Loading state
  if (loading) {
    return <EventListSkeleton />;
  }

  // Error state
  if (error) {
    return (
      <div className="container mx-auto p-4">
        <div className="bg-red-50 border-l-4 border-red-500 p-4">
          <p className="text-red-700">{error}</p>
          <button
            onClick={() => setError(null)}
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
      {/* Search and Filter Section */}
      <div className="bg-white shadow-sm rounded-lg p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4 items-end">
          {/* Search Field */}
          <div className="flex-1 w-full">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Search Events
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                name="search"
                value={filters.search}
                onChange={handleFilterChange}
                placeholder="Search events..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Date Picker */}
          <div className="w-full md:w-auto">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <CalendarDays className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="date"
                name="date"
                value={filters.date}
                onChange={handleFilterChange}
                className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="w-full md:w-auto">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Filter className="h-4 w-4 text-gray-400" />
              </div>
              <select
                name="category"
                value={filters.category}
                onChange={handleFilterChange}
                className="pl-10 pr-8 py-2 border rounded-lg appearance-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Categories</option>
                <option value="music">Music</option>
                <option value="sports">Sports</option>
                <option value="food">Food & Drink</option>
                <option value="art">Art & Culture</option>
                <option value="business">Business</option>
                <option value="tech">Technology</option>
              </select>
            </div>
          </div>

          {/* Clear Button */}
          <button
            onClick={handleClearFilters}
            className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition"
          >
            <X className="mr-1.5 h-4 w-4" /> Clear
          </button>
        </div>
      </div>

      {/* Events Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">All Events</h1>
        <button
          onClick={() => navigate("/add-event")}
          className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <Plus className="mr-2 h-4 w-4" /> Add Event
        </button>
      </div>

      {/* Events List */}
      {events.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">
            No events found matching your criteria
          </p>
          <button
            onClick={handleClearFilters}
            className="mt-4 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Clear all filters
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {events.map((event) => (
              <EventCard
                key={event._id}
                event={event}
                onJoin={handleJoinEvent}
              />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
              className="p-2 rounded disabled:opacity-50 hover:bg-gray-100"
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
                  className={`w-10 h-10 rounded ${
                    page === pageNum
                      ? "bg-blue-600 text-white"
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
              className="p-2 rounded disabled:opacity-50 hover:bg-gray-100"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </>
      )}
    </div>
  );
}

// Loading Skeleton Component
const EventListSkeleton = () => (
  <div className="container mx-auto p-4">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="border rounded-lg p-6 space-y-4">
          <div className="h-6 bg-gray-200 rounded w-3/4 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-4/5 animate-pulse"></div>
          <div className="h-10 bg-gray-200 rounded mt-4 animate-pulse"></div>
        </div>
      ))}
    </div>
  </div>
);
