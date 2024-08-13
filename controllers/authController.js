const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user'); // Assuming you have a User model defined
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables

const login = async (req, res) => {
  const { username, password } = req.body;

  // Validate input
  if (!username || !password) {
    return res.status(400).json({ error: "Missing fields in request body" });
  }

  try {
    // Find the user by username
    const user = await User.findOne({ where: { username } });
    
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Respond with the token
    return res.status(200).json({ message: "Logged in", token });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

module.exports = {
  login
};
