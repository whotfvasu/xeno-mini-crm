import { createCustomer } from "../controllers/customerController.js";
import express from "express";

const router = express.Router();

router.post("/customers", createCustomer);

export default router;
