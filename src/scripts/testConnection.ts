// src/scripts/testConnection.ts
import { config } from 'dotenv';
import path from 'path';

// Load environment variables from .env.local
config({ path: path.resolve(process.cwd(), '.env.local') });

import mongoose from 'mongoose';
import dbConnect from '../lib/dbConnect';

async function testConnection() {
  try {
    console.log('Using MONGODB_URI:', process.env.MONGODB_URI); // Add this line
    await dbConnect();
    console.log('✅ MongoDB connection successful');
    console.log('📊 MongoDB collections:', Object.keys(mongoose.connection.collections));
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
  }
}

testConnection();