import bcrypt from 'bcryptjs';
import jwt from'jsonwebtoken';
import { Prisma } from '@prisma/client';
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
  catch (error) {
    console.log(error)

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        console.log('A user with this email already exists.');
        res.status(500).json({ error: 'A user with this email already exists.' });
      }
    }
    else{
      res.status(500).json({ error: error.message });
    }
  }
}

export const login = async (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return res.status(400).json({ error: "Missing fields in request body" });
  }

  try {
    
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
    const isPasswordValid = await bcrypt.compareSync(password, user.password)


    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email, firstName: user.profile.firstName, lastName: user.profile.lastName },
      process.env.JWT_SECRET,
    );

    // Respond with the token
    return res.status(200).json({ message: "Logged in", token, user: { id: user.id, email: user.email, firstName: user.profile.firstName, lastName: user.profile.lastName }});
  } catch (e) {
    console.error(e)
    res.status(500).json({ error: e.message });
  }
};

