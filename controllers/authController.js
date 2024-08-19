import bcrypt from 'bcryptjs';
import jwt from'jsonwebtoken';
// const User = require('../models/user'); // Assuming you have a User model defined
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

export const login = async (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return res.status(400).json({ error: "Missing fields in request body" });
  }

  try {
    // Find the user by username
    const user = {password: ""};
    
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
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Respond with the token
    return res.status(200).json({ message: "Logged in", token });
  } catch (e) {
    console.error(e)
    res.status(500).json({ error: e.message });
  }
};

