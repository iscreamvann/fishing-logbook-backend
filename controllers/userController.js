import dbClient from '../dbClient.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Secret key for JWT (store in env variable in production)
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Registers a new user
export const registerUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await dbClient.user.findUnique({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = await dbClient.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    });

    return res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

// Logs in an existing user
export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the user by username
    const user = await dbClient.user.findUnique({ where: { username } });
    if (!user) {
      return res.status(400).json({ error: 'Invalid username or password' });
    }

    // Compare the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Invalid username or password' });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });

    return res.status(200).json({ message: 'Login successful', token });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

// Gets user details by ID
export const getUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await dbClient.user.findUnique({ where: { id: parseInt(id, 10) } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.status(200).json({ user });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

// Updates user details
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, password } = req.body;

  try {
    // Fetch user to update
    const userToUpdate = await dbClient.user.findUnique({ where: { id: parseInt(id, 10) } });
    if (!userToUpdate) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update user details
    const updatedUser = await dbClient.user.update({
      where: { id: parseInt(id, 10) },
      data: {
        username: username || userToUpdate.username,
        password: password ? await bcrypt.hash(password, 10) : userToUpdate.password,
      },
    });

    return res.status(200).json({ message: 'User updated successfully', user: updatedUser });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

// Deletes a user by ID
export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    // Fetch user to delete
    const userToDelete = await dbClient.user.findUnique({ where: { id: parseInt(id, 10) } });
    if (!userToDelete) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Delete user
    await dbClient.user.delete({ where: { id: parseInt(id, 10) } });
    return res.status(200).json({ message: 'User deleted successfully' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
