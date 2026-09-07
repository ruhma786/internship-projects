import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema(
  {
    conversationId: {
      type: String,
      required: true,
      trim: true,
    },
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    senderRole: {
      type: String,
      enum: ['admin', 'client', 'projectManager', 'consultant'],
      required: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    receiverRole: {
      type: String,
      enum: ['admin', 'client', 'projectManager', 'consultant'],
      default: null,
    },
    text: {
      type: String,
      required: true,
      trim: true,
    },
    relatedType: {
      type: String,
      enum: ['ticket', 'query', 'general'],
      default: 'general',
    },
    relatedId: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: 'relatedTypeRef',
      default: null,
    },
    relatedTypeRef: {
      type: String,
      enum: ['Ticket', 'Query'],
      default: null,
    },
    isSystem: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Message = mongoose.model('Message', messageSchema);

export default Message;
