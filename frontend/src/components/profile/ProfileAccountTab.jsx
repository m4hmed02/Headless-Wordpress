import { useState } from "react";
import { InfoField, EditField } from "./ProfileHelpers";

export default function ProfileAccountTab({ profile }) {
  const [editing, setEditing] = useState(false);

  const firstName = profile?.data?.first_name || profile?.first_name || "—";
  const lastName  = profile?.data?.last_name  || profile?.last_name  || "—";
  const email     = profile?.data?.email       || profile?.email       || "—";
  const username  = profile?.data?.username    || profile?.username    || "—";

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Account Details</h2>
        <button
          onClick={() => setEditing(!editing)}
          className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          {editing ? "Cancel" : "Edit"}
        </button>
      </div>

      {!editing ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <InfoField label="First Name" value={firstName} />
          <InfoField label="Last Name"  value={lastName}  />
          <InfoField label="Username"   value={username}  />
          <InfoField label="Email Address" value={email}  />
        </div>
      ) : (
        <form className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <EditField label="First Name"    defaultValue={firstName} />
          <EditField label="Last Name"     defaultValue={lastName}  />
          <EditField label="Username"      defaultValue={username}  disabled />
          <EditField label="Email Address" defaultValue={email} type="email" />
          <div className="sm:col-span-2 flex justify-end pt-2">
            <button
              type="button"
              className="px-6 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition-colors"
            >
              Save Changes
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
