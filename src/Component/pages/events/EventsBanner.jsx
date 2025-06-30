import { Search, CalendarDays, Filter, X } from "lucide-react";
import { useState, useEffect } from "react";

export default function EventsBanner() {
  const [filters, setFilters] = useState({
    searchTerm: "",
    dateRange: "",
    category: "all",
  });

  useEffect(() => {
    console.log("Current filters:", filters);
  }, [filters]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      searchTerm: "",
      dateRange: "",
      category: "all",
    });
  };

  return (
    <div className="bg-white shadow-sm rounded-lg p-6 mb-8">
      {/* Header Section */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Discover Your Next Experience
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Find the perfect events tailored to your interests. Search by keyword,
          date, or category to explore what`s happening around you.
        </p>
      </div>

      {/* Decorative Elements */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-gray-200" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-white px-4 text-sm text-indigo-600 font-medium">
            SEARCH FILTERS
          </span>
        </div>
      </div>

      {/* Search Filters */}
      <div className="flex flex-col max-w-7xl mx-auto md:flex-row gap-4 items-end mt-8">
        {/* Search Field */}
        <div className="flex-1 w-full">
          <label
            htmlFor="search"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            What are you looking for?
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              id="search"
              name="searchTerm"
              placeholder="Concert, workshop, sports..."
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-base"
              value={filters.searchTerm}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* Date Picker */}
        <div className="w-full md:w-48">
          <label
            htmlFor="date"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            When?
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <CalendarDays className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="date"
              id="date"
              name="dateRange"
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              value={filters.dateRange}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="w-full md:w-56">
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Category
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Filter className="h-5 w-5 text-gray-400" />
            </div>
            <select
              id="category"
              name="category"
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none bg-white"
              value={filters.category}
              onChange={handleInputChange}
            >
              <option value="all">All Categories</option>
              <option value="music">🎵 Music</option>
              <option value="sports">⚽ Sports</option>
              <option value="food">🍔 Food & Drink</option>
              <option value="art">🎨 Art & Culture</option>
              <option value="business">💼 Business</option>
              <option value="tech">💻 Technology</option>
            </select>
          </div>
        </div>

        {/* Clear Button */}
        <button
          type="button"
          onClick={handleClearFilters}
          className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
        >
          <X className="h-5 w-5 mr-1.5" />
          Clear All
        </button>
      </div>
    </div>
  );
}
