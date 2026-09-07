import express from 'express';
import bcrypt from 'bcryptjs';
import Consultant from '../models/Consultant.js';

const router = express.Router();

// Get all consultants
router.get('/', async (req, res) => {
  try {
    const consultants = await Consultant.find().select('-password').sort({ createdAt: -1 });
    res.json(consultants);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch consultants', error: error.message });
  }
});

// Get consultant by ID
router.get('/:id', async (req, res) => {
  try {
    const consultant = await Consultant.findById(req.params.id).select('-password');

    if (!consultant) {
      return res.status(404).json({ message: 'Consultant not found' });
    }

    res.json(consultant);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch consultant', error: error.message });
  }
});

// Create consultant
router.post('/', async (req, res) => {
  try {
    const { name, email, password, ...rest } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email and password are required.' });
    }

    const lowerEmail = String(email).trim().toLowerCase();
    const gmailPattern = /^[A-Za-z0-9]+(?:[._-]?[A-Za-z0-9]+)*@gmail\.com$/i;

    if (!gmailPattern.test(lowerEmail)) {
      return res.status(400).json({ message: 'Email must be a valid Gmail address ending with @gmail.com' });
    }

    const existing = await Consultant.findOne({ email: lowerEmail });
    if (existing) {
      return res.status(409).json({ message: 'Consultant already exists with this email.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newConsultant = await Consultant.create({
      ...rest,
      name,
      email: lowerEmail,
      password: hashedPassword,
      role: 'consultant',
      status: 'Active',
    });

    const safeConsultant = newConsultant.toObject();
    delete safeConsultant.password;

    res.status(201).json(safeConsultant);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create consultant', error: error.message });
  }
});

// Update consultant
router.put('/:id', async (req, res) => {
  try {
    const { password, ...updateData } = req.body;
    
    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    const updatedConsultant = await Consultant.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).select('-password');

    if (!updatedConsultant) {
      return res.status(404).json({ message: 'Consultant not found' });
    }

    res.json(updatedConsultant);
  } catch (error) {
    res.status(400).json({ message: 'Failed to update consultant', error: error.message });
  }
});

// Delete consultant
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Consultant.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: 'Consultant not found' });
    }

    res.json({ message: 'Consultant deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete consultant', error: error.message });
  }
});

export default router;
