# 🔧 Backend API Documentation

Complete documentation for the YouTube Summarizer backend API.

## Overview

The backend is built with **Node.js + Express** and provides RESTful APIs for:
- YouTube video summarization
- Transcript extraction
- AI-powered Q&A
- Multi-language translation
- Note and bookmark management
- User history tracking

## Architecture

```
client (React)
    ↓ (HTTP Requests)
    ↓
Backend (Express.js)
    ├── Routes (API Endpoints)
    ├── Controllers (Logic)
    ├── Services (Utilities)
    └── Database (MongoDB)
        ├── Videos
        ├── Notes
        └── Bookmarks
```

## API Endpoints

### 1. Summarize Video
**Endpoint**: `POST /api/summarize`

Generates a complete summary for a YouTube video including summary, key points, timestamps, difficulty level, and topic.

**Request**:
```json
{
  "url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  "userId": "user123"
}
```

**Response** (200 OK):
```json
{
  "success": true,
  "videoId": "dQw4w9WgXcQ",
  "title": "Rick Astley - Never Gonna Give You Up",
  "thumbnail": "https://...",
  "summary": "This is the legendary music video...",
  "keyPoints": [
    "Iconic 1987 music video",
    "Over 1 billion views",
    "Famous internet meme",
    "Classic rickroll video"
  ],
  "difficultyLevel": "Beginner",
  "topic": "Music",
  "timestamps": [
    {
      "time": "0:00",
      "topic": "Video begins in a warehouse"
    },
    {
      "time": "2:00",
      "topic": "Rick Astley dancing"
    }
  ]
}
```

**Errors**:
- `400`: "URL required" or "Invalid YouTube URL"
- `500`: API or database error

---

### 2. Get Transcript
**Endpoint**: `GET /api/transcript/:videoId`

Retrieves the full transcript with timestamps for a specific video.

**Parameters**:
- `videoId` (string, required): YouTube video ID (11 characters)

**Response** (200 OK):
```json
{
  "success": true,
  "transcript": "[0s] Hello everyone...\n[5s] Today we...",
  "segments": [
    {
      "offset": 0,
      "duration": 5000,
      "text": "Hello everyone..."
    },
    {
      "offset": 5000,
      "duration": 6000,
      "text": "Today we..."
    }
  ]
}
```

**Errors**:
- `500`: "Could not fetch transcript"

---

### 3. Ask Questions (Q&A)
**Endpoint**: `POST /api/qa`

Ask questions about video content and get AI-powered answers.

**Request**:
```json
{
  "summary": "This video is about...",
  "keyPoints": ["Point 1", "Point 2", "Point 3"],
  "question": "What is the main topic?"
}
```

**Response** (200 OK):
```json
{
  "success": true,
  "question": "What is the main topic?",
  "answer": "The main topic is about artificial intelligence and machine learning."
}
```

**Errors**:
- `400`: "Question required"
- `500`: API error

---

### 4. Translate Text
**Endpoint**: `POST /api/translate`

Translates summary or any text to multiple languages.

**Request**:
```json
{
  "text": "This is an amazing video about machine learning.",
  "language": "Spanish"
}
```

**Supported Languages**:
- Spanish
- French
- German
- Japanese
- Chinese (Mandarin)
- Hindi
- Portuguese
- Russian
- Korean
- Arabic

**Response** (200 OK):
```json
{
  "success": true,
  "original": "This is an amazing video about machine learning.",
  "translated": "Este es un video increíble sobre aprendizaje automático.",
  "language": "Spanish"
}
```

**Errors**:
- `400`: "Text and language required"
- `500`: API error

---

### 5. Save Note
**Endpoint**: `POST /api/notes`

Save personal notes and annotations for a video.

**Request**:
```json
{
  "videoId": "dQw4w9WgXcQ",
  "title": "Rick Astley - Never Gonna Give You Up",
  "summary": "Legendary music video...",
  "keyPoints": ["Point 1", "Point 2"],
  "userNotes": "This is my personal note about the video. Great content!",
  "userId": "user123"
}
```

**Response** (200 OK):
```json
{
  "success": true,
  "noteId": "507f1f77bcf86cd799439011"
}
```

**Errors**:
- `500`: Database error

---

### 6. Get User Notes
**Endpoint**: `GET /api/notes/:userId`

Retrieve all saved notes for a specific user.

**Parameters**:
- `userId` (string, required): User identifier

**Response** (200 OK):
```json
{
  "success": true,
  "notes": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "videoId": "dQw4w9WgXcQ",
      "title": "Rick Astley - Never Gonna Give You Up",
      "summary": "Legendary music video...",
      "keyPoints": ["Point 1", "Point 2"],
      "userNotes": "Great content!",
      "userId": "user123",
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ]
}
```

---

### 7. Create Bookmark
**Endpoint**: `POST /api/bookmarks`

Bookmark a video for quick access later.

**Request**:
```json
{
  "videoId": "dQw4w9WgXcQ",
  "title": "Rick Astley - Never Gonna Give You Up",
  "thumbnail": "https://img.youtube.com/vi/dQw4w9WgXcQ/default.jpg",
  "url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  "userId": "user123"
}
```

**Response** (200 OK):
```json
{
  "success": true,
  "bookmarkId": "507f1f77bcf86cd799439012"
}
```

---

### 8. Get User Bookmarks
**Endpoint**: `GET /api/bookmarks/:userId`

Retrieve all bookmarked videos for a user.

**Parameters**:
- `userId` (string, required): User identifier

**Response** (200 OK):
```json
{
  "success": true,
  "bookmarks": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "videoId": "dQw4w9WgXcQ",
      "title": "Rick Astley - Never Gonna Give You Up",
      "thumbnail": "https://img.youtube.com/vi/dQw4w9WgXcQ/default.jpg",
      "url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      "userId": "user123",
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ]
}
```

---

### 9. Get Video History
**Endpoint**: `GET /api/history/:userId`

Get the user's video summarization history (last 20 videos).

**Parameters**:
- `userId` (string, required): User identifier

**Response** (200 OK):
```json
{
  "success": true,
  "videos": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "videoId": "dQw4w9WgXcQ",
      "title": "Rick Astley - Never Gonna Give You Up",
      "summary": "Legendary music video...",
      "keyPoints": ["Point 1", "Point 2"],
      "timestamps": [{"time": "0:00", "topic": "Beginning"}],
      "difficultyLevel": "Beginner",
      "topic": "Music",
      "userId": "user123",
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ]
}
```

---

## Database Schema

### Video Collection
```javascript
{
  _id: ObjectId,
  videoId: String,           // YouTube video ID
  title: String,             // Video title
  transcript: String,        // Full video transcript
  summary: String,           // AI-generated summary
  keyPoints: [String],       // 5-7 key bullet points
  timestamps: [{
    time: String,            // Format "MM:SS"
    topic: String            // Topic at this timestamp
  }],
  difficultyLevel: String,   // Beginner/Intermediate/Advanced
  topic: String,             // Video category
  createdAt: Date,           // Creation timestamp
  userId: String             // User identifier
}
```

### Note Collection
```javascript
{
  _id: ObjectId,
  videoId: String,           // Associated video
  title: String,             // Video title
  summary: String,           // Video summary
  keyPoints: [String],       // Key points from video
  userNotes: String,         // User's personal notes
  createdAt: Date,           // Creation timestamp
  userId: String             // User who created note
}
```

### Bookmark Collection
```javascript
{
  _id: ObjectId,
  videoId: String,           // YouTube video ID
  title: String,             // Video title
  thumbnail: String,         // Video thumbnail URL
  url: String,               // YouTube video URL
  createdAt: Date,           // Creation timestamp
  userId: String             // User who bookmarked
}
```

## Environment Variables

```env
# API Configuration
PORT=5000                                          # Server port
GEMINI_API_KEY=your_api_key_here                 # Google Gemini API key
MONGODB_URI=mongodb://localhost:27017/youtube-summarizer  # MongoDB connection

# Optional
OPENAI_API_KEY=optional_key_for_alternatives      # For future OpenAI support
NODE_ENV=development                              # Development/production
```

## Error Handling

All errors follow this format:

```json
{
  "error": "Error message describing what went wrong"
}
```

**Common HTTP Status Codes**:
- `200`: Success
- `400`: Bad request (missing/invalid parameters)
- `404`: Not found (resource doesn't exist)
- `500`: Server error (API failure, database error, etc.)

## Usage Examples

### Example 1: Summarize a Video
```bash
curl -X POST http://localhost:5000/api/summarize \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    "userId": "user123"
  }'
```

### Example 2: Get Video Transcript
```bash
curl http://localhost:5000/api/transcript/dQw4w9WgXcQ
```

### Example 3: Ask a Question
```bash
curl -X POST http://localhost:5000/api/qa \
  -H "Content-Type: application/json" \
  -d '{
    "summary": "Video about AI...",
    "keyPoints": ["AI is transformative"],
    "question": "What is the main topic?"
  }'
```

## Performance Tips

1. **Caching**: Videos are stored in MongoDB for quick retrieval
2. **Async Processing**: All API calls are non-blocking
3. **Error Recovery**: Graceful fallbacks when transcript unavailable
4. **Database Indexing**: User queries are optimized with indexes

## Security Considerations

1. **API Keys**: Keep GEMINI_API_KEY secure, never commit to git
2. **CORS**: Only allow your frontend domain in production
3. **Rate Limiting**: Consider adding rate limiting for production
4. **Input Validation**: All inputs are validated before processing
5. **Error Messages**: Production errors should not expose sensitive info

## Future Enhancements

- [ ] User authentication and authorization
- [ ] Video search across all summaries
- [ ] Collaborative note-sharing
- [ ] Advanced filtering and search
- [ ] Custom summary templates
- [ ] Export to PDF/Word
- [ ] API rate limiting
- [ ] WebSocket support for real-time updates

---

For more details about implementation, check the source code in `server.js`.
