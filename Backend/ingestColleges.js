import mongoose from 'mongoose';
import csv from 'csv-parser';
import fs from 'fs';
import dotenv from 'dotenv';
import College from './models/College.js';

dotenv.config();

async function ingestData() {
  let rowCounter = 0;
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected");

    await College.deleteMany({});
    console.log("Cleared existing college data.");

    const results = [];
    fs.createReadStream('./data/tnea_data.csv')
      .pipe(csv())
      .on('data', (data) => {
        rowCounter++; // Keep track of the current row number in the CSV
        
        const cutoff = parseFloat(data.cutoff_2024);

        // ✅ THE FIX: Check if the cutoff is a valid number.
        if (data.college_name && !isNaN(cutoff)) {
          // If it's a valid number, add it to our results.
          results.push({
            collegeName: data.college_name,
            branchName: data.branch_name,
            tneaCode: data.tnea_code,
            category: data.category.toUpperCase(),
            lastYearCutoff: cutoff, // Use the already parsed number
            nirfRank: data.nirf_rank_2024 ? parseInt(data.nirf_rank_2024, 10) : 999,
          });
        } else {
          // If it's NOT a valid number, print a warning and skip this row.
          console.warn(`⚠️  [WARNING] Skipping CSV row ${rowCounter + 1} due to invalid cutoff value for college: "${data.college_name}". Cutoff value found: "${data.cutoff_2024}"`);
        }
      })
      .on('end', async () => {
        if (results.length > 0) {
          await College.insertMany(results);
          console.log(`✅ Successfully ingested ${results.length} valid records into MongoDB.`);
        } else {
          console.error("❌ No valid data was found to ingest. Please check your CSV file for errors.");
        }
        await mongoose.connection.close();
      });

  } catch (error) {
    console.error("❌ Error during ingestion:", error);
    process.exit(1);
  }
}

ingestData();

