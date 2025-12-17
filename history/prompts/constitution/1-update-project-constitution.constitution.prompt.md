---
id: 1
title: Update Project Constitution with New Principles and Governance
stage: constitution
date: 2025-12-09
surface: agent
model: gemini
feature: none
branch: main
user: User
command: /sp.constitution
labels: [constitution, documentation]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - .specify/memory/constitution.md
tests:
 - none
---

## Prompt

/sp.constitution Project: Physical AI & Humanoid Robotics Textbook

Core Principles:
1. **Docusaurus Native:** The project must be built using standard Docusaurus 3.x structure.
2. **Visual Identity:** The site must use a primary Green theme (#2e8555).
3. **Structured Learning:** Content is divided into 6 specific modules.
4. **Custom Navigation:** Homepage must use a custom card layout.
5. **Sidebar Control:** Sidebar must strictly follow the defined chapter order.
6. **AI-Enhanced Learning:** The textbook must integrate an interactive RAG Chatbot that answers questions based *only* on the book's content, utilizing a floating UI and "Ask AI" context menu.

Governance:
- Code must be written in TypeScript (`.ts`, `.tsx`) or JavaScript (`.js`) for Frontend.
- Backend code must be written in Python (`.py`).
- Markdown files must use standard Docusaurus frontmatter.

## Response snapshot

The project constitution was successfully updated to version 0.1.0, incorporating new core principles and detailed governance rules. The updated constitution file is located at `.specify/memory/constitution.md`. Manual follow-up is required for several template and documentation files to ensure consistency.

## Outcome

- ✅ Impact: The project constitution has been updated to reflect the new principles.
- 🧪 Tests: none
- 📁 Files:
 - .specify/memory/constitution.md

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): null
