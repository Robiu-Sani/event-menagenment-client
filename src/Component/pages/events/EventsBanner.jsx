import { Search, CalendarDays, Filter, X } from "lucide-react";
import { useState, useEffect } from "react";
import useContextData from "../../custom-hook/useContext";

export default function EventsBanner() {
  const { handleEventSearchItem } = useContextData();
  const [filters, setFilters] = useState({
    searchTerm: "",
    dateRange: "",
    category: "all",
  });

  // Debounce filter updates
  useEffect(() => {
    const timer = setTimeout(() => {
      handleEventSearchItem(filters);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [filters, handleEventSearchItem]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
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
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Discover Events
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Find events by keyword, date, or category
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-end">
        {/* Search Field */}
        <div className="flex-1 w-full">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              name="searchTerm"
              value={filters.searchTerm}
              onChange={handleInputChange}
              placeholder="Search events..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Date Picker */}
        <div className="w-full md:w-auto">
          <div className="relative">
            <CalendarDays className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="date"
              name="dateRange"
              value={filters.dateRange}
              onChange={handleInputChange}
              className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="w-full md:w-auto">
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <select
              name="category"
              value={filters.category}
              onChange={handleInputChange}
              className="pl-10 pr-8 py-2 border rounded-lg appearance-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Categories</option>
              <option value="music">Music</option>
              <option value="sports">Sports</option>
              <option value="food">Food & Drink</option>
              <option value="art">Art & Culture</option>
              <option value="business">Business</option>
              <option value="tech">Technology</option>
            </select>
          </div>
        </div>

        {/* Clear Button */}
        <button
          onClick={handleClearFilters}
          className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition"
        >
          <X className="mr-1.5" /> Clear
        </button>
      </div>
    </div>
  );
}