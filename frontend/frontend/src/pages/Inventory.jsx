import React from "react";
import { PackageSearch, TrendingUp, TrendingDown } from "lucide-react";

const Inventory = () => {
  return (
    <div className="max-w-5xl mx-auto mt-10 px-6 py-8 bg-white rounded-2xl shadow-lg border border-gray-200">
      <div className="flex items-center gap-3 mb-6">
        <PackageSearch className="text-blue-600 w-7 h-7" />
        <h2 className="text-3xl font-bold text-gray-800">Inventory Optimization</h2>
      </div>

      <p className="text-gray-600 mb-8 text-lg leading-relaxed">
        Here are smart recommendations on which items to stock up or reduce, powered by our AI-driven forecasting engine.
      </p>

      {/* Sample Recommendation Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Stock Up Card */}
        <div className="p-6 bg-green-50 border border-green-200 rounded-xl shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="text-green-600 w-5 h-5" />
            <h3 className="text-lg font-semibold text-green-700">Stock Up</h3>
          </div>
          <ul className="text-green-800 list-disc list-inside space-y-1">
            <li>Item A - High Demand Forecast</li>
            <li>Item B - Trending Up</li>
            <li>Item C - Low Current Inventory</li>
          </ul>
        </div>

        {/* Reduce Stock Card */}
        <div className="p-6 bg-red-50 border border-red-200 rounded-xl shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <TrendingDown className="text-red-600 w-5 h-5" />
            <h3 className="text-lg font-semibold text-red-700">Reduce Stock</h3>
          </div>
          <ul className="text-red-800 list-disc list-inside space-y-1">
            <li>Item X - Declining Sales</li>
            <li>Item Y - Overstocked</li>
            <li>Item Z - Seasonal Decline</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Inventory;
