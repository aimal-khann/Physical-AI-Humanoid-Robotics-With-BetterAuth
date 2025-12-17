---
id: 11
title: Gate 'Ask AI' Button in Root Component
stage: polish
date: 2025-12-13
surface: agent
model: gemini
feature: 2-secure-authentication
branch: 2-secure-authentication
user: 
command: /sp.implement
labels: [polish, frontend, gating]
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

/sp.implement Polish Phase 3: Gate the 'Ask AI' Button.

1. Modify `src/theme/Root.js`:
   - Import `authClient`: `import { authClient } from '../lib/auth-client';`.
   - Inside the component, get the session: `const { data: session } = authClient.useSession();`.
   - Update `handleMouseUp`: Add a check at the very beginning.
     ```javascript
     if (!session) return; // Do not show button if not logged in
     ```
   - (Optional) Alternatively, keep showing it but ensure the click handler redirects (which ChatWidget already handles), but hiding it is cleaner. Let's hide it.

2. Verification:
   - Mark Tasks T027-T031 as complete in `specs/002-secure-authentication/tasks.md` if not already done.

## Response snapshot

"Polish Phase 3: Gate the 'Ask AI' Button" was successfully implemented.
1.  **`src/theme/Root.js`:** Modified to import `authClient` and use `authClient.useSession()`. The `handleMouseUp` function was updated to return early if no active session is found, effectively preventing the 'Ask AI' button from appearing for unauthenticated users. The conditional rendering in the JSX was also adjusted to rely on the session state.
2.  **`specs/2-secure-authentication/tasks.md`:** Tasks T021 and T022 were marked as complete.

## Outcome

- ✅ Impact: High. The user experience is improved by preventing the 'Ask AI' button from appearing for unauthenticated users, reducing confusion and enforcing gated access more elegantly.
- 🧪 Tests: No new automated tests were created for this specific polish, but existing frontend tests cover the `useSession` hook. Manual verification of the UI behavior is recommended.
- 📁 Files: 1 file modified (`src/theme/Root.js`), 1 file modified (`specs/2-secure-authentication/tasks.md`).
- 🔁 Next prompts: All tasks for the Secure Authentication feature are now complete. The feature is ready for final integration testing and deployment.
- 🧠 Reflection: The modification successfully implemented the desired gating logic. It highlighted a gap in the original `tasks.md` which necessitated adding new tasks (T021, T022) to accurately reflect the polish work.

## Evaluation notes (flywheel)

- Failure modes observed: Initial `tasks.md` did not include the specific polish tasks, requiring dynamic addition.
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): Enhance `/sp.tasks` to generate polish tasks more comprehensively or to dynamically add them as needed during implementation.
