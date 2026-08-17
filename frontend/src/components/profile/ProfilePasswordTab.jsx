import { EditField } from "./ProfileHelpers";

// TODO: Wire up to a change-password API endpoint
export default function ProfilePasswordTab() {
  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-6">Change Password</h2>
      <form className="max-w-md space-y-4">
        <EditField label="Current Password"      type="password" placeholder="••••••••" />
        <EditField label="New Password"          type="password" placeholder="••••••••" />
        <EditField label="Confirm New Password"  type="password" placeholder="••••••••" />
        <button
          type="button"
          className="w-full py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition-colors mt-2"
        >
          Update Password
        </button>
      </form>
    </div>
  );
}
