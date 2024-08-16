// Fetches all fish entries in the logbook
export const getAllFish = async (req, res) => {
    try {
      const fishEntries = []; // Fetch all fish entries from the database
      return res.status(200).json({ fish: fishEntries });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  };
  
  // Adds a new fish entry to the logbook
  export const createFish = async (req, res) => {
    const { breed, weight, dateAdded, location, catchBait } = req.body;
  
    try {
      // const newFish = {};
      const newFish = await dbClient.fish.create({
        data: {
          breed: breed,
          weight: weight,
          dateAdded: dateAdded,
          location: location,
          catchBait: catchBait,
        },
      });
  
      return res.status(201).json({ fish: newFish });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  };
  
  // Updates an existing fish entry by ID
  export const updateFish = async (req, res) => {
    const { id } = req.params;
    const { breed, weight, dateAdded, location, catchBait } = req.body;
  
    try {
      const fishToUpdate = {}; // Fetch fish entry by id
      if (!fishToUpdate) {
        return res.status(404).json({ error: "Fish not found" });
      }
  
      fishToUpdate.breed = breed;
      fishToUpdate.weight = weight;
      fishToUpdate.dateAdded = dateAdded;
      fishToUpdate.location = location;
      fishToUpdate.catchBait = catchBait;
  
      // await fishToUpdate.save();
  
      return res.status(200).json({ fish: fishToUpdate });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  };
  
  // Deletes a fish entry by ID
  export const deleteFish = async (req, res) => {
    const { id } = req.params;
  
    try {
      const fishToDelete = {}; // Fetch fish entry by id
      if (!fishToDelete) {
        return res.status(404).json({ error: "Fish not found" });
      }
  
      // await fishToDelete.destroy();
      return res.status(200).json({ message: "Fish deleted successfully" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  };
  