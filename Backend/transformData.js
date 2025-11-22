import fs from 'fs';
import csv from 'csv-parser';

const wideCsvPath = './data/tnea_wide.csv'; // Your current CSV file
const longCsvPath = './data/tnea_data.csv';  // The final, correct CSV file

const longData = [];
// These must match the column names in your wide CSV exactly
const communityColumns = ['OC', 'BC', 'BCM', 'MBC', 'SC', 'SCA', 'ST']; 

fs.createReadStream(wideCsvPath)
  .pipe(csv())
  .on('data', (row) => {
    // Add NIRF rank here if you have it, otherwise use a placeholder
    const nirfRank = row['NIRF Rank'] || 999; 

    for (const community of communityColumns) {
      const cutoff = row[community];
      
      // Only create a row if a cutoff value exists for that community
      if (cutoff && cutoff.trim() !== '') {
        longData.push({
          college_name: row['College Name'],
          branch_name: row['Branch Name'],
          tnea_code: row['College Code'],
          category: community,
          cutoff_2024: parseFloat(cutoff),
          nirf_rank_2024: parseInt(nirfRank)
        });
      }
    }
  })
  .on('end', () => {
    // Convert the array of objects to a CSV string
    const header = 'college_name,branch_name,tnea_code,category,cutoff_2024,nirf_rank_2024\n';
    const csvRows = longData.map(d => 
      `"${d.college_name.replace(/"/g, '""')}",${d.branch_name},${d.tnea_code},${d.category},${d.cutoff_2024},${d.nirf_rank_2024}`
    ).join('\n');

    fs.writeFileSync(longCsvPath, header + csvRows);
    console.log(`Transformation complete! ${longData.length} rows created in ${longCsvPath}`);
  });