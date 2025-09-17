# RAG-Powered News Chatbot - Frontend

## 🚀 Overview
A modern React-based chat interface for the RAG-powered news chatbot, featuring real-time communication, session management, and responsive design.

## 🛠️ Tech Stack
- **Framework**: React.js (v18.2.0)
- **Styling**: CSS-in-JS (inline styles for demo)
- **Real-time Communication**: Socket.io Client
- **HTTP Client**: Axios
- **State Management**: React Hooks (useState, useEffect)
- **UUID Generation**: uuid package
- **Build Tool**: Create React App

## 📋 Features
- ✅ Real-time chat interface
- ✅ Socket.io integration with auto-reconnection
- ✅ Session management and reset functionality
- ✅ Typing indicators and connection status
- ✅ Source citation display for bot responses
- ✅ Responsive design (desktop and mobile)
- ✅ Error handling and user feedback
- ✅ Message history with timestamps

## 🏗️ Component Architecture

```
src/
├── components/
│   ├── ChatWindow.js      # Main chat interface & state management
│   ├── MessageList.js     # Message display with scrolling
│   ├── MessageInput.js    # Input handling and form submission
├── services/
│   ├── socketService.js   # Socket.io client wrapper
│   └── apiService.js      # REST API communication
└── App.js                 # Root component
```

## 🔌 Service Integration

### Socket Service
Handles real-time communication with automatic reconnection:
```javascript
- connect() - Establishes socket connection
- joinSession(sessionId) - Joins chat session
- sendMessage(sessionId, message) - Sends user message
- onBotResponse(callback) - Listens for bot responses
- onBotTyping(callback) - Typing indicator events
```

### API Service  
Manages REST API calls for session management:
```javascript
- createSession() - Creates new chat session
- clearSession(sessionId) - Clears session data
- healthCheck() - Backend status verification
```

## ⚙️ Installation & Setup

### Prerequisites
- Node.js (v16+)
- Backend server running on port 3001

### Environment Variables
Create `.env` file:
```env
REACT_APP_BACKEND_URL=http://localhost:3001
```

### Installation
```bash
npm install
npm start
```

## 🎨 UI/UX Features

### Chat Interface
- **Clean Design**: Minimalist interface focusing on conversation
- **Message Bubbles**: Distinct styling for user vs bot messages
- **Source Citations**: Clickable links to news articles
- **Timestamps**: Message timing for context
- **Connection Status**: Real-time server connection indicator

### Responsive Design
- **Desktop**: Full-width chat window with optimal spacing
- **Mobile**: Touch-friendly interface with responsive layout
- **Accessibility**: Proper contrast ratios and semantic markup

### User Feedback
- **Loading States**: Typing indicators and connection status
- **Error Handling**: Clear error messages with recovery options
- **Session Info**: Display of current session ID
- **Reset Functionality**: One-click session reset

## 🔄 State Management

### ChatWindow State
- `messages[]` - Chat message history
- `sessionId` - Current session identifier
- `isTyping` - Bot typing indicator
- `connectionStatus` - Socket connection state

### Message Flow
1. User types message → MessageInput component
2. Message added to local state immediately
3. Socket.io sends message to backend
4. Typing indicator shows while processing
5. Bot response received via socket
6. Response added to message list with sources

## 🌐 Real-time Features

### Socket.io Integration
- **Auto-reconnection**: Handles network interruptions
- **Room-based sessions**: Isolated chat sessions
- **Event handling**: Proper cleanup on unmount
- **Error recovery**: Graceful connection failure handling

### Connection Management
```javascript
connectionStatus states:
- 'connecting' - Initial connection attempt
- 'connected' - Successfully connected
- 'disconnected' - Connection lost
- 'error' - Connection failed
```

## 🎯 User Experience

### Chat Flow
1. **Welcome Message**: Greeting on session start
2. **Natural Conversation**: Fluid question-answer flow
3. **Source Attribution**: Links to original news articles
4. **History Persistence**: Messages remain during session
5. **Easy Reset**: Quick session restart option

### Error Handling
- Network errors show user-friendly messages
- Failed connections trigger automatic retry
- Backend unavailability displays clear status
- Session errors provide recovery options

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Environment Configuration
- Update `REACT_APP_BACKEND_URL` for production backend
- Ensure CORS is configured on backend for frontend domain
- Test all socket connections work across environments

## 🔧 Development Notes

### Socket.io Configuration
- Transports: WebSocket with polling fallback
- Reconnection: Enabled with exponential backoff
- Timeout: 20 seconds for connection attempts

### Performance Optimizations
- Automatic scrolling to new messages
- Efficient re-rendering with React keys
- Memory cleanup on component unmount
- Debounced typing indicators

## 🛠️ Future Enhancements
- SCSS styling implementation
- Message search functionality
- File upload support
- Dark/light theme toggle
- Message persistence across sessions
- User avatar and customization
- Mobile app version with React Native
