import dbClient from "../utils/dbClient.js"

import jwt from "jsonwebtoken"



const AllFishMock = [
  {
    name: "biggy mcbigfish", breed: "Carp", weight: 1.5, dateAdded: "2024-08-20T09:02:58Z", location: "Milton Keynes", catchBait: "Mealworm"
  },
  {
    name: "Smally mcmidget", breed: "Guppy", weight: 0.01, dateAdded: "2024-08-10T09:02:58Z", location: "Milton Keynes", catchBait: "Hands"
  }
]


// Fetches all fish entries in the logbook
export const getAllFish = async (req, res) => {

  const token = jwt.decode(
    req.headers.authorization.replace("Bearer ", ""),
    process.env.JWT_SECRET
  );
    try {
      const newFish = await dbClient.fish.findMany({
        where: {
          userId: token.id
        }
    })
      return res.status(200).json({ fish: newFish });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  };
  
  // Adds a new fish entry to the logbook
  export const createFish = async (req, res) => {
    const { name, breed, weight, location, catchBait } = req.body;

    const token = jwt.decode(
      req.headers.authorization.replace("Bearer ", ""),
      process.env.JWT_SECRET
    );
  
    try {
      const newFish = await dbClient.fish.create({
        data: {
          name: name,
          breed: breed,
          weight: weight,
          location: location,
          catchBait: catchBait,
          userId: token.id
        },
      });
  
      return res.status(201).json({ fish: newFish });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  };
  
  // Updates an existing fish entry by ID
  export const getLeaders = async (req, res) => {
    try {
      const usersWithFishCount = await dbClient.user.findMany({
        select: {
          id: true,
          profile: {
            select: {
              firstName: true,
              lastName: true,
            },
          },
          _count: {
            select: {
              fish: true,
            },
          },
        },
        orderBy: {
          fish: {
            _count: 'desc',
          },
        },
        take: 5,
      });
      return res.status(200).json({ leaders: usersWithFishCount });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  };
  
  // Deletes a fish entry by ID
  export const deleteFish = async (req, res) => {
    const { id } = req.params;
  
    try {
      const fishToDelete =  await dbClient.fish.delete({
        where:{
          id: parseInt(id)
        }
      }); // Fetch fish entry by id
      if (!fishToDelete) {
        return res.status(404).json({ error: "Fish not found" });
      }
  
      return res.status(200).json({ message: "Fish deleted successfully" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  };
  