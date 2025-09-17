import io from 'socket.io-client';

class SocketService {
  constructor() {
    this.socket = null;
    this.isConnected = false;
  }

connect() {
  const serverUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3001';
  console.log('🔌 Attempting to connect to:', serverUrl);
  
  this.socket = io(serverUrl, {
    transports: ['websocket', 'polling'],
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
    timeout: 20000
  });

    this.socket.on('connect', () => {
      console.log('✅ Connected to server');
      this.isConnected = true;
    });

    this.socket.on('disconnect', (reason) => {
      console.log(`❌ Disconnected from server: ${reason}`);
      this.isConnected = false;
    });

    this.socket.on('connect_error', (error) => {
      console.error('⚠️ Connection error:', error);
    });

    return this.socket;
  }

  joinSession(sessionId) {
    if (this.socket?.connected) {
      this.socket.emit('join-session', sessionId);
    } else {
      console.warn('Socket not connected yet.');
    }
  }

  sendMessage(sessionId, message) {
    if (this.socket?.connected) {
      this.socket.emit('send-message', { sessionId, message });
    } else {
      console.warn('Socket not connected yet.');
    }
  }

  onBotResponse(callback) {
    if (this.socket) {
      this.socket.on('bot-response', callback);
    }
  }

  onBotTyping(callback) {
    if (this.socket) {
      this.socket.on('bot-typing', callback);
    }
  }

  offBotResponse(callback) {
    this.socket?.off('bot-response', callback);
  }

  offBotTyping(callback) {
    this.socket?.off('bot-typing', callback);
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.isConnected = false;
    }
  }
}

export default new SocketService();
