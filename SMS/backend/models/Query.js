import mongoose from 'mongoose';

const querySchema = new mongoose.Schema(
  {
    queryNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      default: 'General',
    },
    source: {
      type: String,
      default: 'Client portal',
    },
    priority: {
      type: String,
      enum: ['Low', 'Medium', 'High', 'Urgent'],
      default: 'Medium',
    },
    status: {
      type: String,
      enum: ['New', 'Review', 'Approved', 'Rejected', 'Converted', 'Closed'],
      default: 'New',
    },
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    projectManagerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    consultantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    notes: [
      {
        type: String,
      },
    ],
    attachments: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

const Query = mongoose.model('Query', querySchema);

export default Query;
