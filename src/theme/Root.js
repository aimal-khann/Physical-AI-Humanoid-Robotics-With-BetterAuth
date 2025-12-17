import React, { useState, useRef, useEffect } from 'react';
import ChatWidget from '@site/src/components/ChatWidget';
import { authClient } from '../lib/auth-client';

export default function Root({children}) {
  const chatRef = useRef(null);
  const { data: session } = authClient.useSession(); // We still need this for other logic, but not for showing the button
  const [showButton, setShowButton] = useState(false);
  const [buttonPos, setButtonPos] = useState({ x: 0, y: 0 });
  const [selectedText, setSelectedText] = useState('');

  // Handle text selection
  const handleMouseUp = () => {
    const selection = window.getSelection();
    const text = selection.toString().trim();

    // UPDATE: Removed "&& session" so the button appears for everyone
    if (text) {
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      
      // Calculate position relative to the viewport + scroll
      setButtonPos({
        x: rect.left + (rect.width / 2),
        y: rect.top + window.scrollY - 45 
      });
      setSelectedText(text);
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };

  // Hide button if user clicks elsewhere or scrolls
  useEffect(() => {
    const handleClear = (e) => {
        if (e.target.id !== 'ask-ai-btn') {
            setShowButton(false);
        }
    };
    window.addEventListener('mousedown', handleClear);
    window.addEventListener('scroll', () => setShowButton(false));
    return () => {
        window.removeEventListener('mousedown', handleClear);
        window.removeEventListener('scroll', () => setShowButton(false));
    };
  }, []);

  const handleAskAI = (e) => {
    e.stopPropagation(); 
    if (chatRef.current) {
        // ChatWidget will handle the "if (!session) redirect" logic internally
        chatRef.current.sendMessageFromOutside(selectedText);
        setShowButton(false);
        window.getSelection().removeAllRanges();
    }
  };

  return (
    <div onMouseUp={handleMouseUp} style={{ minHeight: '100vh', position: 'relative' }}>
      {children}
      
      {showButton && (
        <button
          id="ask-ai-btn"
          onClick={handleAskAI}
          style={{
            position: 'absolute',
            top: buttonPos.y,
            left: buttonPos.x,
            transform: 'translateX(-50%)',
            zIndex: 2000,
            padding: '6px 16px',
            backgroundColor: 'var(--ifm-color-primary)',
            color: '#fff',
            border: 'none',
            borderRadius: '20px',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '13px',
            boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
            animation: 'fadeIn 0.2s ease-in-out'
          }}
        >
          Ask AI 🤖
        </button>
      )}
      
      <ChatWidget ref={chatRef} />
    </div>
  );
}