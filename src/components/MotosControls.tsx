"use client";

import { useState } from "react";

interface MotosControlsProps {
  totalCount: number;
  showingCount: number;
  sortBy: string;
  setSortBy: (sort: string) => void;
  view: "grid" | "list";
  setView: (view: "grid" | "list") => void;
}

export default function MotosControls({
  totalCount,
  showingCount,
  sortBy,
  setSortBy,
  view,
  setView,
}: MotosControlsProps) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-4 mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
      {/* Showing count */}
      <div className="text-sm text-gray-500">
        Showing <span className="font-bold text-gray-700">{showingCount}</span> of{" "}
        <span className="font-bold text-gray-700">{totalCount}</span> motorcycles
      </div>

      {/* Sort & View */}
      <div className="flex items-center gap-4">
        {/* Sort */}
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-500 font-bold font-montserrat">Sort by:</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#F36A21]"
          >
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="year-new">Year: Newest First</option>
            <option value="year-old">Year: Oldest First</option>
            <option value="mileage-low">Mileage: Lowest First</option>
            <option value="recently-added">Recently Added</option>
          </select>
        </div>

        {/* View toggle */}
        <div className="flex items-center border border-gray-300 rounded-lg">
          <button
            onClick={() => setView("grid")}
            className={`p-2 rounded-l-lg ${
              view === "grid" ? "bg-[#F36A21] text-white" : "bg-white text-gray-500 hover:bg-gray-100"
            }`}
          >
            {/* Grid Icon */}
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/>
            </svg>
          </button>

          <button
            onClick={() => setView("list")}
            className={`p-2 rounded-r-lg ${
              view === "list" ? "bg-[#F36A21] text-white" : "bg-white text-gray-500 hover:bg-gray-100"
            }`}
          >
            {/* List Icon */}
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
