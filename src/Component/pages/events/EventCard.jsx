// components/EventCard.jsx
import { Calendar, Clock, MapPin, Users } from "lucide-react";

export default function EventCard({ event, onJoin }) {
  return (
    <div className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow bg-white">
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {event.title}
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>

        <div className="space-y-3 mb-4">
          <div className="flex items-center gap-3 text-sm text-gray-700">
            <Calendar className="h-4 w-4 text-gray-500" />
            <span>
              {new Date(event.date).toLocaleDateString("en-US", {
                weekday: "short",
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>

          <div className="flex items-center gap-3 text-sm text-gray-700">
            <Clock className="h-4 w-4 text-gray-500" />
            <span>
              {new Date(event.date).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>

          <div className="flex items-center gap-3 text-sm text-gray-700">
            <MapPin className="h-4 w-4 text-gray-500" />
            <span>{event.location}</span>
          </div>

          {event.category && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
              {event.category}
            </span>
          )}
        </div>

        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Users className="h-4 w-4" />
            <span>{event.attendeeCount} attending</span>
          </div>
          <button
            onClick={() => onJoin(event._id)}
            className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors font-medium"
          >
            Join
          </button>
        </div>
      </div>
    </div>
  );
}
