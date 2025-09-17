import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import socketService from '../services/socketService';
import apiService from '../services/apiService';

function ChatWindow() {
  const [messages, setMessages] = useState([]);
  const [sessionId, setSessionId] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('connecting');

  useEffect(() => {
    initializeChat();
    return () => {
      socketService.disconnect();
    };
  }, []);

  const initializeChat = async () => {
    try {
      // Connect to socket
      const socket = socketService.connect();
      
      socket.on('connect', () => {
        setConnectionStatus('connected');
      });
      
      socket.on('disconnect', () => {
        setConnectionStatus('disconnected');
      });

      // Create new session
      const sessionData = await apiService.createSession();
      const newSessionId = sessionData.sessionId;
      setSessionId(newSessionId);
      
      // Join session room
      socketService.joinSession(newSessionId);

      // Set up message listeners
      setupMessageListeners();

      // Add welcome message
      setMessages([{
        type: 'bot',
        content: '👋 Hello! I\'m your news assistant. Ask me anything about the latest news!',
        timestamp: new Date().toISOString()
      }]);

    } catch (error) {
      console.error('Failed to initialize chat:', error);
      setConnectionStatus('error');
      setMessages([{
        type: 'error',
        content: 'Failed to connect to the chat service. Please refresh the page.',
        timestamp: new Date().toISOString()
      }]);
    }
  };

  const setupMessageListeners = () => {
    socketService.onBotResponse((data) => {
      setIsTyping(false);
      
      if (data.error) {
        setMessages(prev => [...prev, {
          type: 'error',
          content: data.error,
          timestamp: data.timestamp || new Date().toISOString()
        }]);
      } else {
        setMessages(prev => [...prev, {
          type: 'bot',
          content: data.message,
          relevantArticles: data.relevantArticles,
          timestamp: data.timestamp || new Date().toISOString()
        }]);
      }
    });

    socketService.onBotTyping((typing) => {
      setIsTyping(typing);
    });
  };

  const sendMessage = (messageContent) => {
    if (!sessionId || connectionStatus !== 'connected') {
      setMessages(prev => [...prev, {
        type: 'error',
        content: 'Not connected to server. Please refresh the page.',
        timestamp: new Date().toISOString()
      }]);
      return;
    }

    // Add user message
    const userMessage = {
      type: 'user',
      content: messageContent,
      timestamp: new Date().toISOString()
    };
    setMessages(prev => [...prev, userMessage]);

    // Send to server
    socketService.sendMessage(sessionId, messageContent);
    setIsTyping(true);
  };

  const resetSession = async () => {
    try {
      if (sessionId) {
        await apiService.clearSession(sessionId);
      }
      
      setMessages([]);
      setIsTyping(false);
      
      const sessionData = await apiService.createSession();
      const newSessionId = sessionData.sessionId;
      setSessionId(newSessionId);
      
      socketService.joinSession(newSessionId);

      setMessages([{
        type: 'bot',
        content: '🔄 Session reset! How can I help you with the latest news?',
        timestamp: new Date().toISOString()
      }]);

    } catch (error) {
      console.error('Failed to reset session:', error);
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      maxWidth: '800px',
      margin: '0 auto',
      backgroundColor: 'white',
      boxShadow: '0 0 20px rgba(0,0,0,0.1)'
    }}>
      {/* Header */}
      <div style={{
        padding: '20px',
        backgroundColor: '#007bff',
        color: 'white',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div>
          <h1 style={{ margin: 0 }}>📰 News Assistant</h1>
          <div style={{ fontSize: '0.9em', opacity: 0.9 }}>
            Status: {connectionStatus} | Session: {sessionId?.substring(0, 8)}...
          </div>
        </div>
        <button 
          onClick={resetSession}
          style={{
            backgroundColor: 'rgba(255,255,255,0.2)',
            border: '1px solid rgba(255,255,255,0.3)',
            color: 'white',
            padding: '8px 15px',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          🔄 Reset
        </button>
      </div>

      {/* Messages */}
      <MessageList messages={messages} isTyping={isTyping} />

      {/* Input */}
      <MessageInput 
        onSend={sendMessage} 
        disabled={connectionStatus !== 'connected' || isTyping}
      />
    </div>
  );
}

export default ChatWindow;