import React, { useState } from 'react';

function MessageInput({ onSend, disabled }) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSend(message.trim());
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: '20px', borderTop: '1px solid #ccc' }}>
      <div style={{ display: 'flex', gap: '10px' }}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask me about the latest news..."
          disabled={disabled}
          style={{
            flex: 1,
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            fontSize: '16px'
          }}
        />
        <button 
          type="submit" 
          disabled={disabled || !message.trim()}
          style={{
            padding: '10px 20px',
            backgroundColor: disabled ? '#ccc' : '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: disabled ? 'not-allowed' : 'pointer'
          }}
        >
          Send
        </button>
      </div>
    </form>
  );
}

export default MessageInput;