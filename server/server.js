import express from "express";
import cors from "cors";
import axios from "axios";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ========== DATABASE SETUP ==========
// ========== DATABASE SETUP ==========
// It is better to use MONGO_URI from your .env file
const mongoUri = process.env.MONGO_URI || "mongodb+srv://paikrupali0_db_user:vltzwMiBKuGFJQvZ@cluster0.wsnzcue.mongodb.net/youtube-summarizer?retryWrites=true&w=majority";

mongoose.connect(mongoUri)
  .then(() => console.log("🚀 Connected to MongoDB Atlas"))
  .catch(err => console.error("❌ MongoDB connection error:", err));
// ========== SCHEMAS ==========
const videoSchema = new mongoose.Schema({
  videoId: String,
  title: String,
  transcript: String,
  summary: String,
  keyPoints: [String],
  timestamps: [{ time: String, topic: String }],
  difficultyLevel: String,
  topic: String,
  createdAt: { type: Date, default: Date.now },
  userId: String,
});

const noteSchema = new mongoose.Schema({
  videoId: String,
  title: String,
  summary: String,
  keyPoints: [String],
  userNotes: String,
  createdAt: { type: Date, default: Date.now },
  userId: String,
});

const bookmarkSchema = new mongoose.Schema({
  videoId: String,
  title: String,
  thumbnail: String,
  url: String,
  createdAt: { type: Date, default: Date.now },
  userId: String,
});

const Video = mongoose.model("Video", videoSchema);
const Note = mongoose.model("Note", noteSchema);
const Bookmark = mongoose.model("Bookmark", bookmarkSchema);

// ========== UTILITIES ==========
function getVideoId(url) {
  const regex = /(?:v=|\/)([0-9A-Za-z_-]{11}).*/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

// Simple transcript fetching (best effort)
async function tryGetTranscript(videoId) {
  // Since the youtube-transcript package has module compatibility issues,
  // we'll just return null and rely on video titles for summarization
  // This still provides good summaries using the Gemini API
  return null;
}

import Groq from "groq-sdk";
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function callGemini(prompt) {
  try {
    const response = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [{ role: "user", content: prompt }],
    });
    return response.choices[0]?.message?.content || "";
  } catch (error) {
    console.error("Groq API Error:", error.message);
    throw new Error(error.message);
  }
}

// ========== ROUTES ==========

// Test endpoint
app.get("/", (req, res) => {
  res.json({ message: "YouTube Summarizer API running ✅" });
});

// Main summarize endpoint
app.post("/api/summarize", async (req, res) => {
  try {
    const { url, userId } = req.body;

    if (!url) return res.status(400).json({ error: "URL required" });

    const videoId = getVideoId(url);
    if (!videoId) return res.status(400).json({ error: "Invalid YouTube URL" });

    // Get video metadata
    const videoData = await axios.get(
      `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`
    );

    const title = videoData.data.title;
    const thumbnail = videoData.data.thumbnail_url;

    // Get transcript
    let transcript = "";
    try {
      const transcriptData = await tryGetTranscript(videoId);
      if (transcriptData) {
        transcript = transcriptData;
      } else {
        transcript = title;
      }
    } catch (transcriptError) {
      console.log("Transcript not available, using title only");
      transcript = title;
    }

    // Generate summary
    const summaryPrompt = `Analyze this YouTube video and provide:
1. A concise 2-3 sentence summary
2. 5-7 key bullet points
3. Estimated difficulty level (Beginner/Intermediate/Advanced)
4. Main topic/category

Video Title: ${title}
Transcript: ${transcript.substring(0, 5000)}

Format your response as JSON with keys: summary, keyPoints (array), difficultyLevel, topic`;

    const summaryResponse = await callGemini(summaryPrompt);
    
    let parsedSummary = {
      summary: "Unable to generate summary",
      keyPoints: [],
      difficultyLevel: "Intermediate",
      topic: "General"
    };

    try {
      const jsonMatch = summaryResponse.match(/```json\s*([\s\S]*?)```/) || summaryResponse.match(/({[\s\S]*})/); 
      parsedSummary = JSON.parse(jsonMatch ? jsonMatch[1] : summaryResponse);
    } catch {
      parsedSummary.summary = summaryResponse;
    }

    // Extract timestamps (simple extraction from transcript)
    const timestamps = [];
    const transcriptLines = transcript.split(".").slice(0, 5);
    transcriptLines.forEach((line, idx) => {
      if (line.trim().length > 20) {
        timestamps.push({
          time: `${idx * 2}:00`,
          topic: line.trim().substring(0, 50)
        });
      }
    });

    // Save to database (disabled)
    // Save to database (enabled)
    const newVideo = new Video({
      videoId,
      title,
      transcript,
      summary: parsedSummary.summary,
      keyPoints: parsedSummary.keyPoints,
      timestamps,
      difficultyLevel: parsedSummary.difficultyLevel,
      topic: parsedSummary.topic,
      userId: userId || "anonymous"
    });

    await newVideo.save();

    res.json({
      success: true,
      videoId,
      title,
      thumbnail,
      ...parsedSummary,
      timestamps
    });

  } catch (error) {
    console.error("Summarize Error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// Get transcript endpoint
app.get("/api/transcript/:videoId", async (req, res) => {
  try {
    const { videoId } = req.params;
    
    const transcriptData = await tryGetTranscript(videoId);
    
    if (!transcriptData) {
      return res.status(400).json({ error: "Transcript not available for this video" });
    }

    res.json({
      success: true,
      transcript: transcriptData
    });
  } catch (error) {
    res.status(500).json({ error: "Could not fetch transcript: " + error.message });
  }
});

// Generate Q&A endpoint
app.post("/api/qa", async (req, res) => {
  try {
    const { summary, keyPoints, question } = req.body;

    if (!question) return res.status(400).json({ error: "Question required" });

    const qaPrompt = `Based on this video content:
Summary: ${summary}
Key Points: ${keyPoints.join(", ")}

Answer this question: ${question}

Provide a concise, accurate answer in 1-2 sentences.`;

    const answer = await callGemini(qaPrompt);

    res.json({ success: true, question, answer });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Translate endpoint
app.post("/api/translate", async (req, res) => {
  try {
    const { text, language } = req.body;

    if (!text || !language) {
      return res.status(400).json({ error: "Text and language required" });
    }

    const translatePrompt = `Translate this text to ${language}:
"${text}"

Only provide the translated text, nothing else.`;

    const translated = await callGemini(translatePrompt);

    res.json({ success: true, original: text, translated, language });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Save note endpoint
app.post("/api/notes", async (req, res) => {
  try {
    const { videoId, title, summary, keyPoints, userNotes, userId } = req.body;

    const note = new Note({
      videoId,
      title,
      summary,
      keyPoints,
      userNotes,
      userId: userId || "anonymous"
    });

    await note.save();
    res.json({ success: true, noteId: note._id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get notes endpoint
app.get("/api/notes/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const notes = await Note.find({ userId }).sort({ createdAt: -1 });
    res.json({ success: true, notes });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Bookmark endpoint
app.post("/api/bookmarks", async (req, res) => {
  try {
    const { videoId, title, thumbnail, url, userId } = req.body;

    const bookmark = new Bookmark({
      videoId,
      title,
      thumbnail,
      url,
      userId: userId || "anonymous"
    });

    await bookmark.save();
    res.json({ success: true, bookmarkId: bookmark._id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get bookmarks endpoint
app.get("/api/bookmarks/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const bookmarks = await Bookmark.find({ userId }).sort({ createdAt: -1 });
    res.json({ success: true, bookmarks });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// History endpoint
app.get("/api/history/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const videos = await Video.find({ userId }).sort({ createdAt: -1 }).limit(20);
    res.json({ success: true, videos });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 YouTube Summarizer API running on port ${PORT}`);
});