import mongoose from 'mongoose';
import { promises as fs } from 'fs';
import dotenv from 'dotenv';
import College from './models/College.js';

dotenv.config();

async function updateNirfRanks() {
  let connection;
  try {
    // 1. Connect to MongoDB
    connection = await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected");

    // 2. Read your JSON update file
    const updatesFilePath = './data/nirf_updates.json';
    const data = await fs.readFile(updatesFilePath, 'utf8');
    const updates = JSON.parse(data);
    console.log(`Found ${updates.length} colleges to update.`);

    // 3. Loop through each update and execute a query
    for (const update of updates) {
      const { tneaCode, nirfRank } = update;

      if (!tneaCode || typeof nirfRank !== 'number') {
        console.warn(`⚠️  Skipping invalid entry: ${JSON.stringify(update)}`);
        continue;
      }

      // This is the core query. It finds all documents with a matching TNEA code
      // and sets their nirfRank to the new value.
      const result = await College.updateMany(
        { tneaCode: tneaCode },
        { $set: { nirfRank: nirfRank } }
      );

      console.log(`Updated TNEA Code ${tneaCode} to NIRF Rank ${nirfRank}. Matched: ${result.matchedCount}, Modified: ${result.modifiedCount} documents.`);
    }

    console.log("✅ All NIRF rank updates completed successfully!");

  } catch (error) {
    console.error("❌ Error during the update process:", error);
  } finally {
    // 4. Ensure the database connection is closed
    if (connection) {
      await mongoose.connection.close();
      console.log("MongoDB connection closed.");
    }
  }
}

updateNirfRanks();
