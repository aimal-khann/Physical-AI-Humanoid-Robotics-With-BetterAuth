---
id: 12
title: Fix ChatWidget Layout and Add Dark Mode Support
stage: green
date: 2025-12-09
surface: agent
model: gemini
feature: 001-rag-chatbot-stack
branch: 001-rag-chatbot-stack
user: User
command: /sp.implement
labels: [feature, implement, ui]
links:
  spec: specs/001-rag-chatbot-stack/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - src/components/ChatWidget.css
 - specs/001-rag-chatbot-stack/tasks.md
tests:
 - none
---

## Prompt

/sp.implement Fix ChatWidget layout and add Dark Mode support.

**Update `src/components/ChatWidget.css`** with this exact content:

```css
/* Fixed Position for the Chat Widget */
.chat-widget {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 9999;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}

/* 🟢 Chat Button (Floating Bubble) */
.chat-button {
  background-color: var(--ifm-color-primary);
  color: white;
  border: none;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  font-size: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  transition: transform 0.2s;
}

.chat-button:hover {
  transform: scale(1.05);
}

/* 🟢 Chat Window (The Box) */
.chat-window {
  position: absolute;
  bottom: 75px;
  right: 0;
  width: 350px;
  height: 500px;
  background-color: #ffffff; /* Default Light Mode */
  color: #333333;            /* Force Dark Text in Light Mode */
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid #e0e0e0;
}

/* 🌑 DARK MODE OVERRIDES */
[data-theme='dark'] .chat-window {
  background-color: #1b1b1d;
  color: #e0e0e0;
  border: 1px solid #444;
}

/* Header */
.chat-header {
  background-color: var(--ifm-color-primary);
  color: white;
  padding: 12px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
}

.close-button {
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
  line-height: 1;
}

/* 🟢 Messages Area (Fixes the Sequence Issue) */
.chat-messages {
  flex-grow: 1;
  padding: 16px;
  overflow-y: auto;
  display: flex;             /* REQUIRED for column layout */
  flex-direction: column;    /* Stack messages vertically */
  gap: 12px;                 /* Space between messages */
  background-color: #f8f9fa;
}

[data-theme='dark'] .chat-messages {
  background-color: #121212;
}

/* Message Bubbles */
.chat-msg {
  padding: 10px 14px;
  border-radius: 12px;
  max-width: 85%;
  font-size: 14px;
  line-height: 1.5;
  word-wrap: break-word;
  position: relative;
  text-align: left; /* Ensure text inside starts from left */
}

/* 👤 User Message (Right) */
.chat-msg.user {
  align-self: flex-end;      /* Push to right */
  background-color: var(--ifm-color-primary); /* Green */
  color: white;
  border-bottom-right-radius: 2px;
}

/* 🤖 Bot Message (Left) */
.chat-msg.bot {
  align-self: flex-start;    /* Push to left */
  background-color: #e9ecef;
  color: #212529;            /* Dark text for readability */
  border-bottom-left-radius: 2px;
}

/* Dark Mode Bot Message */
[data-theme='dark'] .chat-msg.bot {
  background-color: #333333;
  color: #e0e0e0;
}

/* Input Area */
.chat-input {
  display: flex;
  padding: 12px;
  border-top: 1px solid #e0e0e0;
  background-color: white;
}

[data-theme='dark'] .chat-input {
  background-color: #1b1b1d;
  border-top: 1px solid #444;
}

.chat-input input {
  flex-grow: 1;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 20px;
  margin-right: 8px;
  outline: none;
  background-color: #fff;
  color: #333;
}

[data-theme='dark'] .chat-input input {
  background-color: #2c2c2e;
  border: 1px solid #555;
  color: #fff;
}

.chat-input button {
  background-color: var(--ifm-color-primary);
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 20px;
  cursor: pointer;
  font-weight: bold;
}

.chat-input button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Ask AI Button (Highlight Context) */
.ask-ai-button {
  background-color: var(--ifm-color-primary);
  color: white;
  border: none;
  border-radius: 4px;
  padding: 6px 12px;
  font-size: 13px;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0,0,0,0.2);
  z-index: 10000;
  animation: fadeIn 0.2s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(5px); }
  to { opacity: 1; transform: translateY(0); }
}