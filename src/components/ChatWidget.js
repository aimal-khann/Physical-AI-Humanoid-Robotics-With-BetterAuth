import React, { useState, useRef, useEffect, useImperativeHandle, forwardRef } from 'react';
import './ChatWidget.css';
import { authClient } from '../lib/auth-client';
import { useHistory } from '@docusaurus/router';

const ChatWidget = forwardRef((props, ref) => {
    const { data: session } = authClient.useSession();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [isChatLoading, setIsChatLoading] = useState(false);
    const messagesEndRef = useRef(null);
    const history = useHistory();
    const API_URL = 'http://localhost:8000/ask';

    useImperativeHandle(ref, () => ({
        sendMessageFromOutside(text) {
            if (!session) {
                if (confirm('You must be logged in to use the AI Tutor. Go to Login page?')) {
                    history.push('/login');
                }
                return;
            }
            if (text) {
                setIsOpen(true);
                handleSendMessage(text);
            }
        }
    }));

    const scrollToBottom = () => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); };
    useEffect(() => { scrollToBottom(); }, [messages]);

    const handleToggleChat = () => {
        if (!session) {
            if (confirm('You must be logged in to use the AI Tutor. Go to Login page?')) {
                history.push('/login');
            }
            return;
        }
        setIsOpen(!isOpen);
    };

    const handleInputChange = (event) => { setInputMessage(event.target.value); };

    const handleSendMessage = async (text = inputMessage) => {
        if (!text.trim() || isChatLoading) return;
        const userMessage = { type: 'user', text: text };
        setMessages((prevMessages) => [...prevMessages, userMessage]);
        setInputMessage('');
        setIsChatLoading(true);

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query: text }),
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            const aiMessage = { type: 'ai', text: data.reply, sources: data.sources || [] };
            setMessages((prevMessages) => [...prevMessages, aiMessage]);
        } catch (error) {
            console.error('Error sending message:', error);
            setMessages((prevMessages) => [...prevMessages, { type: 'ai', text: `Error: ${error.message}. Please try again later.` }]);
        } finally {
            setIsChatLoading(false);
        }
    };

    const handleKeyDown = (event) => { if (event.key === 'Enter') handleSendMessage(); };

    return (
        <div className="chat-widget-container">
            {isOpen && (
                <div className="chat-window">
                    <div className="chat-header">
                        <span>AI Assistant</span>
                        <button className="close-button" onClick={handleToggleChat}>×</button>
                    </div>
                    <div className="chat-messages">
                        {messages.map((msg, index) => (
                            <div key={index} className={`message ${msg.type}`}>{msg.text}</div>
                        ))}
                        {isChatLoading && <div className="message ai">Typing...</div>}
                        <div ref={messagesEndRef} />
                    </div>
                    <div className="chat-input">
                        <input type="text" value={inputMessage} onChange={handleInputChange} onKeyDown={handleKeyDown} placeholder="Ask me anything..." disabled={isChatLoading} />
                        <button onClick={() => handleSendMessage()} disabled={isChatLoading}>Send</button>
                    </div>
                </div>
            )}
            <div className="chat-bubble" onClick={handleToggleChat}>
                <svg viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12zM7 9h2v2H7zm4 0h2v2h-2zm4 0h2v2h-2z" /></svg>
            </div>
        </div>
    );
});
export default ChatWidget;