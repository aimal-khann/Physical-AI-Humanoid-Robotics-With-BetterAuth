---
id: 2
title: Amend Constitution for Auth and Architecture
stage: constitution
date: 2025-12-13
surface: agent
model: gemini
feature: none
branch: main
user: 
command: /sp.constitution
labels: [constitution, architecture, authentication]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - .specify/memory/constitution.md
tests:

---

## Prompt

/sp.constitution Project: Physical AI & Humanoid Robotics Textbook

Core Principles:
1. **Docusaurus Native:** The project must be built using standard Docusaurus 3.x structure.
2. **Visual Identity:** The site must use a primary Green theme (#2e8555).
3. **Structured Learning:** Content is divided into 6 specific modules.
4. **Secure Authentication:** The system must use **Better Auth** with a **Neon Postgres** database to manage user accounts. User profiles must track "Software Experience" and "Hardware Experience".
5. **Gated AI Access:** The RAG Chatbot is a premium feature; only authenticated users may access the "Ask AI" context menu or open the chat widget.
6. **Separation of Concerns:** Authentication logic runs on a dedicated Node.js/Express server (Port 3001), separate from the RAG Python backend.

Governance:
- Frontend Code: TypeScript (`.tsx`) or JavaScript (`.js`).
- Auth Backend: Node.js/Express with `better-auth`.
- RAG Backend: Python (`.py`).
- Markdown files must use standard Docusaurus frontmatter.

## Response snapshot

The project constitution was updated to version 0.2.0. This amendment introduced significant new architectural principles, including:
- **Secure Authentication:** Mandating Better Auth with a Neon Postgres database.
- **Gated AI Access:** Restricting the RAG chatbot to authenticated users.
- **Separation of Concerns:** Defining separate servers for authentication (Node.js/Express) and the RAG backend (Python).

The version was bumped from 0.1.0 to 0.2.0 to reflect these major changes.

## Outcome

- ✅ Impact: High. The new constitution establishes core architectural pillars for the project, affecting future development for authentication and backend services.
- 🧪 Tests: N/A. This was a documentation and governance change.
- 📁 Files: 1 file modified: `.specify/memory/constitution.md`.
- 🔁 Next prompts: The templates (`plan`, `spec`, `tasks`) need to be checked for consistency with the new constitution.
- 🧠 Reflection: The change was straightforward. The agent correctly identified the need for a minor version bump due to the addition of significant new principles. The manual fallback for PHR creation worked as expected.

## Evaluation notes (flywheel)

- Failure modes observed: The `create-phr.sh` script failed silently without creating a file.
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): Investigate why the `create-phr.sh` script is failing.
