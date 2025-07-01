import { useState } from "react";
import { Link } from "react-router-dom";

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "How do I create an account?",
      answer: (
        <>
          Click on the "Sign In" button in the navbar, then select "Register" to
          create a new account. You'll need to provide your name, email,
          password, and optionally a profile photo.
        </>
      ),
    },
    {
      question: "How can I create an event?",
      answer: (
        <>
          After logging in, click on "Add Event" in the navbar. Fill out the
          event details including title, date, time, location, and description.
          Click "Add Event" to submit.
        </>
      ),
    },
    {
      question: "Can I edit or delete my events?",
      answer: (
        <>
          Yes! Go to "My Events" in the navbar to see all events you've created.
          Each event has "Update" and "Delete" buttons. You'll be asked to
          confirm before deleting an event.
        </>
      ),
    },
    {
      question: "How do I join an event?",
      answer: (
        <>
          Browse events on the "Events" page. Click "Join Event" on any event
          you're interested in. You can only join each event once, and the
          attendee count will increase by 1.
        </>
      ),
    },
    {
      question: "How can I search for specific events?",
      answer: (
        <>
          On the "Events" page, use the search bar to find events by title. You
          can also filter events by date range (today, current week, last week,
          current month, or last month).
        </>
      ),
    },
    {
      question: "What information is shown on event cards?",
      answer: (
        <>
          Each event card displays the title, host name, date and time,
          location, description, and current number of attendees. Your own
          events also show update and delete options.
        </>
      ),
    },
    {
      question: "Is there a limit to how many events I can create?",
      answer: "No, you can create as many events as you'd like!",
    },
    {
      question: "How do I log out of my account?",
      answer: (
        <>
          Click on your profile picture in the navbar and select "Logout" from
          the dropdown menu. You`ll be signed out and redirected to the
          homepage.
        </>
      ),
    },
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Frequently Asked Questions
        </h2>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="mb-4 border border-gray-200 rounded-lg overflow-hidden shadow-sm"
            >
              <button
                className={`w-full px-6 py-4 text-left font-medium flex justify-between items-center transition-colors ${
                  activeIndex === index
                    ? "bg-indigo-50 text-indigo-700"
                    : "bg-white hover:bg-gray-50"
                }`}
                onClick={() => toggleFAQ(index)}
              >
                <span>{faq.question}</span>
                <svg
                  className={`w-5 h-5 transform transition-transform ${
                    activeIndex === index ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              <div
                className={`px-6 py-4 bg-white transition-all duration-300 ease-in-out ${
                  activeIndex === index ? "block" : "hidden"
                }`}
              >
                <div className="text-gray-600">{faq.answer}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 hidden text-center">
          <p className="text-gray-600 mb-4">
            Still have questions? Contact our support team for assistance.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
