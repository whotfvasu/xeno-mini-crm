import redis from "../config/redis.js";
import Order from "../models/Order.js";
import connectDB from "../config/db.js"; 
import dotenv from "dotenv";

dotenv.config();

connectDB();

const processOrders = async () => {
  try {
    while (true) {
      const messages = await redis.xread(
        "BLOCK",
        0,
        "STREAMS",
        "orders_stream",
        "$"
      );
      if (messages) {
        const [stream, entries] = messages[0];
        for (const [id, data] of entries) {
          const orderData = JSON.parse(data[1]);
          const { customerId, orderAmount, items } = orderData;
          await Order.create({ customer: customerId, orderAmount, items });
          console.log(`Processed order ID: ${id}`);
        }
      }
    }
  } catch (error) {
    console.error("Error in processing orders", error);
  }
};

processOrders();
