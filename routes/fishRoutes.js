const express = require("express");
const {
  getAllFish,
  createFish,
  updateFish,
  deleteFish
} = require('../controllers/fishController');

const router = express.Router();

// Route to get all fish entries
router.get("/", getAllFish);

// Route to add a new fish entry
router.post("/", createFish);

// Route to update an existing fish entry by ID
router.put("/:id", updateFish);

// Route to delete a fish entry by ID
router.delete("/:id", deleteFish);

module.exports = router;
