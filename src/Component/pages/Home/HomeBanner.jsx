import {
  Calendar,
  MapPin,
  Users,
  Clock,
  ArrowRight,
  Search,
  PlusCircle,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function HomeBanner() {
  const featuredEvents = [
    {
      title: "Tech Conference 2024",
      location: "San Francisco, CA",
      date: "October 15, 2024",
      time: "9:00 AM - 5:00 PM",
      attendees: 245,
    },
    {
      title: "Community Charity Run",
      location: "Central Park, NY",
      date: "November 5, 2024",
      time: "7:00 AM - 10:00 AM",
      attendees: 120,
    },
    {
      title: "Art Exhibition Opening",
      location: "Modern Art Museum",
      date: "September 22, 2024",
      time: "6:00 PM - 9:00 PM",
      attendees: 85,
    },
  ];

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
              />
            </div>

            <div className="flex flex-wrap gap-3 mb-8">
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors">
                All Events
              </button>
              <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors">
                Today
              </button>
              <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors">
                This Week
              </button>
              <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors">
                This Month
              </button>
            </div>
          </div>

          {/* Featured Events */}
          <div className="md:w-1/3">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <Link
                to={`/add-event`}
                className="flex items-center text-lg font-semibold mb-4 text-gray-900"
              >
                <PlusCircle className="h-5 w-5 mr-2 text-indigo-600" />
                Featured Events
              </Link>

              <div className="space-y-6">
                {featuredEvents.map((event, index) => (
                  <div key={index} className="group">
                    <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 mb-2">
                      {event.attendees} attending
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
                      <span className="mr-3">{event.date}</span>
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{event.time}</span>
                    </div>
                  </div>
                ))}
              </div>

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
