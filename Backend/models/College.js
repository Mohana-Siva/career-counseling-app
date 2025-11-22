import mongoose from 'mongoose';

const collegeSchema = new mongoose.Schema({
  // Corresponds to the 'college_name' column in our final CSV
  collegeName: String, 
  
  // Corresponds to the 'branch_name' column
  branchName: String, 
  
  // Corresponds to the 'tnea_code' column
  tneaCode: String,   
  
  // The crucial 'category' column (OC, BC, BCM, etc.)
  category: String,   
  
  // The crucial 'lastYearCutoff' column for that specific category
  lastYearCutoff: Number, 
  
  // Corresponds to the 'nirf_rank' column
  nirfRank: Number,   
});

const College = mongoose.model('College', collegeSchema);

export default College;