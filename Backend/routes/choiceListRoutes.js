import express from 'express';
import College from '../models/College.js';

const router = express.Router();


// POST /api/generate-choice-list/
router.post('/', async (req, res) => {
  try {
    const { cutoff, community } = req.body;

    // --- Input Validation ---
    if (typeof cutoff !== 'number' || !community || cutoff <= 0) {
      return res.status(400).json({ error: 'A valid cutoff and community are required.' });
    }
    
    
    let eligibleColleges = [];
    const limit = 20; 

    // Tier 1: "Aspirational/Perfect Fit" Search (within 10 points)
    eligibleColleges = await College.find({
      lastYearCutoff: { $lte: cutoff, $gte: cutoff - 10 },
      category: community.toUpperCase()
    })
    .sort({ nirfRank: 1, lastYearCutoff: -1 })
    .limit(limit);

    // Tier 2: "Good Fit" Search (if Tier 1 finds less than 5 results)
    if (eligibleColleges.length < 5) {
      eligibleColleges = await College.find({
        lastYearCutoff: { $lte: cutoff, $gte: cutoff - 25 },
        category: community.toUpperCase()
      })
      .sort({ nirfRank: 1, lastYearCutoff: -1 })
      .limit(limit);
    }

    // Tier 3: "Safest Options" Search (if still not enough results)
    if (eligibleColleges.length < 5) {
      eligibleColleges = await College.find({
        lastYearCutoff: { $lte: cutoff },
        category: community.toUpperCase()
      })
      .sort({ lastYearCutoff: -1, nirfRank: 1 })
      .limit(limit);
    }
    
    
    res.status(200).json(eligibleColleges);

  } catch (error) {
    console.error("Error in choice list generator:", error);
    res.status(500).json({ error: 'An error occurred on the server.' });
  }
});

export default router;