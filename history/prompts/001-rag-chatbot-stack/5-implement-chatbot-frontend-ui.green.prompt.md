---
id: 5
title: Implement Chatbot Frontend UI
stage: green
date: 2025-12-09
surface: agent
model: gemini
feature: 001-rag-chatbot-stack
branch: 001-rag-chatbot-stack
user: User
command: /sp.implement
labels: [feature, implement, frontend]
links:
  spec: specs/001-rag-chatbot-stack/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - src/components/ChatWidget.css
 - src/components/ChatWidget.js
 - src/theme/Root.js
 - specs/001-rag-chatbot-stack/tasks.md
tests:
 - none
---

## Prompt

/sp.implement Implement the Chatbot Frontend UI.

1. **Create `src/components/ChatWidget.css`**:
   - `.chat-widget`: Fixed position (bottom: 20px, right: 20px), z-index 9999.
   - `.chat-window`: Width 350px, height 450px, white background, shadow.
   - `.ask-ai-button`: Absolute position, z-index 10000, primary color (`#2e8555`).

2. **Create `src/components/ChatWidget.js`**:
   - Use `forwardRef` to expose `sendMessageFromOutside(text)`.
   - State: `isOpen`, `messages` (list), `isLoading`.
   - **Network:** Function `handleSendMessage` POSTs JSON to `http://localhost:8000/ask`.
   - **Response:** Display `reply` text and list `sources`.

3. **Create `src/theme/Root.js`**:
   - Import `ChatWidget` and use `useRef`.
   - Add global `mouseup` listener to detect text selection.
   - If text is selected, calculate coordinates (`rect.top - 40`, `rect.right - 50`) and show the "Ask AI" button.
   - On click, call `chatWidgetRef.current.sendMessageFromOutside(selectedText)`.

## Response snapshot

The frontend UI components (`ChatWidget.css`, `ChatWidget.js`, `Root.js`) for the RAG chatbot have been successfully created and implemented according to the provided instructions. The ChatWidget provides the main chat interface, and the Root.js integrates it globally, including the text selection "Ask AI" feature. Relevant tasks in `specs/001-rag-chatbot-stack/tasks.md` have been marked as complete.

## Outcome

- ✅ Impact: The core frontend UI for the RAG Chatbot Stack is now in place, including the floating chat widget and the contextual "Ask AI" feature.
- 🧪 Tests: none
- 📁 Files: src/components/ChatWidget.css, src/components/ChatWidget.js, src/theme/Root.js, specs/001-rag-chatbot-stack/tasks.md
- 🔁 Next prompts: Continue with testing or remaining implementation tasks.
- 🧠 Reflection: Successfully implemented the frontend components as specified.

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): none
