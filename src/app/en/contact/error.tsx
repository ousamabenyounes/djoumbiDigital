'use client';

export default function Error() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold text-red-600 mb-4">
        Error Loading Contact Page
      </h1>
      <p className="text-gray-600">
        Please try refreshing the page or contact support if the problem persists.
      </p>
    </div>
  );
} 