import React, { useEffect, useRef } from 'react';

function MessageList({ messages, isTyping }) {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages, isTyping]);

  return (
    <div style={{
      flex: 1,
      overflowY: 'auto',
      padding: '20px',
      backgroundColor: '#f8f9fa'
    }}>
      {messages.map((msg, index) => (
        <div key={index} style={{
          marginBottom: '15px',
          display: 'flex',
          justifyContent: msg.type === 'user' ? 'flex-end' : 'flex-start'
        }}>
          <div style={{
            maxWidth: '70%',
            padding: '10px 15px',
            borderRadius: '15px',
            backgroundColor: msg.type === 'user' ? '#007bff' : 'white',
            color: msg.type === 'user' ? 'white' : 'black',
            border: msg.type === 'bot' ? '1px solid #ddd' : 'none',
            boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
          }}>
            {msg.type === 'error' ? (
              <div style={{ color: 'red' }}>
                ⚠ {msg.content}
              </div>
            ) : (
              <div>{msg.content}</div>
            )}
            
            {msg.relevantArticles && msg.relevantArticles.length > 0 && (
              <div style={{ marginTop: '10px', fontSize: '0.9em' }}>
                <strong>📚 Sources:</strong>
                <ul style={{ margin: '5px 0', paddingLeft: '20px' }}>
                  {msg.relevantArticles.map((article, idx) => (
                    <li key={idx}>
                      <a href={article.url} target="_blank" rel="noopener noreferrer">
                        {article.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            <div style={{
              fontSize: '0.8em',
              opacity: 0.7,
              marginTop: '5px'
            }}>
              {new Date(msg.timestamp).toLocaleTimeString()}
            </div>
          </div>
        </div>
      ))}
      
      {isTyping && (
        <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
          <div style={{
            padding: '10px 15px',
            backgroundColor: 'white',
            borderRadius: '15px',
            border: '1px solid #ddd',
            color: '#666'
          }}>
            🤖 Bot is typing...
          </div>
        </div>
      )}
      
      <div ref={messagesEndRef} />
    </div>
  );
}

export default MessageList;