import { Calendar, MapPin, Users } from "lucide-react";

const EventGrid = () => {
  const events = [
    {
      id: 1,
      title: "Tech Startup Networking",
      date: "2024-07-15",
      time: "18:00",
      location: "Downtown Co-Working Space",
      attendees: 124,
      category: "Business",
    },
    {
      id: 2,
      title: "Community Yoga in the Park",
      date: "2024-07-16",
      time: "08:30",
      location: "Central Park",
      attendees: 89,
      category: "Wellness",
    },
    {
      id: 3,
      title: "Indie Music Festival",
      date: "2024-07-18",
      time: "14:00",
      location: "Riverside Amphitheater",
      attendees: 256,
      category: "Music",
    },
    {
      id: 4,
      title: "Local Art Exhibition",
      date: "2024-07-20",
      time: "10:00",
      location: "Modern Art Gallery",
      attendees: 72,
      category: "Art",
    },
    {
      id: 5,
      title: "Food Truck Festival",
      date: "2024-07-22",
      time: "12:00",
      location: "Waterfront Plaza",
      attendees: 310,
      category: "Food",
    },
    {
      id: 6,
      title: "Blockchain Workshop",
      date: "2024-07-25",
      time: "16:00",
      location: "Innovation Hub",
      attendees: 45,
      category: "Education",
    },
  ];

  return (
    <div className="px-4 container mx-auto py-8 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div
            key={event.id}
            className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 overflow-hidden"
          >
            <div className="p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                  {event.category}
                </span>
                <div className="flex items-center text-sm text-gray-500">
                  <Users className="h-4 w-4 mr-1" />
                  <span>{event.attendees}</span>
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

              <button className="mt-4 w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors">
                Join Event
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventGrid;
