# Implementation Plan: RAG Chatbot Stack

**Branch**: `001-rag-chatbot-stack` | **Date**: 2025-12-09 | **Spec**: specs/001-rag-chatbot-stack/spec.md
**Input**: Feature specification from `/specs/001-rag-chatbot-stack/spec.md`

**Note**: This template is filled in by the `/sp.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

This feature implements a complete Retrieval Augmented Generation (RAG) system, providing an AI chatbot for Docusaurus documentation. It consists of a Python FastAPI backend for document ingestion and query processing, and a React frontend widget for user interaction, including a floating chat bubble and contextual "Ask AI" button triggered by text selection. The system will leverage OpenAI for embeddings and GPT-4o for answers, with Qdrant as the vector database.

## Technical Context

**Language/Version**: Python 3.11 for Backend, JavaScript/TypeScript for Frontend (React)
**Primary Dependencies**: FastAPI, Uvicorn, Qdrant Client, OpenAI (Python SDK), React, Docusaurus
**Storage**: Qdrant (vector database)
**Testing**: NEEDS CLARIFICATION (will assume standard testing frameworks for Python and JavaScript initially)
**Target Platform**: Web (Docusaurus)
**Project Type**: Web application (Frontend + Backend in one monorepo)
**Performance Goals**:
    - Backend ingestion script processes typical documentation size within 30 minutes.
    - `/ask` API endpoint responds to queries within an average of 5 seconds.
    - "Ask AI" button appears within 1 second of text selection.
**Constraints**:
    - Use `localhost` for development.
    - Backend answers based *only* on retrieved context.
**Scale/Scope**: RAG chatbot for Docusaurus documentation, handling typical website traffic and content volume.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

**Project Constitution: Physical AI & Humanoid Robotics Textbook**

### 1. Core Principles

-   **1.1 Docusaurus Native:** The project MUST be built using standard Docusaurus 3.x structure.
    *   **Evaluation:** ✅ PASS. The feature integrates with Docusaurus for frontend and documentation.
-   **1.2 Visual Identity:** The site MUST use a primary Green theme (#2e8555).
    *   **Evaluation:** ✅ PASS. Frontend styling will adhere to this.
-   **1.3 Structured Learning:** Content IS divided into 6 specific modules.
    *   **Evaluation:** ✅ PASS. The RAG system will ingest this structured content.
-   **1.4 Custom Navigation:** Homepage MUST use a custom card layout.
    *   **Evaluation:** ✅ PASS. This feature does not impact homepage layout.
-   **1.5 Sidebar Control:** Sidebar MUST strictly follow the defined chapter order.
    *   **Evaluation:** ✅ PASS. This feature does not impact sidebar order.
-   **1.6 AI-Enhanced Learning:** The textbook MUST integrate an interactive RAG Chatbot that answers questions based *only* on the book's content, utilizing a floating UI and "Ask AI" context menu.
    *   **Evaluation:** ✅ PASS. This feature directly implements this principle.

### 2. Governance

-   **2.1 Code Standards**
    *   **2.1.1 Frontend:** Code MUST be written in TypeScript (`.ts`, `.tsx`) or JavaScript (`.js`) for Frontend.
        *   **Evaluation:** ✅ PASS. Frontend components will be written in JavaScript (`.js`).
    *   **2.1.2 Backend:** Backend code MUST be written in Python (`.py`).
        *   **Evaluation:** ✅ PASS. Backend components will be written in Python (`.py`).
    *   **2.1.3 Documentation:** Markdown files MUST use standard Docusaurus frontmatter.
        *   **Evaluation:** ✅ PASS. The ingestion script will process existing Docusaurus Markdown.

## Project Structure

### Documentation (this feature)

```text
specs/001-rag-chatbot-stack/
├── plan.md              # This file (/sp.plan command output)
├── research.md          # Phase 0 output (/sp.plan command)
├── data-model.md        # Phase 1 output (/sp.plan command)
├── quickstart.md        # Phase 1 output (/sp.plan command)
├── contracts/           # Phase 1 output (/sp.plan command)
└── tasks.md             # Phase 2 output (/sp.tasks command - NOT created by /sp.plan)
```

### Source Code (repository root)

```text
# Option 2: Web application (when "frontend" + "backend" detected)
backend/rag_backend/
├── requirements.txt
├── ingest.py
└── main.py

src/components/
├── ChatWidget.js
├── ChatWidget.css
└── Root.js

```

**Structure Decision**: The "Web application" structure (Option 2) is chosen to separate backend and frontend components within the monorepo. The backend code will reside in `backend/rag_backend/` and frontend components will be in `src/components/`.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|---|---|---|
| N/A | N/A | N/A |
