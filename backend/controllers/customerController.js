import Customer from "../models/Customer.js";

export const createCustomer = async (req, res) => {
  try {
    const { name, email, phone, totalSpend, visitCount, lastVisited } =
      req.body;
    if (!name || !email) {
      return res.status(400).json({ message: "Name and Email are required" });
    }
    const existing = await Customer.findOne({ email });
    if (existing) {
      return res
        .status(409)
        .json({ message: "Customer with this email address already exists" });
    }
    const customer = await Customer.create({
      name,
      email,
      phone,
      totalSpend,
      visitCount,
      lastVisited,
    });
    res
      .status(201)
      .json({ message: "customer created successfully", customer });
  } catch (error) {
    console.error("Error in create customer", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
