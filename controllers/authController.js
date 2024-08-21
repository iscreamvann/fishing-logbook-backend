import bcrypt from 'bcryptjs';
import jwt from'jsonwebtoken';
// import getUserDb from "../domains/auth"
// const User = require('../models/user'); // Assuming you have a User model defined
import dotenv from 'dotenv';

import dbClient from "../utils/dbClient.js"

dotenv.config(); // Load environment variables

export const register = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  // Validate input
  if (!email || !password || !firstName || !lastName) {
    return res.status(400).json({ error: "Missing fields in request body" });
  }

  try {
    const user = await dbClient.user.create({
      data: {
        email,
        password: await bcrypt.hash(password, 8),
        profile: {
          create: {
            firstName,
            lastName,
          }
        }
      },
      include: {
        profile: true
      }
    })

    const token = jwt.sign(
      { id: user.id, email: user.email, firstName: user.profile.firstName, lastName: user.profile.lastName },
      process.env.JWT_SECRET,
      // { expiresIn: '1h' }
    );

    return res.status(200).json({ message: "User registered", token, user: { id: user.id, email: user.email, firstName: user.profile.firstName, lastName: user.profile.lastName }});
  }
  catch (e) {
    console.log(e)
    res.status(500).json({ error: e.message });
  }
}

export const login = async (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return res.status(400).json({ error: "Missing fields in request body" });
  }

  try {
    // Find the user by username
    // const user = {password: ""};
    
    const user = await dbClient.user.findUnique({
      where:{
          email: email
      },
      include: {
        profile:true
      }
  });
    
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }


    // Check if the password is correct
    // const isPasswordValid = await bcrypt.compare(password, user.password);
    const isPasswordValid = await bcrypt.compareSync(password, user.password)


    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email, firstName: user.profile.firstName, lastName: user.profile.lastName },
      process.env.JWT_SECRET,
      // { expiresIn: '1h' }
    );

    // const decoded = jwt.decode(
    //   n,
    //   process.env.JWT_SECRET
    // );
    // console.log("token", decoded)

    // Respond with the token
    return res.status(200).json({ message: "Logged in", token, user: { id: user.id, email: user.email, firstName: user.profile.firstName, lastName: user.profile.lastName }});
  } catch (e) {
    console.error(e)
    res.status(500).json({ error: e.message });
  }
};

