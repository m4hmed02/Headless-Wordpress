const { authenticateCustomer } = require("../services/Auth/auth");

const loginCustomer = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Username and password are required",
      });
    }

    const customer = await authenticateCustomer(username, password);

    req.session.customerId = customer.user_id;

    return res.status(200).json({
      success: true,
      message: "Login successful",
      customer,
    });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred during login",
      error: error.message,
    });
  }
};

const logoutCustomer = (req, res) => {

    req.session.destroy((error) => {

        if (error) {
            console.error("Error during logout:", error);

            return res.status(500).json({
                success: false,
                message: "Logout failed",
            });
        }

        res.clearCookie("connect.sid");

        return res.status(200).json({
            success: true,
            message: "Logout successful",
        });
    });
};


module.exports = {
    loginCustomer,
    logoutCustomer
};
