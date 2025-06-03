import { createOrder } from "../controllers/orderController.js";
import express from "express";

const router = express.Router();

router.post("/orders", createOrder);

export default router;
