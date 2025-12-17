---
id: 17
title: Show 'Ask AI' button to visitors
stage: polish
date: 2025-12-13
surface: agent
model: gemini
feature: 2-secure-authentication
branch: 2-secure-authentication
user: 
command: /sp.implement
labels: [polish, frontend, ui, gating]
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

/sp.implement Polish Phase 3: Show 'Ask AI' button to visitors.

1. Overwrite `src/theme/Root.js` to allow button visibility for non-logged-in users:
   - In `handleMouseUp`, change the condition `if (text && session)` to simply `if (text)`.
   - The rest of the logic remains the same (ChatWidget handles the auth enforcement upon click).
   - Content:
     ```javascript
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
     ```

## Response snapshot

"Polish Phase 3: Show 'Ask AI' button to visitors" was successfully implemented.
1.  **`src/theme/Root.js`:** Updated to show the 'Ask AI' button to all visitors when text is selected, removing the session check for button visibility. Authentication enforcement is now solely handled by the `ChatWidget` component upon interaction.
2.  **`specs/2-secure-authentication/tasks.md`:** Task T033 was marked as complete.

## Outcome

- ✅ Impact: High. The 'Ask AI' button is now more discoverable, improving user experience by allowing all users to see the feature. Authentication is still enforced at the point of interaction with the chatbot.
- 🧪 Tests: No new automated tests were created for this specific polish. Manual verification of the text selection, button display for both authenticated and unauthenticated users, and subsequent AI interaction is recommended.
- 📁 Files: 1 file modified (`src/theme/Root.js`), 1 file modified (`specs/2-secure-authentication/tasks.md`).
- 🔁 Next prompts: All tasks for the Secure Authentication feature are now complete. The feature is ready for final integration testing and deployment.
- 🧠 Reflection: The change effectively separates the concern of button visibility from authentication enforcement, making the UI more user-friendly while maintaining security.

## Evaluation notes (flywheel)

- Failure modes observed: None in this phase.
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): Conduct comprehensive manual and automated integration testing of the full authentication flow.
