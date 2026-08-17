import { useEffect, useState } from "react";
import getCustomer from "../apis/Customers/getCustomer";

import ProfileSidebar from "../components/profile/ProfileSidebar";
import ProfileSkeleton from "../components/profile/ProfileSkeleton";
import ProfileAccountTab from "../components/profile/ProfileAccountTab";
import ProfileOrdersTab from "../components/profile/ProfileOrdersTab";
import ProfileAddressesTab from "../components/profile/ProfileAddressesTab";
import ProfileWishlistTab from "../components/profile/ProfileWishlistTab";
import ProfilePasswordTab from "../components/profile/ProfilePasswordTab";

export default function Profile() {
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState(null);
  const [activeTab, setActiveTab] = useState("account");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        setLoading(true);
        const response = await getCustomer();
        setProfileData(response);
      } catch (error) {
        console.error("Error fetching customer", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCustomer();
  }, []);

  const firstName = profileData?.data?.first_name || profileData?.first_name || "User";
  const lastName = profileData?.data?.last_name || profileData?.last_name || "";
  const email = profileData?.data?.email || profileData?.email || "";
  const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase() || "U";

  const renderContent = () => {
    if (loading) return <ProfileSkeleton />;
    switch (activeTab) {
      case "account": return <ProfileAccountTab profile={profileData} />;
      case "orders": return <ProfileOrdersTab />;
      case "addresses": return <ProfileAddressesTab profile={profileData} />;
      case "wishlist": return <ProfileWishlistTab />;
      case "password": return <ProfilePasswordTab />;
      default: return null;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">My Profile</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        <ProfileSidebar
          loading={loading}
          initials={initials}
          firstName={firstName}
          lastName={lastName}
          email={email}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
        />

        <main className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 lg:p-8 min-h-[420px]">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
