import Segment from "../models/Segment.js";
import Customer from "../models/Customer.js";

export const previewSegment = async (req, res) => {
  try {
    const { rules } = req.body;

    if (!rules || rules.length === 0) {
      return res.status(400).json({ message: "Rules are required" });
    }
    const fieldMapping = {
      spend: "totalSpend",
      visits: "visitCount",
    };

    const query = {};
    rules.forEach((rule) => {
        const { field, operator, value } = rule;
        const dbField = fieldMapping[field] || field;
      if (operator === ">") query[dbField] = { $gt: value };
      if (operator === "<") query[dbField] = { $lt: value };
      if (operator === "=") query[dbField] = value;
    });
    console.log("Generated Query:", query);
    const audienceSize = await Customer.countDocuments(query);

    res.status(200).json({ audienceSize });
  } catch (error) {
    console.error("Error in previewSegment:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createSegment = async (req, res) => {
  try {
    const { name, rules, audienceSize } = req.body;
    if (!name || !rules || rules.length === 0 || !audienceSize) {
      return res.status(400).json({ message: "All fields required" });
    }
    const segment = await Segment.create({ name, rules, audienceSize });
    res.status(201).json({ message: "Segment created successfully", segment });
  } catch (error) {
    console.error("Create Segment Error ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getSegments = async (req, res) => {
  try {
    const segments = await Segment.find().sort({ createdAt: -1 }); // Sort by most recent
    res.status(200).json(segments);
  } catch (error) {
    console.error("Error fetching segments:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};