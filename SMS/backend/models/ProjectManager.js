import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const projectManagerSchema = new mongoose.Schema(
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
    location: {
      type: String,
      default: '',
    },
    company: {
      type: String,
      default: '',
    },
    department: {
      type: String,
      default: '',
    },
    designation: {
      type: String,
      default: 'Project Manager',
    },
    experience: {
      type: String,
      default: '',
    },
    role: {
      type: String,
      default: 'projectManager',
      enum: ['projectManager'],
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    status: {
      type: String,
      enum: ['Active', 'Inactive', 'Pending'],
      default: 'Active',
    },
     bio: {
      type: String,
      default: '',
    },
    isVerified: {
      type: Boolean,
      default: true,
    },
    clients: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client',
      },
    ],
    consultants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Consultant',
      },
    ],
    tickets: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ticket',
      },
    ],
    queries: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Query',
      },
    ],
    workload: {
      type: Number,
      default: 0,
    },
    metrics: {
      projects: {
        type: Number,
        default: 0,
      },
      activeProjects: {
        type: Number,
        default: 0,
      },
      tickets: {
        type: Number,
        default: 0,
      },
      openTickets: {
        type: Number,
        default: 0,
      },
      resolvedTickets: {
        type: Number,
        default: 0,
      },
    },
    lastLogin: {
      type: Date,
      default: null,
    },
    metadata: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
  },
  { timestamps: true }
);

const ProjectManager = mongoose.model('ProjectManager', projectManagerSchema);

export default ProjectManager;
