// ─── Skeleton Box ──────────────────────────────────────────────────────────────
function SkeletonBox({ className = "" }) {
  return (
    <div
      className={`bg-gray-200 rounded animate-pulse ${className}`}
      style={{ animation: "pulse 1.5s cubic-bezier(0.4,0,0.6,1) infinite" }}
    />
  );
}

// ─── Full Checkout Skeleton ────────────────────────────────────────────────────
export default function CheckoutSkeleton() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Page title */}
      <SkeletonBox className="h-8 w-48 mb-8" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left – Billing form skeleton */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-5">
            <SkeletonBox className="h-5 w-40 mb-2" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <SkeletonBox className="h-4 w-24" />
                  <SkeletonBox className="h-10 w-full" />
                </div>
              ))}
            </div>
            <div className="space-y-2">
              <SkeletonBox className="h-4 w-24" />
              <SkeletonBox className="h-10 w-full" />
            </div>
            <div className="space-y-2">
              <SkeletonBox className="h-4 w-24" />
              <SkeletonBox className="h-20 w-full" />
            </div>
          </div>

          {/* Shipping address skeleton */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-5">
            <SkeletonBox className="h-5 w-48 mb-2" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <SkeletonBox className="h-4 w-24" />
                  <SkeletonBox className="h-10 w-full" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right – Order summary skeleton */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-5 sticky top-6">
            <SkeletonBox className="h-5 w-36 mb-2" />
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <SkeletonBox className="w-12 h-12 rounded-lg flex-shrink-0" />
                <div className="flex-1 space-y-2">
                  <SkeletonBox className="h-3 w-3/4" />
                  <SkeletonBox className="h-3 w-1/4" />
                </div>
              </div>
            ))}
            <div className="border-t border-gray-100 pt-4 space-y-3">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex justify-between">
                  <SkeletonBox className="h-4 w-24" />
                  <SkeletonBox className="h-4 w-16" />
                </div>
              ))}
            </div>
            <SkeletonBox className="h-12 w-full rounded-xl mt-2" />
          </div>
        </div>
      </div>
    </div>
  );
}
