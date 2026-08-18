import axios from "axios";

const getCustomer = async (customerID) => {
    const response = await axios.get(
        `${import.meta.env.VITE_SERVER_API_URL}/api/customers/${customerID}`,
        { withCredentials: true }
    );

    const data = response.data;
    return data;
}

export default getCustomer;