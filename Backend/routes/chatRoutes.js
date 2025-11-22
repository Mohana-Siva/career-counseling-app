import express from "express";
import protect from "../middleware/authMiddleware.js";
import Chat from "../models/Chat.js";

const router = express.Router();

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
      user: req.user.id
    });

    if (!chat) return res.status(404).json({ error: "Chat not found" });

    res.json(chat);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch chat" });
  }
});

// Save/update chat
router.post("/save", protect, async (req, res) => {
  try {
    const { chatId, messages } = req.body;

    let title = messages[0]?.text?.slice(0, 30) || "New Chat";

    let chat;

    // If chat exists → update
    if (chatId) {
      chat = await Chat.findOneAndUpdate(
        { _id: chatId, user: req.user.id },
        { messages },
        { new: true }
      );
    } 
    // Else create a new chat entry
    else {
      chat = await Chat.create({
        user: req.user.id,
        title,
        messages
      });
    }

    res.json(chat);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save chat" });
  }
});

export default router;
