import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import aiRoutes from "./routes/aiRoutes.js";
import authRoutes from "./routes/auth.js";  // ✅ import auth routes
import userRoutes from "./routes/userRoutes.js";


dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: ["http://localhost:5173", "https://authentication-xi-eight.vercel.app"],
  credentials: true
}));

// Increase JSON payload limit (e.g., 10 MB)
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true, limit: "5mb" }));



// Connect MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Error:", err));

// Routes
app.use("/api/chat", aiRoutes);
app.use("/api/auth", authRoutes);  // ✅ now /api/auth/register exists
app.use("/api/users", userRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
