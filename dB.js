import mongoose from 'mongoose';
import * as dotenv from 'dotenv';

dotenv.config();
const { MONGO_URL, MONGO_DB_NAME } = process.env;

const configDB = { dbName: MONGO_DB_NAME };

try {
  await mongoose.connect(MONGO_URL, configDB);
  console.log('Successfully connected to DB');
} catch (e) {
  console.error('Error connecting to DB');
}
