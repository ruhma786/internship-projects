import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Client from '../models/Client.js';
import ProjectManager from '../models/ProjectManager.js';
import Consultant from '../models/Consultant.js';
import User from '../models/User.js';

const router = express.Router();
const GMAIL_REGEX = /^[A-Za-z0-9]+(?:[._-]?[A-Za-z0-9]+)*@gmail\.com$/i;

const isValidEmail = (email = '') => GMAIL_REGEX.test(String(email).trim());

const generateToken = (user) =>
  jwt.sign(
    {
      id: user._id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET || 'sms-secret-key',
    { expiresIn: '7d' }
  );

router.post('/register', async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      phone = '',
      company = '',
    } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email and password are required.' });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ message: 'Email must be a valid Gmail address ending with @gmail.com' });
    }

    const lowerEmail = email.toLowerCase();
    
    // Check if email already exists in any role collection
    const existingClient = await Client.findOne({ email: lowerEmail });
    const existingPM = await ProjectManager.findOne({ email: lowerEmail });
    const existingConsultant = await Consultant.findOne({ email: lowerEmail });
    const existingAdmin = await User.findOne({ email: lowerEmail });
    
    if (existingClient || existingPM || existingConsultant || existingAdmin) {
      return res.status(409).json({ message: 'User already exists with this email.' });
    }


    const hashedPassword = await bcrypt.hash(password, 10);

    const client = await Client.create({
      name,
      email: lowerEmail,
      password: hashedPassword,
      phone,
      company,
      role: 'client',
      status: 'Active',
      isVerified: false,
    });

    res.status(201).json({
      message: 'Client registered successfully',
      token: generateToken(client),
      user: {
        id: client._id,
        name: client.name,
        email: client.email,
        role: client.role,
        company: client.company,
        phone: client.phone,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Registration failed', error: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ message: 'Email must be a valid Gmail address ending with @gmail.com' });
    }

    const lowerEmail = email.toLowerCase();
    
    // Check all user models in order
    let user = await Client.findOne({ email: lowerEmail });
    let userModel = 'client';
    
    if (!user) {
      user = await ProjectManager.findOne({ email: lowerEmail });
      userModel = 'projectManager';
    }
    
    if (!user) {
      user = await Consultant.findOne({ email: lowerEmail });
      userModel = 'consultant';
    }
    
    if (!user) {
      user = await User.findOne({ email: lowerEmail });
      userModel = 'admin';
    }
    
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    user.lastLogin = new Date();
    await user.save();

    res.json({
      message: 'Login successful',
      token: generateToken(user),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        company: user.company,
        phone: user.phone,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Login failed', error: error.message });
  }
});

router.get('/me', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'No token provided.' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'sms-secret-key');
    
    // Check all models
    let user = await Client.findById(decoded.id).select('-password');
    if (!user) {
      user = await ProjectManager.findById(decoded.id).select('-password');
    }
    if (!user) {
      user = await Consultant.findById(decoded.id).select('-password');
    }
    if (!user) {
      user = await User.findById(decoded.id).select('-password');
    }

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.json(user);
  } catch (error) {
    res.status(401).json({ message: 'Invalid token', error: error.message });
  }
});

export default router;
