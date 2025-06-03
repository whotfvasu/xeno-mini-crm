// backend/index.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import customerRoutes from "./routes/customerRoutes.js";
import connectDB from "./config/db.js";

dotenv.config();
const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api", customerRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
