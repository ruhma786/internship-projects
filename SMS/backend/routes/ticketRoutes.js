import express from 'express';
import Notification from '../models/Notification.js';
import Ticket from '../models/Ticket.js';

const router = express.Router();

const createTicketNotification = async ({ userId, title, message, type = 'ticket', relatedId }) => {
  if (!userId) return null;

  return Notification.create({
    userId,
    title,
    message,
    type,
    relatedType: 'ticket',
    relatedId,
    isRead: false,
  });
};

router.get('/', async (req, res) => {
  try {
    const tickets = await Ticket.find().sort({ createdAt: -1 }).populate('clientId', 'name email company').populate('projectManagerId', 'name email').populate('consultantId', 'name email');
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch tickets', error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id).populate('clientId', 'name email company').populate('projectManagerId', 'name email').populate('consultantId', 'name email');
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }
    res.json(ticket);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch ticket', error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const ticket = await Ticket.create(req.body);
    if (ticket.clientId) {
      await createTicketNotification({
        userId: ticket.clientId,
        title: 'Ticket created',
        message: `Your ticket ${ticket.ticketNumber || ticket.title} has been submitted successfully.`,
        relatedId: ticket._id,
      });
    }
    res.status(201).json(ticket);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create ticket', error: error.message });
  }
});

router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const ticket = await Ticket.findByIdAndUpdate(req.params.id, { status }, { new: true, runValidators: true });

    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    if (ticket.clientId) {
      await createTicketNotification({
        userId: ticket.clientId,
        title: 'Ticket status updated',
        message: `Ticket ${ticket.ticketNumber} is now marked as ${status}.`,
        relatedId: ticket._id,
      });
    }

    res.json(ticket);
  } catch (error) {
    res.status(400).json({ message: 'Failed to update ticket status', error: error.message });
  }
});

router.patch('/:id/assign-project-manager', async (req, res) => {
  try {
    const { projectManagerId } = req.body;
    const ticket = await Ticket.findByIdAndUpdate(req.params.id, { projectManagerId }, { new: true, runValidators: true });

    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    if (ticket.clientId) {
      await createTicketNotification({
        userId: ticket.clientId,
        title: 'Project manager assigned',
        message: `A project manager has been assigned to ticket ${ticket.ticketNumber}.`,
        relatedId: ticket._id,
      });
    }

    res.json(ticket);
  } catch (error) {
    res.status(400).json({ message: 'Failed to assign project manager', error: error.message });
  }
});

router.patch('/:id/assign-consultant', async (req, res) => {
  try {
    const { consultantId } = req.body;
    const ticket = await Ticket.findByIdAndUpdate(req.params.id, { consultantId }, { new: true, runValidators: true });

    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    if (ticket.clientId) {
      await createTicketNotification({
        userId: ticket.clientId,
        title: 'Consultant assigned',
        message: `A consultant has been assigned to ticket ${ticket.ticketNumber}.`,
        relatedId: ticket._id,
      });
    }

    res.json(ticket);
  } catch (error) {
    res.status(400).json({ message: 'Failed to assign consultant', error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const ticket = await Ticket.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }
    res.json(ticket);
  } catch (error) {
    res.status(400).json({ message: 'Failed to update ticket', error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const ticket = await Ticket.findByIdAndDelete(req.params.id);
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }
    res.json({ message: 'Ticket deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete ticket', error: error.message });
  }
});

export default router;
