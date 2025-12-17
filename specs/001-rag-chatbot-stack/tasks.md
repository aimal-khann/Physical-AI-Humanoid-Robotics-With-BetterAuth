# Actionable Tasks: RAG Chatbot Stack

**Branch**: `001-rag-chatbot-stack` | **Date**: 2025-12-09 | **Spec**: specs/001-rag-chatbot-stack/spec.md
**Input**: Feature specification from `specs/001-rag-chatbot-stack/spec.md`, implementation plan from `specs/001-rag-chatbot-stack/plan.md`, research from `specs/001-rag-chatbot-stack/research.md`, data model from `specs/001-rag-chatbot-stack/data-model.md`, and contracts from `specs/001-rag-chatbot-stack/contracts/ask_api.yaml`.

## Summary

This document outlines the detailed, dependency-ordered tasks required to implement the Full RAG Chatbot Stack. Tasks are organized into phases, prioritizing foundational elements and user stories for incremental delivery.

## Phase 1: Setup

*Goal*: Initialize the project environment and prepare for core development.

-   [ ] T001 Initialize Python virtual environment in `backend/rag_backend/`
-   [x] T002 Create `backend/rag_backend/requirements.txt` with initial dependencies (`fastapi`, `uvicorn`, `qdrant-client`, `openai`, `python-dotenv`, `pytest`, `httpx`)
-   [x] T003 Create `backend/rag_backend/.env` for environment variables (e.g., `OPENAI_API_KEY`, `QDRANT_HOST`)
-   [ ] T004 Configure `.gitignore` to ignore virtual environment and `.env` in `backend/rag_backend/`

## Phase 2: Foundational (Backend Core)

*Goal*: Establish the basic backend API and ingestion script structure.

-   [x] T005 [P] Create `backend/rag_backend/ingest.py` file
-   [x] T006 [P] Create `backend/rag_backend/main.py` file
-   [ ] T007 [P] Implement basic FastAPI app structure and startup logic in `backend/rag_backend/main.py`
-   [ ] T008 [P] Setup basic logging in `backend/rag_backend/main.py` and `ingest.py`
-   [x] T009 [P] Implement basic error handling and exception middleware in `backend/rag_backend/main.py`

## Phase 3: User Story 1 - Backend Infrastructure Setup (P1)

*Goal*: Enable document ingestion and the core RAG `/ask` API endpoint.

*Independent Test*: The `ingest.py` script can successfully process Markdown files and populate Qdrant. The `/ask` endpoint can receive a query and return an AI response based on ingested data.

-   [x] T010 [P] [US1] Implement Markdown file loading and text chunking in `backend/rag_backend/ingest.py` (reads `../../docs/*.md`)
-   [x] T011 [P] [US1] Integrate OpenAI embeddings (`text-embedding-3-small`) for text chunks in `backend/rag_backend/ingest.py`
-   [x] T012 [P] [US1] Implement Qdrant client initialization and collection management (e.g., `humanoid_ai_book`) in `backend/rag_backend/ingest.py`
-   [x] T013 [US1] Implement upsert logic to Qdrant for document chunks and their embeddings in `backend/rag_backend/ingest.py`
-   [ ] T014 [US1] Create `pytest` test for `ingest.py` to ensure successful ingestion and Qdrant population in `backend/rag_backend/tests/test_ingest.py`
-   [x] T015 [US1] Implement `/ask` endpoint in `backend/rag_backend/main.py` with request/response models based on `ask_api.yaml`
-   [x] T016 [P] [US1] Implement Qdrant search logic to retrieve relevant context for a given query in `backend/rag_backend/main.py`
-   [x] T017 [P] [US1] Integrate OpenAI GPT-4o for answering based *only* on retrieved context in `backend/rag_backend/main.py`
-   [ ] T018 [US1] Create `pytest` tests for `/ask` endpoint (context retrieval, answer generation, context adherence) in `backend/rag_backend/tests/test_main.py`

## Phase 4: User Story 2 - Frontend Chat Widget (P1)

*Goal*: Develop and integrate the floating chat widget, allowing users to ask questions.

*Independent Test*: The chat widget is visible, opens a chat window, sends queries to the backend, and displays replies with sources.

-   [x] T019 [P] [US2] Create `src/components/ChatWidget.css` for floating UI bubble and chat window styling
-   [x] T020 [P] [US2] Create `src/components/ChatWidget.js` as a React component using `forwardRef`
-   [x] T021 [US2] Implement floating chat bubble UI and its toggle state management in `src/components/ChatWidget.js`
-   [x] T022 [US2] Implement chat window UI, input field, and message display in `src/components/ChatWidget.js`
-   [x] T023 [US2] Implement API call to `http://localhost:8000/ask` (POST) and state updates for displaying AI response in `src/components/ChatWidget.js`
-   [x] T024 [US2] Implement rendering of source references from the API response within the chat UI in `src/components/ChatWidget.js`
-   [ ] T025 [P] [US2] Create `@testing-library/react` tests for `ChatWidget.js` (rendering, user interaction, API call simulation, response display) in `src/components/__tests__/ChatWidget.test.js`
-   [x] T026 [US2] Integrate `ChatWidget.js` into the Docusaurus layout (e.g., using `docusaurus.config.js` or a custom theme component)

## Phase 5: User Story 3 - "Ask AI" Context Menu (P2)

*Goal*: Implement the contextual "Ask AI" button triggered by text selection.

*Independent Test*: Selecting text on a Docusaurus page displays the "Ask AI" button, and clicking it pre-fills the chat widget.

-   [x] T027 [P] [US3] Create `src/theme/Root.js` for a global Docusaurus wrapper component
-   [x] T028 [US3] Implement text selection detection using a `mouseup` event listener within `src/theme/Root.js`
-   [x] T029 [US3] Implement logic to display a custom "Ask AI" button near the selected text in `src/theme/Root.js`
-   [x] T030 [US3] Implement the "Ask AI" button click handler to open `ChatWidget` and pass the selected text as a pre-filled query, potentially using `chatWidgetRef.current.sendMessageFromOutside()` in `src/theme/Root.js`
-   [ ] T031 [P] [US3] Create `@testing-library/react` tests for `Root.js` (text selection event, button visibility, widget invocation) in `src/theme/__tests__/Root.test.js`

## Final Phase: Polish & Cross-Cutting Concerns

*Goal*: Refine the feature, improve robustness, and ensure maintainability.

-   [x] T032 Review and refine UI/UX across all components for consistency and user experience (`ChatWidget.css`, `ChatWidget.js`, `Root.js`)
-   [ ] T033 Implement comprehensive logging, monitoring, and error reporting for backend services (`main.py`, `ingest.py`)
-   [ ] T034 Externalize configuration for backend (e.g., Qdrant URL, OpenAI model names, collection name) into `backend/rag_backend/.env` and load via `python-dotenv`
-   [ ] T035 Update `quickstart.md` with concrete instructions and paths for setting up and running the full stack
-   [ ] T036 Write a dedicated `README.md` for `backend/rag_backend/` detailing its setup, usage, and API
-   [ ] T037 Conduct end-to-end testing of the entire RAG chatbot stack, verifying all user stories.

## Dependency Graph (User Story Completion Order)

The phases are designed to be largely sequential, building upon completed foundational work.
1.  **Phase 1 (Setup)** must be completed before starting any development.
2.  **Phase 2 (Foundational Backend Core)** provides the basic infrastructure for the backend.
3.  **Phase 3 (User Story 1: Backend Infrastructure Setup)** depends on Phase 2, as it implements the core RAG logic.
4.  **Phase 4 (User Story 2: Frontend Chat Widget)** depends on Phase 3, as the frontend needs a functional backend API to interact with.
5.  **Phase 5 (User Story 3: "Ask AI" Context Menu)** depends on Phase 4, as it integrates with the existing chat widget.
6.  **Final Phase (Polish & Cross-Cutting Concerns)** can begin once all user stories are functionally complete.

## Parallel Execution Examples

-   **Initial Setup**: After initial project setup (T001-T004) is complete, tasks T005-T009 (creating core backend files and basic structure) can be initiated in parallel.
-   **User Story 1 (Backend)**: Once backend core is ready, tasks T010-T012 (chunking, embeddings, Qdrant setup) can be worked on concurrently.
-   **User Story 2 (Frontend)**: While backend development is underway, T019-T020 (CSS and JS component creation) can proceed in parallel, assuming the API contract is stable.
-   **User Story 3 (Context Menu)**: T027 (Root.js creation) can be started in parallel with the main widget development.

## Implementation Strategy

-   **MVP First**: The primary focus will be on completing User Story 1 (Backend Infrastructure Setup) and User Story 2 (Frontend Chat Widget) first. This delivers a core, functional RAG chatbot capable of ingesting data and answering user questions via the floating widget.
-   **Incremental Delivery**: User Story 3 ("Ask AI" Context Menu) will be developed and integrated as a subsequent increment, enhancing the user experience with contextual queries.
-   **Test-Driven Development (TDD)**: As identified in the `research.md`, `pytest`/`httpx` for backend and `@testing-library/react`/`jest` for frontend will be used to ensure quality and correctness at each step.
