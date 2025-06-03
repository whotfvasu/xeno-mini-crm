import Order from "../models/Order.js";
import Customer from "../models/Customer.js";
import redis from "../config/redis.js";

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
    const orderData = {
      customerId,
      orderAmount,
      items,
    };
    await redis.xadd("orders_stream", "*", "data", JSON.stringify(orderData));

    res.status(202).json({ message: "Order published for processing" });
  } catch (error) {
    console.error("Order Creation Error", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
