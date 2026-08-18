import axios from "axios";

const loginCustomer = async (username, password) => {
    const response = await axios.post(
        `${import.meta.env.VITE_SERVER_API_URL}/api/auth/login`,
        {
            username,
            password
        },
        {
            withCredentials: true
        }
    );

    if (response.data && response.data.success) {
        // Store the user ID in localStorage so the frontend knows who is logged in
        localStorage.setItem("customerId", response.data.customer.user_id);
    }

    return response.data;
}
export default loginCustomer