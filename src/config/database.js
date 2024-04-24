import mongoose from 'mongoose';

const dbConfig = async () => {
  try {
    const { MONGODB_URL } = process.env;
    if (!MONGODB_URL) throw new Error('DB Url is empty!');

    await mongoose.connect(MONGODB_URL);
    console.info('Db connected successfully!');
  } catch (error) {
    console.error('DB Connection Error!');
    console.error(error);
  }
};

export default dbConfig;
