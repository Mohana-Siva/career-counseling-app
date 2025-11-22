import express from "express";
import dotenv from 'dotenv';
import Groq from 'groq-sdk';
import College from '../models/College.js';

dotenv.config();
const router = express.Router();

// --- Initialize All Services ---
// We only need Groq for the AI and College for the database.
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// --- Main AI Router ---
router.post("/", async (req, res) => {
  try {
    const { chatHistory } = req.body;
    const userQuery = chatHistory[chatHistory.length - 1].text.toLowerCase();
    const fullQuery = chatHistory[chatHistory.length - 1].text; // Keep original case for the AI

    // --- 1. INTENT RECOGNITION ---
    const isCutoffQuery = userQuery.includes('cutoff') || userQuery.includes('choice list');
    const numberMatch = userQuery.match(/(\d{2,3}(\.\d+)?)/);
    const communityMatch = userQuery.match(/\b(oc|bc|bcm|mbc|sc|sca|st)\b/);
    const userCommunity = communityMatch ? communityMatch[0].toUpperCase() : 'OC';

    if (isCutoffQuery && numberMatch) {
      // --- THIS ENTIRE SECTION FOR MONGODB REMAINS THE SAME ---
      const userCutoff = parseFloat(numberMatch[0]);
      console.log(`✅ Intent: Cutoff Query. Cutoff: ${userCutoff}, Community: ${userCommunity}.`);

      // Multi-tiered database search logic...
      let eligibleColleges = [];
      const limit = 15;

      // Tier 1 Search
      eligibleColleges = await College.find({
        lastYearCutoff: { $lte: userCutoff, $gte: userCutoff - 10 },
        category: userCommunity
      }).sort({ nirfRank: 1, lastYearCutoff: -1 }).limit(limit);

      // Tier 2 Search
      if (eligibleColleges.length < 5) {
        eligibleColleges = await College.find({
          lastYearCutoff: { $lte: userCutoff, $gte: userCutoff - 25 },
          category: userCommunity
        }).sort({ nirfRank: 1, lastYearCutoff: -1 }).limit(limit);
      }
      
      // Tier 3 Search
      if (eligibleColleges.length === 0) {
        eligibleColleges = await College.find({
          lastYearCutoff: { $lte: userCutoff },
          category: userCommunity
        }).sort({ lastYearCutoff: -1, nirfRank: 1 }).limit(limit);
      }

      if (eligibleColleges.length === 0) {
        return res.json({ reply: `Based on last year's data for the ${userCommunity} community, I couldn't find any colleges matching a cutoff of ${userCutoff}.` });
      }

      // Augment and Generate Response for choice lists...
      const context = eligibleColleges.map(c =>
        `- **${c.collegeName}** (Code: ${c.tneaCode})\n  - Branch: ${c.branchName}\n  - 2024 Cutoff: ${c.lastYearCutoff}\n  - NIRF Rank: ${c.nirfRank === 999 ? 'Not Ranked' : c.nirfRank}`
      ).join('\n');
      const systemPrompt = `You are Nala, an expert TNEA career advisor...`; // Same as before
      const augmentedPrompt = `ELIGIBLE COLLEGES:\n${context}\n\nBased on this data, please generate the choice list.`;
      const chatCompletion = await groq.chat.completions.create({
        messages: [{ role: 'system', content: systemPrompt }, { role: 'user', content: augmentedPrompt }],
        model: 'llama-3.1-8b-instant',
      });
      return res.json({ reply: chatCompletion.choices[0]?.message?.content || '' });

    } else {
      // --- FALLBACK TO GENERAL KNOWLEDGE (NO PINECONE/NOMIC) ---
      console.log("Fallback: General Query. Using Groq's general knowledge.");

      // This system prompt gives the AI its persona without any external context.
      const systemPrompt = `You are Nala, a helpful and friendly AI Career Advisor for students in India. Answer the user's question clearly and concisely. Format your answers with Markdown for readability.`;

      // We only send the system prompt and the user's latest question.
      const chatCompletion = await groq.chat.completions.create({
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: fullQuery } // Use the original cased query
        ],
        model: 'llama-3.1-8b-instant',
      });
      
      return res.json({ reply: chatCompletion.choices[0]?.message?.content || '' });
    }
  } catch (err) {
    console.error("Error in aiRoutes:", err);
    res.status(500).json({ error: 'Something went wrong while processing your request.' });
  }
});

export default router;

