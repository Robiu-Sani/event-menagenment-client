import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  Calendar,
  MapPin,
  Users,
  Clock,
  ArrowRight,
  Search,
  PlusCircle,
} from "lucide-react";
import useContextData from "../../custom-hook/useContext";

export default function HomeBanner() {
  const [events, setEvents] = useState([]);
  const [featuredEvents, setFeaturedEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [category, setCategory] = useState("all");
  const { handleHomeEvents } = useContextData();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams();
        if (filter !== "all") params.append("filter", filter);
        if (searchQuery) params.append("search", searchQuery);
        if (category !== "all") params.append("category", category);

        const response = await axios.get(
          `${
            import.meta.env.VITE_SERVER
          }/api/v1/events/home?${params.toString()}`
        );

        if (response.data.success) {
          setEvents(response.data.data);
          // Take first 3 events for featured section
          setFeaturedEvents(response.data.data.slice(0, 3));
          handleHomeEvents(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [filter, searchQuery, category]);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatTime = (timeString) => {
    if (!timeString) return "";
    const [hours, minutes] = timeString.split(":");
    const hour = parseInt(hours);
    const period = hour >= 12 ? "PM" : "AM";
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${period}`;
  };

  return (
    <section className="w-full py-12 md:py-16 bg-gradient-to-b from-indigo-50 to-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-8 md:gap-12">
          {/* Main Content */}
          <div className="md:w-2/3">
            <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800 mb-4">
              <Calendar className="h-3 w-3 mr-2" />
              Upcoming Events
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6 text-gray-900">
              Discover Amazing Events with{" "}
              <span className="text-indigo-600">Gather Up</span>
            </h1>

            <p className="text-lg text-gray-600 mb-8 max-w-2xl">
              Find, join, or create events in your community. From tech meetups
              to music festivals, we`ve got something for everyone. Connect with
              like-minded people and make memories.
            </p>

            <div className="relative max-w-xl mb-8">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search events by title, location..."
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex flex-wrap gap-3 mb-8">
              <button
                onClick={() => setFilter("all")}
                className={`px-4 py-2 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors ${
                  filter === "all"
                    ? "bg-indigo-600 text-white hover:bg-indigo-700"
                    : "bg-white border border-gray-300 hover:bg-gray-50"
                }`}
              >
                All Events
              </button>
              <button
                onClick={() => setFilter("today")}
                className={`px-4 py-2 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors ${
                  filter === "today"
                    ? "bg-indigo-600 text-white hover:bg-indigo-700"
                    : "bg-white border border-gray-300 hover:bg-gray-50"
                }`}
              >
                Today
              </button>
              <button
                onClick={() => setFilter("thisweek")}
                className={`px-4 py-2 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors ${
                  filter === "thisweek"
                    ? "bg-indigo-600 text-white hover:bg-indigo-700"
                    : "bg-white border border-gray-300 hover:bg-gray-50"
                }`}
              >
                This Week
              </button>
              <button
                onClick={() => setFilter("thismonth")}
                className={`px-4 py-2 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors ${
                  filter === "thismonth"
                    ? "bg-indigo-600 text-white hover:bg-indigo-700"
                    : "bg-white border border-gray-300 hover:bg-gray-50"
                }`}
              >
                This Month
              </button>
            </div>
            {/* this div is hidden for sime time  */}
            <div className=" hidden flex-wrap gap-3 mb-8">
              <button
                onClick={() => setCategory("all")}
                className={`px-4 py-2 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors ${
                  category === "all"
                    ? "bg-indigo-600 text-white hover:bg-indigo-700"
                    : "bg-white border border-gray-300 hover:bg-gray-50"
                }`}
              >
                All Categories
              </button>
              <button
                onClick={() => setCategory("music")}
                className={`px-4 py-2 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors ${
                  category === "music"
                    ? "bg-indigo-600 text-white hover:bg-indigo-700"
                    : "bg-white border border-gray-300 hover:bg-gray-50"
                }`}
              >
                Music
              </button>
              <button
                onClick={() => setCategory("sports")}
                className={`px-4 py-2 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors ${
                  category === "sports"
                    ? "bg-indigo-600 text-white hover:bg-indigo-700"
                    : "bg-white border border-gray-300 hover:bg-gray-50"
                }`}
              >
                Sports
              </button>
              <button
                onClick={() => setCategory("business")}
                className={`px-4 py-2 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors ${
                  category === "business"
                    ? "bg-indigo-600 text-white hover:bg-indigo-700"
                    : "bg-white border border-gray-300 hover:bg-gray-50"
                }`}
              >
                Business
              </button>
            </div>
          </div>

          {/* Featured Events */}
          <div className="md:w-1/3">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <Link
                to={`/events`}
                className="flex items-center text-lg font-semibold mb-4 text-gray-900"
              >
                <PlusCircle className="h-5 w-5 mr-2 text-indigo-600" />
                Featured Events
              </Link>

              {loading ? (
                <div className="space-y-6">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="animate-pulse">
                      <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                      <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-2/3 mb-1"></div>
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-6">
                  {featuredEvents.map((event) => (
                    <div key={event._id} className="group">
                      <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 mb-2">
                        {event.attendeeCount} attending
                      </div>
                      <h3 className="font-medium mb-2 group-hover:text-indigo-600 transition-colors text-gray-900">
                        {event.title}
                      </h3>
                      <div className="flex items-center text-sm text-gray-500 mb-1">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span className="mr-3">{formatDate(event.date)}</span>
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{formatTime(event.time)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <Link
                to={`/events`}
                className="mt-4 px-0 text-indigo-600 hover:text-indigo-800 flex items-center font-medium text-sm focus:outline-none focus:underline"
              >
                View all featured events
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </div>
          </div>
        </div>

        {/* Organizer Spotlight */}
        <div className="mt-12 bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center">
              <Users className="h-6 w-6 text-indigo-600" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="font-semibold text-gray-900">
                Become an Event Organizer
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Join thousands of organizers who are creating amazing
                experiences for their communities. Our platform makes it easy to
                manage attendees, promote your event, and connect with
                participants.
              </p>
            </div>
            <Link
              to={`/add-event`}
              className="px-4 py-2 bg-white border border-indigo-600 text-indigo-600 rounded-lg shadow-sm hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors shrink-0"
            >
              Create an Event
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
