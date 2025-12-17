---
id: 16
title: Restore 'Highlight to Ask' Feature
stage: polish
date: 2025-12-13
surface: agent
model: gemini
feature: 2-secure-authentication
branch: 2-secure-authentication
user: 
command: /sp.implement
labels: [polish, frontend, ui, feature]
links:
  spec: specs/2-secure-authentication/spec.md
  plan: specs/2-secure-authentication/plan.md
  tasks: specs/2-secure-authentication/tasks.md
  ticket: null
  adr: null
  pr: null
files:
 - src/theme/Root.js
 - specs/2-secure-authentication/tasks.md
tests:

---

## Prompt

/sp.implement Polish Phase 3: Restore 'Highlight to Ask' Feature.

1. Overwrite `src/theme/Root.js` with the complete interaction logic:
   - Import `useState` and `useEffect` alongside `useRef`.
   - Implement `handleMouseUp` to calculate selection coordinates.
   - Render a floating "Ask AI" button when text is selected and user is logged in.
   - Content:
     ```javascript
     import React, { useState, useRef, useEffect } from 'react';
     import ChatWidget from '@site/src/components/ChatWidget';
     import { authClient } from '../lib/auth-client';

     export default function Root({children}) {
       const chatRef = useRef(null);
       const { data: session } = authClient.useSession();
       const [showButton, setShowButton] = useState(false);
       const [buttonPos, setButtonPos] = useState({ x: 0, y: 0 });
       const [selectedText, setSelectedText] = useState('');

       // Handle text selection
       const handleMouseUp = () => {
         const selection = window.getSelection();
         const text = selection.toString().trim();

         if (text && session) {
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
         e.stopPropagation(); // Prevent clearing selection immediately
         if (chatRef.current) {
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
     ```

## Response snapshot

"Polish Phase 3: Restore 'Highlight to Ask' Feature" was successfully implemented.
1.  **`src/theme/Root.js`:** Updated to include the logic for detecting text selection, displaying a floating "Ask AI" button, and handling its interaction. The feature is now conditionally active only for authenticated users, with proper positioning and hiding mechanisms.
2.  **`specs/2-secure-authentication/tasks.md`:** Task T032 was marked as complete.

## Outcome

- ✅ Impact: High. The 'Highlight to Ask' feature, a key UX enhancement, has been successfully restored and integrated, providing a more intuitive way for authenticated users to interact with the AI assistant.
- 🧪 Tests: No new automated tests were created for this specific polish. Manual verification of the text selection, button display, and AI interaction is recommended.
- 📁 Files: 1 file modified (`src/theme/Root.js`), 1 file modified (`specs/2-secure-authentication/tasks.md`).
- 🔁 Next prompts: All tasks for the Secure Authentication feature are now complete. The feature is ready for final integration testing and deployment.
- 🧠 Reflection: The detailed code provided in the prompt simplified the implementation significantly. The changes ensure the feature is not only functional but also gracefully handled for authenticated and unauthenticated states.

## Evaluation notes (flywheel)

- Failure modes observed: None in this phase.
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): Conduct comprehensive manual and automated integration testing of the full authentication flow.
