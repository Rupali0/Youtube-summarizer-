# 🚀 YouTube Summarizer - Setup Guide

Complete step-by-step guide to get the YouTube Summarizer running on your machine.

## Prerequisites Checklist

- [ ] Node.js v16+ installed ([Download](https://nodejs.org/))
- [ ] MongoDB installed locally OR MongoDB Atlas account ([Create](https://www.mongodb.com/cloud/atlas))
- [ ] Google Gemini API Key ([Get free key](https://makersuite.google.com/app/apikey))
- [ ] Code editor (VS Code recommended)
- [ ] Terminal/Command line access

## Step 1: Get API Keys ✅

### Google Gemini API Key (Required)

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Click "Create API Key"
3. Select "Create API key in new project"
4. Copy the generated API key
5. Save it safely for Step 4

## Step 2: Setup MongoDB 🗄️

### Option A: MongoDB Atlas (Cloud - Recommended)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Click "Create Project"
4. Create a cluster (select "M0 Free")
5. Go to "Connect" and choose "Connect Your Application"
6. Copy the connection string
7. Replace `<password>` with your database password
8. Example: `mongodb+srv://user:password@cluster.mongodb.net/youtube-summarizer?retryWrites=true&w=majority`

### Option B: Local MongoDB

1. Install MongoDB from [mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)
2. Start MongoDB:
   - **Windows**: MongoDB starts automatically
   - **Mac**: `brew services start mongodb-community`
   - **Linux**: `systemctl start mongod`
3. Connection string: `mongodb://localhost:27017/youtube-summarizer`

## Step 3: Project Setup 📁

### Clone/Setup Project

```bash
# Navigate to your projects folder
cd ~/projects

# Clone or download the project
git clone <repo-url>
# or download the ZIP and extract

# Navigate to project
cd youtube-summarizer
```

## Step 4: Backend Setup 🔧

### Install Dependencies

```bash
cd server
npm install
```

### Create Environment File

Create a `.env` file in the `server` folder with:

```env
# Essential
GEMINI_API_KEY=paste_your_gemini_api_key_here
MONGODB_URI=mongodb://localhost:27017/youtube-summarizer
PORT=5000

# Optional
OPENAI_API_KEY=paste_if_you_have_it
```

**Example with MongoDB Atlas:**
```env
GEMINI_API_KEY=AIzaSyDxxx...
MONGODB_URI=mongodb+srv://myuser:mypassword@cluster.mongodb.net/youtube-summarizer?retryWrites=true&w=majority
PORT=5000
```

### Start Backend Server

```bash
npm start
```

✅ You should see: **"🚀 YouTube Summarizer API running on port 5000"**

## Step 5: Frontend Setup 🎨

### Install Dependencies

```bash
# In a new terminal, navigate to client folder
cd client
npm install
```

### Start Frontend

```bash
npm start
```

✅ React app should open in your browser at `http://localhost:3000`

## Step 6: Test the Application ✨

1. **Open the app** at `http://localhost:3000`
2. **Paste a YouTube link**: Try `https://www.youtube.com/watch?v=dQw4w9WgXcQ`
3. **Click "✨ Summarize"**
4. **Wait for results** - Should take 5-10 seconds
5. **Explore features**:
   - View summary
   - Check key points
   - See timestamps
   - Try translation
   - Ask questions

## 🎯 Verification Checklist

- [ ] Backend running on port 5000 (`npm start` in server folder)
- [ ] Frontend running on port 3000 (`npm start` in client folder)
- [ ] MongoDB connection successful
- [ ] GEMINI_API_KEY configured in .env
- [ ] Can paste YouTube URL and get summary
- [ ] Dashboard shows bookmarks and notes

## ⚠️ Common Issues & Solutions

### "Cannot find module" Error

```bash
# In server folder
rm -rf node_modules package-lock.json
npm install

# In client folder
rm -rf node_modules package-lock.json
npm install
```

### "GEMINI_API_KEY is undefined"

1. Check `.env` file is in `server` folder (not `server` > `server`)
2. Add space after `=` in `.env`: `GEMINI_API_KEY=your_key_here`
3. Restart backend: `npm start`

### "Cannot connect to MongoDB"

**If using local MongoDB:**
```bash
# Windows - Check if MongoDB is running
Get-Service MongoDB

# Mac - Start MongoDB
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

**If using MongoDB Atlas:**
1. Verify connection string includes `<password>` replaced with actual password
2. Whitelist your IP in MongoDB Atlas:
   - Go to Network Access
   - Add your IP address
   - Or use IP 0.0.0.0/0 (for development only)

### "CORS error" or "Failed to fetch"

1. Make sure backend is running on port 5000
2. Check browser console (F12) for actual error
3. Verify API endpoints in frontend's axios calls

### "Transcript not available"

- Some videos don't have transcripts
- App will use video title for summarization instead
- This is normal behavior

## 🔄 Development Workflow

### Running in Development

**Terminal 1 - Backend**
```bash
cd server
npm start
# Runs on http://localhost:5000
```

**Terminal 2 - Frontend**
```bash
cd client
npm start
# Opens http://localhost:3000 automatically
```

### Making Changes

**Backend changes**: Restart `npm start` (not auto-reload)
**Frontend changes**: Auto-reload in browser (hot reload enabled)

## 📦 Project Structure

```
youtube-summarizer/
├── server/
│   ├── server.js          # Main Express server
│   ├── package.json       # Dependencies
│   ├── .env               # Environment variables (create this)
│   └── README.md
├── client/
│   ├── src/
│   │   ├── App.js         # Main React component
│   │   ├── components/    # Reusable components
│   │   ├── index.css      # Tailwind imports
│   │   └── App.css        # Custom styles
│   ├── package.json
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── public/
└── README.md
```

## 🎓 Next Steps

After setup is complete:

1. **Explore the UI** - Try all features
2. **Review code** - Understand the architecture
3. **Customize** - Modify colors, add features
4. **Deploy** - Push to Heroku, Vercel, etc.
5. **Share** - Show off your project!

## 🚀 Optional Enhancements

### Add Authentication

```bash
npm install jwt-simple bcryptjs
```

Add login/signup pages and user authentication.

### Deploy to Heroku

```bash
# Backend
cd server
heroku login
heroku create your-app-name
git push heroku main

# Frontend (use Vercel)
cd client
npm i -g vercel
vercel
```

### Setup Database Backups

- MongoDB Atlas: Automatic backups
- Local MongoDB: Configure mongodump

## 📚 Learning Resources

- **Express.js**: https://expressjs.com/
- **React**: https://react.dev/
- **MongoDB**: https://docs.mongodb.com/
- **Tailwind CSS**: https://tailwindcss.com/
- **Axios**: https://axios-http.com/
- **Google Gemini**: https://ai.google.dev/

## 💡 Tips & Tricks

1. **Faster startup**: Install Nodemon
   ```bash
   npm install -D nodemon
   # Then use: npx nodemon server.js
   ```

2. **Debug mode**: Add `debugger;` statement and use Node inspector

3. **API testing**: Use Postman or Insomnia for testing endpoints

4. **MongoDB GUI**: Use MongoDB Compass for visual database management

## ✅ You're All Set! 

Your YouTube Summarizer is ready to go! 🎉

If you encounter any issues, refer to the troubleshooting section or check the main README.md file.

Happy coding! 🚀
