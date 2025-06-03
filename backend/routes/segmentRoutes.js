import {
  previewSegment,
  createSegment,
} from "../controllers/segmentController.js";
import express from "express";

const router = express.Router();

router.post("/segments/preview", previewSegment); // preview audience size
router.post("/segments", createSegment); // save new segment

export default router;
