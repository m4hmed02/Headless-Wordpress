import { useEffect, useState } from "react";
import getCustomer from "../apis/Customers/getCustomer";
import logoutCustomer from "../apis/auth/logout";

import ProfileSidebar from "../components/profile/ProfileSidebar";
import ProfileSkeleton from "../components/profile/ProfileSkeleton";
import ProfileAccountTab from "../components/profile/ProfileAccountTab";
import ProfileOrdersTab from "../components/profile/ProfileOrdersTab";
import ProfileAddressesTab from "../components/profile/ProfileAddressesTab";
import ProfileWishlistTab from "../components/profile/ProfileWishlistTab";
import ProfilePasswordTab from "../components/profile/ProfilePasswordTab";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";

export default function Profile() {
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [activeTab, setActiveTab] = useState("account");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const fetchCustomer = async () => {
    try {
      setLoading(true);
      const customerId = localStorage.getItem("customerId");
      
      if (!customerId) {
        throw new Error("No customer ID found in localStorage");
      }

      const response = await getCustomer(customerId);
      // The backend returns { success: true, customer: { ... } }
      // We extract the customer object so the UI components can read it correctly
      setProfileData(response.customer || response.data || response);
      setIsAuthenticated(true);
    } catch (error) {
      // 401 = not logged in, any other error is also treated as unauthenticated
      setIsAuthenticated(false);
      setProfileData(null);
      console.error("Error fetching customer", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomer();
  }, []);

  // Called by LoginPage after a successful login
  const handleLoginSuccess = () => {
    fetchCustomer();
  };

  // Still checking auth status
  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">My Profile</h1>
        <div className="flex flex-col lg:flex-row gap-8">
          <ProfileSkeleton />
        </div>
      </div>
    );
  }

  const handleLogout = async () => {
    setIsLoggingOut(true);
    // Slight delay to make the spinner transition feel smoother
    await new Promise(r => setTimeout(r, 600));
    await logoutCustomer();
    setIsAuthenticated(false);
    setProfileData(null);
    setIsLoggingOut(false);
  };

  const firstName = profileData?.data?.first_name || profileData?.first_name || (isAuthenticated ? "User" : "Guest");
  const lastName = profileData?.data?.last_name || profileData?.last_name || "";
  const email = profileData?.data?.email || profileData?.email || (isAuthenticated ? "" : "Not logged in");
  const initials = isAuthenticated
    ? (`${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase() || "U")
    : "G";

  const publicTabs = ["orders"]; // Tabs that don't require login

  const renderContent = () => {
    // If not logged in and trying to access a protected tab, show login or register
    if (!isAuthenticated && !publicTabs.includes(activeTab)) {
      if (showRegister) {
        return (
          <RegisterPage 
            onLoginSuccess={handleLoginSuccess} 
            onSwitchToLogin={() => setShowRegister(false)} 
          />
        );
      } else {
        return (
          <LoginPage 
            onLoginSuccess={handleLoginSuccess} 
            onSwitchToRegister={() => setShowRegister(true)} 
          />
        );
      }
    }

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
          loading={false}
          initials={initials}
          firstName={firstName}
          lastName={lastName}
          email={email}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
          onLogout={handleLogout}
          isAuthenticated={isAuthenticated}
          isLoggingOut={isLoggingOut}
        />

        <main className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 lg:p-8 min-h-[420px]">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
