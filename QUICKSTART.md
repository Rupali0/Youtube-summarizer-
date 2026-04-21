# ⚡ Quick Start Guide

Get YouTube Summarizer running in 5 minutes!

## Prerequisites
- Node.js v16+
- MongoDB (local or Atlas)
- Google Gemini API Key

## 5-Minute Setup

### 1. Get Gemini API Key (1 min)
Go to: https://makersuite.google.com/app/apikey → Click "Create API Key" → Copy it

### 2. Update .env File (1 min)
**File**: `server/.env`
```env
GEMINI_API_KEY=your_key_here
MONGODB_URI=mongodb://localhost:27017/youtube-summarizer
PORT=5000
```

### 3. Install Backend (1 min)
```bash
cd server
npm install
npm start
# ✅ Shows: "🚀 YouTube Summarizer API running on port 5000"
```

### 4. Install Frontend (1 min)
```bash
# New terminal
cd client
npm install
npm start
# ✅ Opens http://localhost:3000 automatically
```

### 5. Test It (1 min)
1. Paste this URL: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`
2. Click "✨ Summarize"
3. Wait 5-10 seconds
4. See the summary, key points, timestamps! 🎉

## What You Get

✅ **Core Features**
- Paste YouTube URL → Get AI summary
- Key points extraction
- Important timestamps
- Difficulty detection

✅ **Advanced Features**
- 🌍 Translate to 10+ languages
- ❓ Ask questions & get answers
- 📌 Bookmark videos
- 📝 Save personal notes
- 📚 Dashboard with organization

## File Overview

```
youtube-summarizer/
├── server/
│   ├── server.js             ← All API logic
│   ├── .env                  ← Your API keys (create this)
│   └── package.json
├── client/
│   ├── src/
│   │   ├── App.js            ← Main React app
│   │   └── components/       ← All UI components
│   ├── tailwind.config.js
│   └── package.json
├── README.md                 ← Full documentation
├── SETUP_GUIDE.md           ← Detailed setup guide
└── FRONTEND_GUIDE.md        ← Frontend docs
```

## Common Issues

| Issue | Solution |
|-------|----------|
| "Cannot find module" | Run `npm install` in server and client |
| "GEMINI_API_KEY not found" | Check `.env` file in server folder |
| "Cannot connect to MongoDB" | Start MongoDB or use MongoDB Atlas |
| Axios errors | Ensure backend runs on port 5000 |
| API returns error | Check console for detailed error message |

## Next Steps

1. **Explore Features** - Try all buttons and tabs
2. **Review Code** - Read App.js and components
3. **Customize** - Change colors in tailwind.config.js
4. **Deploy** - Use Heroku for backend, Vercel for frontend
5. **Extend** - Add authentication, search, sharing, etc.

## API Endpoints (Reference)

```
POST   /api/summarize          - Summarize video
GET    /api/transcript/:videoId - Get transcript
POST   /api/qa                  - Ask questions
POST   /api/translate          - Translate text
POST   /api/notes              - Save notes
GET    /api/notes/:userId      - Get notes
POST   /api/bookmarks          - Create bookmark
GET    /api/bookmarks/:userId  - Get bookmarks
```

## Support

- Check [README.md](README.md) for full docs
- Check [SETUP_GUIDE.md](SETUP_GUIDE.md) for details
- Check [server/README.md](server/README.md) for API docs
- Check console for error messages (F12)

## Tech Stack

**Frontend**: React 19, Tailwind CSS, Axios
**Backend**: Node.js, Express, MongoDB, Mongoose
**AI**: Google Gemini API
**Transcripts**: YouTube Transcript API

---

**🎉 Your YouTube Summarizer is ready!**

⭐ If you find this useful, star the repository!
