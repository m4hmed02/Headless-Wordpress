// TODO: Integrate with a wishlist API when available
export default function ProfileWishlistTab() {
  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-6">Wishlist</h2>
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-red-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </div>
        <p className="text-gray-500 text-sm">Your wishlist is empty.</p>
      </div>
    </div>
  );
}
