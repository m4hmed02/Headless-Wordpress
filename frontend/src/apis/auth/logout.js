const logoutCustomer = async () => {
    // Clear the customer ID from local storage to log the user out on the frontend
    localStorage.removeItem("customerId");

    // Optional: If you add a backend logout endpoint in the future to destroy the session cookie, 
    // you can uncomment and use the following code:
    /*
    try {
        await axios.post(
            `${import.meta.env.VITE_SERVER_API_URL}/api/auth/logout`,
            {},
            { withCredentials: true }
        );
    } catch (error) {
        console.error("Error during backend logout", error);
    }
    */

    return { success: true, message: "Logged out successfully" };
};

export default logoutCustomer;
