import express from "express";
import { getAllFish, createFish, updateFish, deleteFish } from '../controllers/fishController.js';

const router = express.Router();

// Route to get all fish entries
router.get("/", getAllFish);

// Route to add a new fish entry
router.post("/", createFish);

// Route to update an existing fish entry by ID
router.put("/:id", updateFish);

// Route to delete a fish entry by ID
router.delete("/:id", deleteFish);

export default router;

