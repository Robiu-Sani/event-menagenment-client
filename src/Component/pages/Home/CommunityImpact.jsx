import { Bolt, Users, BarChart2, Globe } from "lucide-react";

const CommunityImpact = () => {
  const stats = [
    {
      id: 1,
      name: "Events Hosted",
      value: "10,000+",
      icon: Bolt,
      description: "Successful events created through our platform",
    },
    {
      id: 2,
      name: "Active Users",
      value: "50,000+",
      icon: Users,
      description: "Community members connecting through events",
    },
    {
      id: 3,
      name: "Average Attendance",
      value: "85%",
      icon: BarChart2,
      description: "Higher engagement than industry average",
    },
    {
      id: 4,
      name: "Countries",
      value: "30+",
      icon: Globe,
      description: "Global reach of our event community",
    },
  ];

  const successStories = [
    {
      id: 1,
      title: "Local Charity Success",
      content:
        "Helped a nonprofit increase fundraiser attendance by 200% through better event promotion tools",
      category: "Nonprofit",
    },
    {
      id: 2,
      title: "University Program Growth",
      content:
        "Enabled a student organization to manage 5x more events with the same staff resources",
      category: "Education",
    },
    {
      id: 3,
      title: "Small Business Revival",
      content:
        "Connected local businesses with customers through community markets and workshops",
      category: "Business",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Building Connections, Creating Impact
          </h2>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Discover how our platform is transforming communities through
            powerful event management
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="bg-indigo-50 rounded-xl p-6 text-center transition-all hover:shadow-lg"
            >
              <div className="flex justify-center">
                <stat.icon
                  className="h-12 w-12 text-indigo-600"
                  aria-hidden="true"
                />
              </div>
              <h3 className="mt-4 text-4xl font-bold text-gray-900">
                {stat.value}
              </h3>
              <p className="mt-2 text-lg font-medium text-gray-700">
                {stat.name}
              </p>
              <p className="mt-2 text-sm text-gray-500">{stat.description}</p>
            </div>
          ))}
        </div>

        {/* Success Stories */}
        <div className="max-w-7xl mx-auto">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">
            Success Stories From Our Community
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {successStories.map((story) => (
              <div
                key={story.id}
                className="relative bg-gray-50 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="absolute top-4 right-4 bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  {story.category}
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-bold text-gray-900 mb-3">
                    {story.title}
                  </h4>
                  <p className="text-gray-600">{story.content}</p>
                  <button className="mt-4 text-indigo-600 hover:text-indigo-800 font-medium flex items-center">
                    Read full story
                    <svg
                      className="w-4 h-4 ml-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 hidden text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to make an impact in your community?
          </h3>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
            <button className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg shadow hover:bg-indigo-700 transition-colors">
              Create Your First Event
            </button>
            <button className="px-6 py-3 border border-indigo-600 text-indigo-600 font-medium rounded-lg hover:bg-indigo-50 transition-colors">
              Learn More About Us
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunityImpact;
