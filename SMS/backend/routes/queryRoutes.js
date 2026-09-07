import express from 'express';
import Notification from '../models/Notification.js';
import Query from '../models/Query.js';

const router = express.Router();

const createQueryNotification = async ({ userId, title, message, type = 'query', relatedId }) => {
  if (!userId) return null;

  return Notification.create({
    userId,
    title,
    message,
    type,
    relatedType: 'query',
    relatedId,
    isRead: false,
  });
};

router.get('/', async (req, res) => {
  try {
    const queries = await Query.find().sort({ createdAt: -1 }).populate('clientId', 'name email company').populate('projectManagerId', 'name email').populate('consultantId', 'name email');
    res.json(queries);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch queries', error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const query = await Query.findById(req.params.id).populate('clientId', 'name email company').populate('projectManagerId', 'name email').populate('consultantId', 'name email');
    if (!query) {
      return res.status(404).json({ message: 'Query not found' });
    }
    res.json(query);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch query', error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const query = await Query.create(req.body);
    if (query.clientId) {
      await createQueryNotification({
        userId: query.clientId,
        title: 'Query submitted',
        message: `Your query ${query.queryNumber || query.title} has been received and is under review.`,
        relatedId: query._id,
      });
    }
    res.status(201).json(query);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create query', error: error.message });
  }
});

router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const query = await Query.findByIdAndUpdate(req.params.id, { status }, { new: true, runValidators: true });

    if (!query) {
      return res.status(404).json({ message: 'Query not found' });
    }

    if (query.clientId) {
      await createQueryNotification({
        userId: query.clientId,
        title: 'Query status changed',
        message: `Query ${query.queryNumber} is now ${status}.`,
        relatedId: query._id,
      });
    }

    res.json(query);
  } catch (error) {
    res.status(400).json({ message: 'Failed to update query status', error: error.message });
  }
});

router.patch('/:id/assign-project-manager', async (req, res) => {
  try {
    const { projectManagerId } = req.body;
    const query = await Query.findByIdAndUpdate(req.params.id, { projectManagerId }, { new: true, runValidators: true });

    if (!query) {
      return res.status(404).json({ message: 'Query not found' });
    }

    if (query.clientId) {
      await createQueryNotification({
        userId: query.clientId,
        title: 'Project manager assigned',
        message: `A project manager has been assigned to your query ${query.queryNumber}.`,
        relatedId: query._id,
      });
    }

    res.json(query);
  } catch (error) {
    res.status(400).json({ message: 'Failed to assign project manager', error: error.message });
  }
});

router.patch('/:id/assign-consultant', async (req, res) => {
  try {
    const { consultantId } = req.body;
    const query = await Query.findByIdAndUpdate(req.params.id, { consultantId }, { new: true, runValidators: true });

    if (!query) {
      return res.status(404).json({ message: 'Query not found' });
    }

    if (query.clientId) {
      await createQueryNotification({
        userId: query.clientId,
        title: 'Consultant assigned',
        message: `A consultant has been assigned to your query ${query.queryNumber}.`,
        relatedId: query._id,
      });
    }

    res.json(query);
  } catch (error) {
    res.status(400).json({ message: 'Failed to assign consultant', error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const query = await Query.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!query) {
      return res.status(404).json({ message: 'Query not found' });
    }
    res.json(query);
  } catch (error) {
    res.status(400).json({ message: 'Failed to update query', error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const query = await Query.findByIdAndDelete(req.params.id);
    if (!query) {
      return res.status(404).json({ message: 'Query not found' });
    }
    res.json({ message: 'Query deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete query', error: error.message });
  }
});

export default router;
