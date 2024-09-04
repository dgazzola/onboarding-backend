import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import mongoose from 'mongoose';
const username = encodeURIComponent(process.env.DB_USERNAME as string);
const password = encodeURIComponent(process.env.DB_PASSWORD as string);
const cluster = process.env.DB_HOST;
const db = process.env.DB_NAME;

const uri = `mongodb+srv://${username}:${password}${cluster}/?retryWrites=true&writeConcern=majority`;
const options: any = {
  dbName: db,
  useUnifiedTopology: true,
};

mongoose.Promise = global.Promise;
export const connect = async () => {
  try {
    await mongoose.connect(uri, options);
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Failed to connect to MongoDB', err);
  }
};

mongoose.connection.on('error', (err) => {
  console.error(`MongoDB connection error: ${err}`);
  process.exit(-1);
});


export const disconnect = async () => {
  try {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (err) {
    console.error('Failed to disconnect from MongoDB', err);
  }
};

connect()