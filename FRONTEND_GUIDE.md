# 🎨 Frontend - React & Tailwind CSS

Complete guide to the React frontend for YouTube Summarizer.

## Overview

The frontend is built with **React 19** and **Tailwind CSS**, providing a modern, responsive UI for video summarization.

## Project Structure

```
client/src/
├── App.js                    # Main application
├── App.css                   # App styles
├── index.css                 # Global styles + Tailwind
├── components/
│   ├── URLInput.js          # URL input form
│   ├── ResultDisplay.js     # Results viewer
│   ├── Dashboard.js         # Bookmarks & notes
│   ├── TranslatePanel.js    # Translation
│   └── QAPanel.js           # Q&A feature
├── tailwind.config.js       # Tailwind config
└── postcss.config.js        # PostCSS config
```

## Components

### URLInput.js
- YouTube URL input with validation
- Summarize button with loading state
- Error message display
- Feature highlights

### ResultDisplay.js
- 5 tabs: Summary, Key Points, Timestamps, Translate, Q&A
- Video thumbnail and metadata
- Bookmark and save note buttons
- Transcript viewer
- Timestamps with copy functionality

### TranslatePanel.js
- Translate to 10+ languages
- Language selection dropdown
- Display translated text

### QAPanel.js
- Ask questions about video
- AI-powered answers
- Q&A history display

### Dashboard.js
- View bookmarked videos (grid)
- View saved notes (expandable)
- Refresh data

## Running Frontend

```bash
cd client
npm install
npm start
# Opens http://localhost:3000
```

## Styling

- **Framework**: Tailwind CSS v3
- **Colors**: Purple & Pink theme
- **Responsive**: Mobile-first design
- **Features**: Dark mode, animations, glassmorphism

## State Management

- **Global**: App.js manages all state
- **Local**: Components manage internal state
- **Persistence**: User ID stored in localStorage

## API Integration

Uses Axios to call backend APIs:
- `/api/summarize` - Generate summary
- `/api/transcript` - Get full transcript
- `/api/qa` - Ask questions
- `/api/translate` - Translate text
- `/api/notes` - Save/retrieve notes
- `/api/bookmarks` - Save/retrieve bookmarks

## Development

- Hot reload enabled
- Used with backend on `localhost:5000`
- React DevTools supported

For detailed documentation, see README.md in main directory.
