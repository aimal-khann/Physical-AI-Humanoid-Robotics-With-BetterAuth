---
id: 2
title: Create RAG Chatbot Stack Implementation Plan
stage: plan
date: 2025-12-09
surface: agent
model: gemini
feature: 001-rag-chatbot-stack
branch: 001-rag-chatbot-stack
user: User
command: /sp.plan
labels: [feature, plan, architecture]
links:
  spec: specs/001-rag-chatbot-stack/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/001-rag-chatbot-stack/plan.md
 - specs/001-rag-chatbot-stack/research.md
 - specs/001-rag-chatbot-stack/data-model.md
 - specs/001-rag-chatbot-stack/contracts/ask_api.yaml
 - specs/001-rag-chatbot-stack/quickstart.md
tests:
 - none
---

## Prompt

/sp.plan Create the implementation plan for the Full RAG Chatbot.

**Architecture:** Monorepo structure (Frontend + Backend in one repo).

**1. Backend Components (`rag_backend/`):**
- `requirements.txt`: `fastapi`, `uvicorn`, `qdrant-client`, `openai`, `python-dotenv`.
- `ingest.py`: Reads `../docs/*.md`, splits text, embeds via OpenAI, upserts to Qdrant collection `humanoid_ai_book`.
- `main.py`: FastAPI app with `/ask` endpoint. Uses OpenAI Agents SDK to process queries using retrieved context.

**2. Frontend Components (`src/`):**
- `components/ChatWidget.js`: React component using `forwardRef`. Handles chat state and API calls.
- `components/ChatWidget.css`: Styles for `.chat-widget` (fixed) and `.ask-ai-button` (absolute).
- `theme/Root.js`: Global wrapper listening for `mouseup`. triggers `chatWidgetRef.current.sendMessageFromOutside`.

**Data Flow:**
User Highlight -> Root.js -> ChatWidget.js -> POST /ask -> main.py -> OpenAI Agent -> Qdrant -> Answer.

## Response snapshot

The implementation plan for the RAG Chatbot Stack has been created and saved to `specs/001-rag-chatbot-stack/plan.md`. Research, data model, API contracts, and a quickstart guide have also been generated. The plan addresses all specified architectural details and is consistent with the project constitution.

## Outcome

- ✅ Impact: The implementation plan for the RAG Chatbot Stack has been successfully generated, including research, data model, API contracts, and quickstart documentation.
- 🧪 Tests: none
- 📁 Files: specs/001-rag-chatbot-stack/plan.md, specs/001-rag-chatbot-stack/research.md, specs/001-rag-chatbot-stack/data-model.md, specs/001-rag-chatbot-stack/contracts/ask_api.yaml, specs/001-rag-chatbot-stack/quickstart.md
- 🔁 Next prompts: /sp.tasks
- 🧠 Reflection: The `setup-plan.sh` and `update-agent-context.sh` scripts failed to execute correctly, likely due to `git` remote issues or script assumptions about the environment. Manual creation of `plan.md` and PHR was required.

## Evaluation notes (flywheel)

- Failure modes observed: `setup-plan.sh` and `update-agent-context.sh` scripts failed to execute correctly.
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): Investigate and fix `setup-plan.sh` and `update-agent-context.sh` scripts to handle `git` issues gracefully and provide proper output.
