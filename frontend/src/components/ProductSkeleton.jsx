import React from 'react';

export default function ProductSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-pulse">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {/* Left: Gallery Skeleton */}
        <div className="space-y-4">
          <div className="aspect-square w-full bg-gray-200 rounded-2xl"></div>
          <div className="flex gap-4">
            <div className="w-20 h-20 bg-gray-200 rounded-lg"></div>
            <div className="w-20 h-20 bg-gray-200 rounded-lg"></div>
            <div className="w-20 h-20 bg-gray-200 rounded-lg"></div>
          </div>
        </div>

        {/* Right: Info Skeleton */}
        <div className="space-y-6">
          {/* Category & Stock */}
          <div className="flex items-center gap-3">
            <div className="h-6 w-24 bg-gray-200 rounded-full"></div>
            <div className="h-6 w-20 bg-gray-200 rounded-full"></div>
          </div>

          {/* Title */}
          <div className="h-8 w-3/4 bg-gray-200 rounded-md"></div>

          {/* SKU */}
          <div className="h-4 w-32 bg-gray-200 rounded"></div>

          {/* Price */}
          <div className="h-10 w-36 bg-gray-200 rounded-lg"></div>

          {/* Short Description */}
          <div className="space-y-2 pt-2">
            <div className="h-4 w-full bg-gray-200 rounded"></div>
            <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
          </div>

          {/* Actions */}
          <div className="flex gap-4 pt-4">
            <div className="h-12 w-32 bg-gray-200 rounded-xl"></div>
            <div className="h-12 flex-1 bg-gray-200 rounded-xl"></div>
          </div>

          {/* Meta Details */}
          <div className="border-t border-gray-100 pt-6 space-y-3">
            <div className="h-4 w-40 bg-gray-200 rounded"></div>
            <div className="h-4 w-48 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
