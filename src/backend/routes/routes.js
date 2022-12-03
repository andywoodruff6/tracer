import express from "express";
import cardanoPrice from "../models/cardanoPriceModel.js";
const router = express.Router();

// TODO - make this route only callable from the website
router.get("/", async (req, res) => {
  try {
    const cPrice = await cardanoPrice.find();
    res.json(cPrice);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.post("/", async (req, res) => {
  // const cPrice =
});

export default router;
