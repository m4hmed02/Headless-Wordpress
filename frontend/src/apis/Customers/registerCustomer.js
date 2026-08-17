import axios from "axios";

const registerCustomer = async (customerData) => {
    const response = await axios.post(
        `${import.meta.env.VITE_SERVER_API_URL}/api/customers/register`,
        customerData
    );

    const data = response.data;
    return data;
}

export default registerCustomer;