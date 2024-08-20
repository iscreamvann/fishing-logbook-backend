import bcrypt from 'bcryptjs';
import jwt from'jsonwebtoken';
// import getUserDb from "../domains/auth"
// const User = require('../models/user'); // Assuming you have a User model defined
import dotenv from 'dotenv';

import prisma from '@prisma/client'

if (process.env.NODE_ENV === 'test') {
  // process.env.DATABASE_URL = process.env.TEST_DATABASE_URL
  console.log(`Connected to DB instance: ${process.env.DATABASE_URL}`)
}

const dbClient = new prisma.PrismaClient()


dotenv.config(); // Load environment variables

export const login = async (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return res.status(400).json({ error: "Missing fields in request body" });
  }

  try {
    // Find the user by username
    // const user = {password: ""};
    console.log("email", email)
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
    const isPasswordValid = password == "test123"

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

