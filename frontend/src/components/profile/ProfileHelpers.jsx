// Shared small UI helpers used across Profile tab components

export function InfoField({ label, value }) {
  return (
    <div>
      <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">{label}</p>
      <p className="text-sm font-semibold text-gray-900">{value}</p>
    </div>
  );
}

export function EditField({ label, defaultValue = "", type = "text", disabled = false, placeholder = "" }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        type={type}
        defaultValue={defaultValue}
        disabled={disabled}
        placeholder={placeholder}
        className={`w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
          disabled ? "bg-gray-50 text-gray-400 cursor-not-allowed" : "bg-white"
        }`}
      />
    </div>
  );
}

export function AddressCard({ title, lines }) {
  return (
    <div className="border border-gray-200 rounded-2xl p-5 space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-gray-900">{title}</h3>
        <button className="text-xs text-blue-600 hover:text-blue-700 font-medium transition-colors">Edit</button>
      </div>
      {lines && lines.length > 0 ? (
        <address className="not-italic text-sm text-gray-600 space-y-0.5">
          {lines.map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </address>
      ) : (
        <p className="text-sm text-gray-400 italic">No address saved.</p>
      )}
    </div>
  );
}
