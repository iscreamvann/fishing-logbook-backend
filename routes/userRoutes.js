// userRoutes.js
import express from 'express';
import { registerUser, loginUser, getUser, updateUser, deleteUser } from '../controllers/userController.js';

const router = express.Router();

// Route to register a new user
router.post('/register', registerUser);

// Route to login an existing user
router.post('/login', loginUser);

// Route to get user details by ID
router.get('/:id', getUser);

// Route to update user details by ID
router.put('/:id', updateUser);

// Route to delete a user by ID
router.delete('/:id', deleteUser);

export default router;
