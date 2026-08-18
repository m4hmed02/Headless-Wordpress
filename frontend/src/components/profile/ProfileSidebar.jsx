import { TABS } from "./profileTabs";

export default function ProfileSidebar({
  loading,
  initials,
  firstName,
  lastName,
  email,
  activeTab,
  setActiveTab,
  mobileMenuOpen,
  setMobileMenuOpen,
  onLogout,
  isAuthenticated,
  isLoggingOut,
}) {
  return (
    <aside className="lg:w-72 flex-shrink-0 lg:sticky lg:top-[74px] lg:self-start">
      {/* Avatar card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-lg font-bold flex-shrink-0 select-none">
            {loading ? "…" : initials}
          </div>
          <div className="min-w-0">
            {loading ? (
              <div className="space-y-2 animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-28" />
                <div className="h-3 bg-gray-200 rounded w-36" />
              </div>
            ) : (
              <>
                <p className="text-sm font-bold text-gray-900 truncate">{firstName} {lastName}</p>
                <p className="text-xs text-gray-500 truncate">{email}</p>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile dropdown */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="w-full flex items-center justify-between bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium text-gray-900"
        >
          <span className="flex items-center gap-2">
            {TABS.find((t) => t.id === activeTab)?.icon}
            {TABS.find((t) => t.id === activeTab)?.label}
          </span>
          <svg
            className={`w-4 h-4 text-gray-400 transition-transform ${mobileMenuOpen ? "rotate-180" : ""}`}
            fill="none" viewBox="0 0 24 24" stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {mobileMenuOpen && (
          <div className="mt-1 bg-white border border-gray-200 rounded-xl overflow-hidden shadow-lg z-10 relative">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id); setMobileMenuOpen(false); }}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors ${
                  activeTab === tab.id ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Desktop nav */}
      <nav className="hidden lg:block bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {TABS.map((tab, idx) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`w-full flex items-center gap-3 px-5 py-3.5 text-sm font-medium transition-all text-left border-l-[3px] ${
              idx !== 0 ? "border-t border-t-gray-100" : ""
            } ${
              activeTab === tab.id
                ? "bg-blue-50 text-blue-600 border-l-blue-600"
                : "text-gray-700 hover:bg-gray-50 border-l-transparent"
            }`}
          >
            <span className={activeTab === tab.id ? "text-blue-600" : "text-gray-400"}>
              {tab.icon}
            </span>
            {tab.label}
            {activeTab === tab.id && (
              <svg className="w-4 h-4 ml-auto text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            )}
          </button>
        ))}

        {/* Logout */}
        {isAuthenticated && (
          <div className="border-t border-gray-100">
            <button 
              onClick={onLogout}
              disabled={isLoggingOut}
              className="w-full flex items-center gap-3 px-5 py-3.5 text-sm font-medium text-red-500 hover:bg-red-50 transition-colors text-left border-l-[3px] border-l-transparent disabled:opacity-60 disabled:cursor-wait"
            >
              {isLoggingOut ? (
                <svg className="animate-spin w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              )}
              {isLoggingOut ? "Logging out..." : "Logout"}
            </button>
          </div>
        )}
      </nav>
    </aside>
  );
}
