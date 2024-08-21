import express from "express";
import { getAllFish, createFish, getLeaders, deleteFish } from '../controllers/fishController.js';

const router = express.Router();

// Route to get all fish entries
router.get("/", getAllFish);

// Route to add a new fish entry
router.post("/", createFish);

// Route to update an existing fish entry by ID
router.get("/leaderboard", getLeaders);

// Route to delete a fish entry by ID
router.delete("/:id", deleteFish);

export default router;

