import { Link } from "react-router-dom";

export default function EventBanner() {
  return (
    <div className="relative mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl overflow-hidden shadow-lg">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      </div>

      <div className="relative z-10 p-8 md:p-12">
        <div className="max-w-4xl mx-auto">
          {/* Main heading */}
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Discover Amazing Events Near You
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-indigo-100 mb-8 max-w-2xl">
            Join thousands of participants in our curated selection of events.
            From music festivals to tech conferences.
          </p>

          {/* CTA button */}
          <Link
            to={"/events"}
            className="bg-white  text-indigo-600 hover:bg-indigo-50 px-6 py-3 rounded-lg font-medium transition-all transform hover:scale-105 shadow-md"
          >
            Browse All Events
          </Link>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute right-0 top-0 h-full w-1/3">
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-purple-400 rounded-full opacity-20"></div>
        <div className="absolute -right-10 -bottom-10 w-80 h-80 bg-indigo-400 rounded-full opacity-20"></div>
      </div>
    </div>
  );
}
