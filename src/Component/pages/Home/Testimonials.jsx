import { useState } from "react";

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Event Organizer",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      content:
        "This platform has completely transformed how I manage my events. The intuitive interface and powerful features save me hours of work every week!",
      rating: 5,
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Community Manager",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      content:
        "The attendee tracking and event management tools are exceptional. Our community events have never been better organized!",
      rating: 4,
    },
    {
      id: 3,
      name: "Priya Patel",
      role: "Nonprofit Director",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg",
      content:
        "As a nonprofit, we needed an affordable solution. This platform gives us enterprise-level features without the enterprise price tag.",
      rating: 5,
    },
    {
      id: 4,
      name: "David Wilson",
      role: "University Coordinator",
      avatar: "https://randomuser.me/api/portraits/men/75.jpg",
      content:
        "The filtering and search capabilities make it so easy to find relevant events. Our student engagement has increased by 40% since we started using this platform.",
      rating: 5,
    },
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const renderStars = (rating) => {
    return (
      <div className="flex justify-center">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`w-5 h-5 ${
              i < rating ? "text-yellow-400" : "text-gray-300"
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  return (
    <section className="py-16 bg-gradient-to-r from-indigo-50 to-purple-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          What Our Users Say
        </h2>

        <div className="max-w-4xl mx-auto relative">
          {/* Testimonial Card */}
          <div className="bg-white rounded-xl shadow-lg p-8 md:p-10 text-center transition-all duration-300 transform hover:scale-[1.02]">
            <div className="flex justify-center mb-6">
              <img
                src={testimonials[currentIndex].avatar}
                alt={testimonials[currentIndex].name}
                className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-md"
              />
            </div>

            {renderStars(testimonials[currentIndex].rating)}

            <blockquote className="mt-6 text-lg text-gray-600 italic">
              "{testimonials[currentIndex].content}"
            </blockquote>

            <div className="mt-8">
              <p className="text-xl font-semibold text-gray-800">
                {testimonials[currentIndex].name}
              </p>
              <p className="text-indigo-600">
                {testimonials[currentIndex].role}
              </p>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 md:-ml-8 bg-white p-2 rounded-full shadow-md hover:bg-indigo-100 transition-colors"
            aria-label="Previous testimonial"
          >
            <svg
              className="w-6 h-6 text-indigo-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 md:-mr-8 bg-white p-2 rounded-full shadow-md hover:bg-indigo-100 transition-colors"
            aria-label="Next testimonial"
          >
            <svg
              className="w-6 h-6 text-indigo-600"
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

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  currentIndex === index ? "bg-indigo-600" : "bg-gray-300"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
