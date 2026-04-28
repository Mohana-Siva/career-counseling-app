import express from "express";
import protect from "../middleware/authMiddleware.js";
import Chat from "../models/Chat.js";

const router = express.Router();

const STOP_WORDS = new Set([
  "the", "a", "an", "and", "or", "to", "for", "of", "in", "on", "with", "my",
  "me", "is", "are", "was", "were", "be", "i", "you", "we", "it", "this", "that",
  "please", "can", "could", "would", "should", "give", "tell", "about",
]);

function buildChatTitle(messages = []) {
  const userTexts = messages
    .filter((m) => m?.sender === "user" && typeof m?.text === "string")
    .map((m) => m.text.trim())
    .filter(Boolean);

  if (userTexts.length === 0) return "New Chat";

  const fullText = userTexts.join(" ").toLowerCase();

  if (fullText.includes("choice list") || fullText.includes("cutoff")) {
    const cutoffMatch = fullText.match(/(\d{2,3}(\.\d+)?)/);
    const communityMatch = fullText.match(/\b(oc|bc|bcm|mbc|sc|sca|st)\b/i);
    const cutoffPart = cutoffMatch ? ` ${cutoffMatch[1]}` : "";
    const communityPart = communityMatch ? ` ${communityMatch[1].toUpperCase()}` : "";
    return `TNEA Choice List${cutoffPart}${communityPart}`.trim();
  }

  const words = fullText
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 2 && !STOP_WORDS.has(w));

  if (words.length === 0) {
    return userTexts[0].slice(0, 40).trim() || "Career Guidance Chat";
  }

  const freq = new Map();
  for (const word of words) {
    freq.set(word, (freq.get(word) || 0) + 1);
  }

  const topWords = [...freq.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4)
    .map(([word]) => word);

  const title = topWords
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return title || "Career Guidance Chat";
}

// Get all chats for logged-in user
router.get("/all", protect, async (req, res) => {
  try {
    const chats = await Chat.find({ user: req.user.id })
      .select("title createdAt")
      .sort({ createdAt: -1 });

    res.json(chats);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch chat history" });
  }
});

// Get one chat by ID
router.get("/:chatId", protect, async (req, res) => {
  try {
    const chat = await Chat.findOne({
      _id: req.params.chatId,
      user: req.user.id,
    });

    if (!chat) return res.status(404).json({ error: "Chat not found" });

    res.json(chat);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch chat" });
  }
});

// Save or update chat
router.post("/save", protect, async (req, res) => {
  try {
    const { chatId, messages } = req.body;
    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: "messages are required." });
    }

    const title = buildChatTitle(messages);
    let chat;

    if (chatId) {
      chat = await Chat.findOneAndUpdate(
        { _id: chatId, user: req.user.id },
        { messages, title },
        { new: true }
      );
    } else {
      chat = await Chat.create({
        user: req.user.id,
        title,
        messages,
      });
    }

    res.json(chat);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save chat" });
  }
});

export default router;
