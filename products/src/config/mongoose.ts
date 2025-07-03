import mongoose from 'mongoose';

export const connectMongoDB = async (): Promise<void> => {
  try {
    await mongoose.connect('mongodb://localhost:27017/Product');
    console.log('mongodb conne');
  } catch (error) {
    console.error('mongodb conne failed', error);
    process.exit(1);
  }
};
