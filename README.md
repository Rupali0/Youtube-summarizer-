
# 🎬 YouTube Summarizer - AI-Powered Video Intelligence

A full-stack web application that extracts transcripts from YouTube videos and generates instant summaries, key points, and timestamps using AI.

## ✨ Features

### 🎯 Core Features
- ✅ **Paste & Summarize** - Paste any YouTube URL and get instant summaries
- ✅ **Smart Transcripts** - Automatically extract video transcripts
- ✅ **AI Summaries** - Generate concise summaries using Gemini AI
- ✅ **Key Points** - Extract 5-7 most important bullet points
- ✅ **Important Timestamps** - Get timestamps of key topics
- ✅ **Difficulty Detection** - Auto-detect Beginner/Intermediate/Advanced levels
- ✅ **Topic Classification** - Automatically categorize video content

### 🚀 Advanced Features
- 🌍 **Multi-Language Translation** - Translate summaries to 10+ languages
- ❓ **Auto Q&A** - Ask questions and get AI-powered answers about video content
- 📌 **Bookmarking** - Save videos for later with thumbnails
- 📝 **Personal Notes** - Save custom notes and annotations
- 📊 **Dashboard** - View all bookmarks and notes in one place
- 📊 **Video History** - Track all videos you've summarized
- 🎓 **Resume-Ready** - Professional UI showcasing AI/ML capabilities

## 🛠 Tech Stack

### Frontend
- **React 19** - Modern UI library
- **Tailwind CSS** - Beautiful, responsive styling
- **Axios** - HTTP client for API calls
- **Modern JavaScript (ES6+)**

### Backend
- **Node.js + Express** - Fast, lightweight server
- **MongoDB** - Document database for storing notes/bookmarks
- **Mongoose** - ODM for MongoDB
- **YouTube Transcript API** - Extract transcripts seamlessly
- **Google Gemini API** - AI-powered text generation

## 📋 Prerequisites

Before you begin, ensure you have:

- **Node.js** (v16 or higher)
- **MongoDB** (local or MongoDB Atlas)
- **API Keys**:
  - Google Gemini API Key ([Get here](https://makersuite.google.com/app/apikey))
  - (Optional) OpenAI API Key

## 🚀 Quick Start

### 1️⃣ Clone & Install Dependencies

```bash
# Backend setup
cd server
npm install

# Frontend setup
cd ../client
npm install
```

### 2️⃣ Configure Environment Variables

**Server (.env file)**
```env
# Required
GEMINI_API_KEY=your_gemini_api_key_here
MONGODB_URI=mongodb://localhost:27017/youtube-summarizer
PORT=5000

# Optional
OPENAI_API_KEY=your_openai_key_if_using
```

### 3️⃣ Start MongoDB

```bash
# If using local MongoDB
mongod

# Or use MongoDB Atlas (update MONGODB_URI in .env)
```

### 4️⃣ Start the Application

**Terminal 1 - Backend**
```bash
cd server
npm start
# Server runs on http://localhost:5000
```

**Terminal 2 - Frontend**
```bash
cd client
npm start
# React app opens on http://localhost:3000
```

## 📖 API Endpoints

### Summarization
- **POST** `/api/summarize` - Generate summary for YouTube video
  ```json
  { "url": "https://youtube.com/watch?v=...", "userId": "user123" }
  ```

### Transcripts
- **GET** `/api/transcript/:videoId` - Get full transcript with timestamps

### Q&A
- **POST** `/api/qa` - Ask questions about video content
  ```json
  { "summary": "...", "keyPoints": [...], "question": "..." }
  ```

### Translation
- **POST** `/api/translate` - Translate summary to any language
  ```json
  { "text": "...", "language": "Spanish" }
  ```

### Notes Management
- **POST** `/api/notes` - Save personal notes
- **GET** `/api/notes/:userId` - Retrieve all user notes

### Bookmarks
- **POST** `/api/bookmarks` - Bookmark a video
- **GET** `/api/bookmarks/:userId` - Get all bookmarks

### History
- **GET** `/api/history/:userId` - Get user's video history

## 🎨 UI/UX Highlights

- 🎭 **Dark Theme** - Easy on the eyes, modern gradient design
- 📱 **Responsive** - Works on desktop, tablet, and mobile
- ⚡ **Fast** - Optimized for quick responses
- 🎯 **Intuitive** - Simple, clean navigation
- 🌈 **Beautiful** - Glassmorphism effects and smooth animations

## 📱 How to Use

1. **Paste YouTube URL** - Copy any YouTube link and paste it
2. **Click Summarize** - AI generates summary in seconds
3. **Explore Results** - View summary, key points, timestamps
4. **Advanced Features**:
   - Translate summary to other languages
   - Ask questions about the video
   - Save bookmarks and notes
   - View full transcript
5. **Manage Content** - Use dashboard to organize all your saved items

## 🔐 Data Privacy

- User data is stored locally in your MongoDB instance
- No data is shared with third parties
- AI processing uses Gemini API (governed by Google's privacy policy)
- You control your own data

## 🚀 Deployment

### Heroku/Railway Deployment

**Backend:**
```bash
cd server
# Set environment variables in hosting platform
git push
```

**Frontend (Vercel):**
```bash
cd client
vercel
```

**Update API URL** in React code:
```javascript
// Change from localhost:5000 to your deployed backend URL
const API_URL = process.env.REACT_APP_API_URL || "https://your-backend.com";
```

## 📈 Future Enhancements

- [ ] Multi-account support with authentication
- [ ] Video search and recommendations
- [ ] Collaboration features (share summaries)
- [ ] Custom templates for note-taking
- [ ] Export summaries to PDF/Word
- [ ] Dark/Light theme toggle
- [ ] Browser extension for quick summarization
- [ ] Mobile app (React Native)
- [ ] Video chapters generation
- [ ] Speaker identification and emotion detection

## 🐛 Troubleshooting

**Issue: "Transcript not available"**
- Solution: Not all videos have transcripts. The app will use the title for summarization.

**Issue: "GEMINI_API_KEY not found"**
- Solution: Make sure you added the key to `.env` file in server directory

**Issue: "MongoDB connection failed"**
- Solution: Check if MongoDB is running or verify your MongoDB Atlas connection string

**Issue: Axios errors on frontend**
- Solution: Make sure backend server is running on port 5000

## 📚 Learning Resources

- [YouTube Transcript API Docs](https://github.com/neetcode/youtube-transcript)
- [Google Gemini API](https://ai.google.dev/)
- [Express.js Documentation](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Tailwind CSS](https://tailwindcss.com/)

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests
- Improve documentation

## 📄 License

This project is open source and available under the MIT License.

## 💬 Support

For issues or questions:
1. Check the Troubleshooting section
2. Review API endpoint documentation
3. Check console logs for error messages
4. Open an issue on GitHub

---

**Made with ❤️ for developers who want to learn and build amazing things**

⭐ If you find this useful, please star the repository!
