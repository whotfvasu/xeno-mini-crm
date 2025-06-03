import {
  previewSegment,
  createSegment,
  getSegments,
} from "../controllers/segmentController.js";
import express from "express";

const router = express.Router();

router.post("/segments/preview", previewSegment); // preview audience size
router.post("/segments", createSegment); // save new segment
router.get("/segments", getSegments);
export default router;
