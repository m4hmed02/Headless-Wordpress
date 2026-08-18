import axios from "axios";

const logoutCustomer = async () => {

    localStorage.removeItem("customerId")

    try {
        await axios.post(
            `${import.meta.env.VITE_SERVER_API_URL}/api/auth/logout`,
            {},
            { withCredentials: true }
        );
    } catch (error) {
        console.error("Error during backend logout", error);
    }

    return { success: true, message: "Logged out successfully" };
};

export default logoutCustomer;
