import mongoose from 'mongoose';

const cleanupLegacyConsultantData = async () => {
  try {
    const consultants = mongoose.connection.collection('consultants');

    const indexes = await consultants.indexes();
    const hasLegacyIdIndex = indexes.some((index) => index.name === 'id_1');
    if (hasLegacyIdIndex) {
      await consultants.dropIndex('id_1');
      console.log('Removed legacy consultant id index');
    }

    const legacyIdResult = await consultants.updateMany(
      { id: { $exists: true } },
      { $unset: { id: '' } }
    );

    if (legacyIdResult.modifiedCount > 0) {
      console.log(`Removed legacy consultant id fields: ${legacyIdResult.modifiedCount}`);
    }
  } catch (error) {
    console.warn('Legacy consultant cleanup warning:', error.message);
  }
};

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/sms_db');
    console.log(`MongoDB connected: ${conn.connection.host}`);
    await cleanupLegacyConsultantData();
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
};

export default connectDB;
