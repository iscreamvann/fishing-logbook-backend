const { Fish } = require('../models');

// Fetches all fish entries in the logbook
const getAllFish = async (req, res) => {
  try {
    const fishEntries = await Fish.findAll(); // Fetch all fish entries from the database
    return res.status(200).json({ fish: fishEntries });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

// Adds a new fish entry to the logbook
const createFish = async (req, res) => {
  const { breed, weight, dateAdded, location, catchBait } = req.body;
  
  try {
    const newFish = await Fish.create({ breed, weight, dateAdded, location, catchBait });
    return res.status(201).json({ fish: newFish });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

// Updates an existing fish entry by ID
const updateFish = async (req, res) => {
  const { id } = req.params;
  const { breed, weight, dateAdded, location, catchBait } = req.body;
  
  try {
    const fishToUpdate = await Fish.findByPk(id);
    if (!fishToUpdate) {
      return res.status(404).json({ error: "Fish not found" });
    }
    
    fishToUpdate.breed = breed;
    fishToUpdate.weight = weight;
    fishToUpdate.dateAdded = dateAdded;
    fishToUpdate.location = location;
    fishToUpdate.catchBait = catchBait;
    
    await fishToUpdate.save();
    
    return res.status(200).json({ fish: fishToUpdate });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

// Deletes a fish entry by ID
const deleteFish = async (req, res) => {
  const { id } = req.params;
  
  try {
    const fishToDelete = await Fish.findByPk(id);
    if (!fishToDelete) {
      return res.status(404).json({ error: "Fish not found" });
    }
    
    await fishToDelete.destroy();
    return res.status(200).json({ message: "Fish deleted successfully" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

module.exports = {
  getAllFish,
  createFish,
  updateFish,
  deleteFish,
};
