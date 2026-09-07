import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const consultantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      default: '',
    },
    joined: {
      type: String,
      default: '',
    },
    role: {
      type: String,
      default: 'consultant',
      enum: ['consultant'],
    },
    experience: {
      type: String,
      default: 'Not specified',
    },
    expertise: {
      type: String,
      default: 'Frontend',
    },
    manager: {
      type: String,
      default: 'Unassigned',
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    
    status: {
      type: String,
      enum: ['Active', 'Inactive'],
      default: 'Active',
    },
    notes: {
      type: Array,
      default: [],
    },
    
    tags: {
      type: [String],
      default: [],
    },
    skills: {
      type: [String],
      default: [],
    },
    
    openTickets: {
      type: Number,
      default: 0,
    },
    inProgress: {
      type: Number,
      default: 0,
    },
    pending: {
      type: Number,
      default: 0,
    },
    resolved: {
      type: Number,
      default: 0,
    },
    workload: {
      type: Number,
      default: 0,
    },
    lastActivity: {
      type: String,
      default: 'Just now',
    },
    activityLabel: {
      type: String,
      default: 'Account created',
    },
    
    specialization: {
      type: String,
      default: 'Consultant',
    },
    lastLogin: {
      type: Date,
      default: null,
    },
    recentTickets: {
      type: Array,
      default: [],
    },
    activities: {
      type: Array,
      default: [],
    },
    
    metadata: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
  },
  { timestamps: true }
);

const Consultant = mongoose.model('Consultant', consultantSchema);

export default Consultant;
