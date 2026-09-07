import express from 'express';
import bcrypt from 'bcryptjs';
import Client from '../models/Client.js';
import ProjectManager from '../models/ProjectManager.js';
import Consultant from '../models/Consultant.js';
import User from '../models/User.js';

const router = express.Router();

const gmailPattern = /^[A-Za-z0-9]+(?:[._-]?[A-Za-z0-9]+)*@gmail\.com$/i;

// Get users by role
router.get('/', async (req, res) => {
  try {
    const { role } = req.query;
    let users = [];

    if (role === 'client') {
      users = await Client.find().select('-password').sort({ createdAt: -1 });
    } else if (role === 'projectManager') {
      users = await ProjectManager.find().select('-password').sort({ createdAt: -1 });
    } else if (role === 'consultant') {
      users = await Consultant.find().select('-password').sort({ createdAt: -1 });
    } else if (role === 'admin') {
      users = await User.find().select('-password').sort({ createdAt: -1 });
    } else {
      // Return all users from all models if no role specified
      const clients = await Client.find().select('-password').sort({ createdAt: -1 });
      const pms = await ProjectManager.find().select('-password').sort({ createdAt: -1 });
      const consultants = await Consultant.find().select('-password').sort({ createdAt: -1 });
      const admins = await User.find().select('-password').sort({ createdAt: -1 });
      
      users = [...clients, ...pms, ...consultants, ...admins];
    }

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get users', error: error.message });
  }
});

// Get user by ID
router.get('/:id', async (req, res) => {
  try {
    let user = await Client.findById(req.params.id).select('-password');
    if (!user) {
      user = await ProjectManager.findById(req.params.id).select('-password');
    }
    if (!user) {
      user = await Consultant.findById(req.params.id).select('-password');
    }
    if (!user) {
      user = await User.findById(req.params.id).select('-password');
    }

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get user', error: error.message });
  }
});

// Create user (admin can create any role)
router.post('/', async (req, res) => {
  try {
    const { password, email, role = 'client', name, ...rest } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({ message: 'Email, name and password are required.' });
    }

    const lowerEmail = String(email).trim().toLowerCase();

    if (!gmailPattern.test(lowerEmail)) {
      return res.status(400).json({ message: 'Email must be a valid Gmail address ending with @gmail.com' });
    }

    // Check if email already exists in any model
    const existing = await Client.findOne({ email: lowerEmail }) ||
                    await ProjectManager.findOne({ email: lowerEmail }) ||
                    await Consultant.findOne({ email: lowerEmail }) ||
                    await User.findOne({ email: lowerEmail });
    
    if (existing) {
      return res.status(409).json({ message: 'User already exists with this email.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    let user;

    if (role === 'projectManager') {
      user = await ProjectManager.create({
        ...rest,
        name,
        email: lowerEmail,
        password: hashedPassword,
        role: 'projectManager',
        status: 'Active',
        isVerified: true,
      });
    } else if (role === 'client') {
      user = await Client.create({
        ...rest,
        name,
        email: lowerEmail,
        password: hashedPassword,
        role: 'client',
        status: 'Active',
        isVerified: false,
      });
    } else if (role === 'consultant') {
      user = await Consultant.create({
        ...rest,
        name,
        email: lowerEmail,
        password: hashedPassword,
        role: 'consultant',
        status: 'Active',
      });
    } else if (role === 'admin') {
      user = await User.create({
        ...rest,
        name,
        email: lowerEmail,
        password: hashedPassword,
        role: 'admin',
        status: 'Active',
        isVerified: true,
      });
    }

    const safeUser = user.toObject();
    delete safeUser.password;

    res.status(201).json(safeUser);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create user', error: error.message });
  }
});

// Update user
router.put('/:id', async (req, res) => {
  try {
    let user = await Client.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!user) {
      user = await ProjectManager.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    }
    if (!user) {
      user = await Consultant.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    }
    if (!user) {
      user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    }

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: 'Failed to update user', error: error.message });
  }
});

// Delete user
router.delete('/:id', async (req, res) => {
  try {
    let user = await Client.findByIdAndDelete(req.params.id);
    if (!user) {
      user = await ProjectManager.findByIdAndDelete(req.params.id);
    }
    if (!user) {
      user = await Consultant.findByIdAndDelete(req.params.id);
    }
    if (!user) {
      user = await User.findByIdAndDelete(req.params.id);
    }

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete user', error: error.message });
  }
});

export default router;
