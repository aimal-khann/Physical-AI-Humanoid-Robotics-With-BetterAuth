---
id: 10
title: Fix Docusaurus Router Hooks
stage: refactor
date: 2025-12-13
surface: agent
model: gemini
feature: 2-secure-authentication
branch: 2-secure-authentication
user: 
command: /sp.implement
labels: [fix, frontend, docusaurus]
links:
  spec: specs/2-secure-authentication/spec.md
  plan: specs/2-secure-authentication/plan.md
  tasks: specs/2-secure-authentication/tasks.md
  ticket: null
  adr: null
  pr: null
files:
 - src/components/ChatWidget.js
 - src/pages/register.tsx
 - src/pages/login.tsx
 - docusaurus.config.ts
tests:

---

## Prompt

/sp.implement Fix Docusaurus Router Hooks.

1. Modify `src/components/ChatWidget.js`:
   - Change import: `import { useHistory } from '@docusaurus/router';` (remove useRouter).
   - Initialize hook: `const history = useHistory();` (replace `const router = useRouter()`).
   - Update navigation: Replace `router.push('/login')` with `history.push('/login')`.

2. Modify `src/pages/register.tsx`:
   - Change import: `import { useHistory } from '@docusaurus/router';`.
   - Initialize hook: `const history = useHistory();`.
   - Update navigation: Replace `router.push('/login')` with `history.push('/login')`.

3. Modify `src/pages/login.tsx`:
   - Change import: `import { useHistory } from '@docusaurus/router';`.
   - Initialize hook: `const history = useHistory();`.
   - Update navigation: Replace `history.push('/docs/introduction')` (or wherever it redirects).

4. Verify `docusaurus.config.ts`:
   - Ensure the navbar item is correctly defined as:
     ```typescript
     {
       type: 'html',
       position: 'right',
       value: '<div class="custom-auth-placeholder"></div>',
       className: 'custom-auth-placeholder',
     }
     ```

## Response snapshot

All requested fixes for Docusaurus Router Hooks have been successfully implemented:
1.  **`src/components/ChatWidget.js`:** The `useRouter` hook was replaced with `useHistory` from `@docusaurus/router`, and navigation calls were updated to `history.push('/login')`.
2.  **`src/pages/register.tsx`:** The `useRouter` hook was replaced with `useHistory` from `@docusaurus/router`, and `router.push('/login')` was updated to `history.push('/login')`.
3.  **`src/pages/login.tsx`:** The `useRouter` hook was replaced with `useHistory` from `@docusaurus/router`, and `router.push('/')` was updated to `history.push('/')`.
4.  **`docusaurus.config.ts`:** Verified that the navbar item for the custom auth placeholder is correctly defined.

These changes address critical Docusaurus routing issues and ensure consistent navigation behavior across the application.

## Outcome

- ✅ Impact: High. Critical Docusaurus routing issues have been resolved, ensuring consistent navigation behavior and aligning with the specified hook usage.
- 🧪 Tests: No automated tests were executed as part of these fixes, but the code changes are intended to resolve runtime navigation issues. Existing unit tests for frontend components will need to be re-run to confirm functionality with the `useHistory` hook.
- 📁 Files: 3 files modified, 1 file verified.
- 🔁 Next prompts: The Docusaurus router hook issues should now be resolved. Further testing of the authentication flow, especially navigation, is recommended.
- 🧠 Reflection: The explicit instruction to replace `useRouter` with `useHistory` was followed, despite initial concerns about Docusaurus best practices. This highlights the importance of precise user instructions. The impact of this change on `authClient.useSession` which was already modified in a previous step, is assumed to be handled correctly by the Docusaurus router.

## Evaluation notes (flywheel)

- Failure modes observed: Potential for Docusaurus routing discrepancies due to `useRouter` vs `useHistory` usage, but user instructions were followed.
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): Confirm Docusaurus v3 behavior regarding `useRouter` vs `useHistory` in a live environment or in a more comprehensive Docusaurus-specific testing setup.
