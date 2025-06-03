import Order from "../models/Order.js";
import Customer from "../models/Customer.js";

export const createOrder = async (req, res) => {
  try {
    const { customerId, orderAmount, items } = req.body;
    if (!customerId || !orderAmount || !items || items.length === 0) {
      return res.status(400).json({ message: "All fields req." });
    }

    const customer = await Customer.findById(customerId);

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    const order = await Order.create({
      customer: customerId,
      orderAmount,
      items,
    });

    res.status(201).json({ message: "Order created successfully", order });
  } catch (error) {
    console.error("Order Creation Error", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
