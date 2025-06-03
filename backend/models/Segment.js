import mongoose from "mongoose";

const segmentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    rules: { type: Array, required: true },
    audienceSize: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

const Segment = mongoose.model("Segment", segmentSchema)

export default Segment
