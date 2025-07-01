import { AlertTriangle, Home, ArrowLeft, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function Error() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white flex flex-col items-center justify-center p-6">
      <div className="text-center max-w-2xl mx-auto">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Link to="/" className="flex items-center">
            <img className="h-10 w-10" src="/logo.png" alt="Gather Up Logo" />
            <span className="ml-2 text-2xl font-bold text-indigo-600">
              Gather Up
            </span>
          </Link>
        </div>

        {/* Error Icon */}
        <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-red-100 mb-6">
          <AlertTriangle className="h-12 w-12 text-red-600" />
        </div>

        {/* Error Message */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          404 - Page Not Found
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Oops! The page you`re looking for doesn`t exist or has been moved.
          Let`s get you back on track.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
          >
            <Home className="h-5 w-5 mr-2" />
            Go to Homepage
          </Link>
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Return Back
          </button>
        </div>

        {/* Additional Help */}
        <div className="mt-12 p-4 bg-white rounded-lg shadow-sm border border-gray-200 max-w-md mx-auto">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Need help?</h3>
          <p className="text-gray-600 mb-3">
            Contact our support team for assistance.
          </p>
          <Link
            to="/contact"
            className="text-indigo-600 hover:text-indigo-800 font-medium inline-flex items-center"
          >
            Contact Support
            <ArrowRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
