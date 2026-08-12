import React from 'react';

export default function LoadingSpinner({ message = 'Loading...' }) {
  return (
    <div className="max-w-7xl mx-auto py-12 px-4 text-center">
      <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-600 border-t-transparent"></div>
      {message && <p className="mt-2 text-gray-500 text-sm">{message}</p>}
    </div>
  );
}
