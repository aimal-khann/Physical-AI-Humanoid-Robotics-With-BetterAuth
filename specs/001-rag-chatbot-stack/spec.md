# Feature Specification: RAG Chatbot Stack

**Feature Branch**: `001-rag-chatbot-stack`  
**Created**: 2025-12-09  
**Status**: Draft  
**Input**: User description: "Create the Full RAG Chatbot Stack (Backend + Frontend). **Feature Description:** A complete RAG system consisting of a Python backend (FastAPI) and a React frontend widget for Docusaurus. **User Story 1: Backend Infrastructure (rag_backend/)** - **Tech Stack:** Python 3.11, FastAPI, Uvicorn, Qdrant Client, OpenAI (Agents + Embeddings). - **Ingestion (`ingest.py`):** A script that reads local Markdown files from `../docs/`, chunks them, creates embeddings using OpenAI (`text-embedding-3-small`), and uploads them to Qdrant. - **API (`main.py`): A FastAPI server with a `/ask` endpoint. It receives a query, searches Qdrant, and uses OpenAI GPT-4o to answer based *only* on the retrieved context. **User Story 2: Frontend Integration (src/components/)** - **Widget (`ChatWidget.js`):** A floating chat bubble (bottom-right). Opens a chat window. Sends POST requests to `http://localhost:8000/ask`. Displays the reply and sources. **Highlight Trigger (`Root.js`):** Detects text selection on the page. Shows a custom "Ask AI" button near the selection. Clicking it opens the widget with the text pre-filled. **Constraints (SKIP CLARIFICATION):** - **Do not ask clarification questions.** - Use standard defaults for error handling and styling. - Assume `localhost` for development."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Backend Infrastructure Setup (Priority: P1)

As a system administrator, I need to ingest the Docusaurus documentation into a vector database (Qdrant) so that the RAG chatbot has a knowledge base to draw from.

**Why this priority**: Essential prerequisite for the chatbot functionality.

**Independent Test**: The `ingest.py` script can be run, and Qdrant can be queried to confirm the embeddings and document chunks are stored correctly.

**Acceptance Scenarios**:

1.  **Given** Docusaurus Markdown files exist in `../docs/`, **When** the `ingest.py` script is executed, **Then** document chunks and their OpenAI embeddings are successfully uploaded to Qdrant.
2.  **Given** Qdrant contains indexed document chunks, **When** the FastAPI `/ask` endpoint receives a query, **Then** it retrieves relevant context from Qdrant.
3.  **Given** a query and retrieved context, **When** the FastAPI `/ask` endpoint uses OpenAI GPT-4o, **Then** it returns an answer based *only* on the provided context.

---

### User Story 2 - Frontend Chat Widget (Priority: P1)

As a user browsing the Docusaurus site, I want to interact with a floating chat widget to ask questions and receive answers based on the site's content.

**Why this priority**: Primary user interaction method for the RAG chatbot.

**Independent Test**: The `ChatWidget.js` can be integrated into a Docusaurus page, and a user can ask a question and receive a reply.

**Acceptance Scenarios**:

1.  **Given** the user is on any Docusaurus page, **When** the page loads, **Then** a floating chat bubble is visible in the bottom-right corner.
2.  **Given** the chat bubble is visible, **When** the user clicks the bubble, **Then** a chat window opens.
3.  **Given** the chat window is open and the user types a question and submits it, **When** the `ChatWidget.js` sends a POST request to `http://localhost:8000/ask`, **Then** the chat window displays the reply and relevant sources.

---

### User Story 3 - "Ask AI" Context Menu (Priority: P2)

As a user browsing the Docusaurus site, I want to select text on a page and ask the AI chatbot a question directly related to my selection.

**Why this priority**: Enhances user experience by providing contextual AI assistance.

**Independent Test**: A user can select text on a page, click the "Ask AI" button, and see the chat widget open with the selected text pre-filled.

**Acceptance Scenarios**:

1.  **Given** the user selects text on any Docusaurus page, **When** the selection is made, **Then** a custom "Ask AI" button appears near the selected text.
2.  **Given** the "Ask AI" button is visible and the user clicks it, **When** the `ChatWidget.js` is invoked, **Then** the chat window opens with the selected text pre-filled as a query.

## Edge Cases

- What happens when the RAG system cannot find relevant information in the Qdrant database for a given query? The API should indicate that no relevant context was found, and GPT-4o should respond accordingly (e.g., "I'm sorry, I don't have enough information on that topic from the provided documents.").
- How does the system handle an empty query from the user? The API should return an error or a message indicating an empty query, and the frontend should display this gracefully.
- What happens if the backend API is unreachable? The frontend should display a user-friendly error message.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The system MUST provide a Python FastAPI backend for RAG capabilities.
- **FR-002**: The backend MUST include an ingestion script (`ingest.py`) to process Markdown files.
- **FR-003**: The ingestion script MUST chunk Markdown files, create embeddings using OpenAI (`text-embedding-3-small`), and upload them to Qdrant.
- **FR-004**: The backend MUST expose a `/ask` endpoint via FastAPI (`main.py`).
- **FR-005**: The `/ask` endpoint MUST receive a user query, retrieve relevant context from Qdrant, and use OpenAI GPT-4o to answer based *only* on the retrieved context.
- **FR-006**: The system MUST provide a React-based chat widget (`ChatWidget.js`) for Docusaurus frontend integration.
- **FR-007**: The chat widget MUST appear as a floating bubble in the bottom-right corner of Docusaurus pages.
- **FR-008**: The chat widget MUST open a chat window when clicked.
- **FR-009**: The chat widget MUST send user queries to `http://localhost:8000/ask` via POST requests.
- **FR-010**: The chat widget MUST display the AI's reply and any source references.
- **FR-011**: The system MUST detect text selection on Docusaurus pages (`Root.js`).
- **FR-012**: Upon text selection, the system MUST display a custom "Ask AI" button near the selection.
- **FR-013**: Clicking the "Ask AI" button MUST open the chat widget with the selected text pre-filled as a query.

### Key Entities

-   **Document Chunk**: A segment of text from a Docusaurus Markdown file, along with its embedding.
-   **User Query**: Text input provided by the user to the chatbot.
-   **AI Response**: The answer generated by OpenAI GPT-4o, including relevant source documents.

## Success Criteria *(mandatory)*

### Measurable Outcomes

-   **SC-001**: The backend ingestion script successfully processes all Markdown files in `../docs/` and uploads them to Qdrant within 30 minutes for a typical documentation size.
-   **SC-002**: The `/ask` API endpoint responds to queries with relevant answers (based *only* on context) within an average of 5 seconds.
-   **SC-003**: The chat widget correctly displays AI responses and sources for 95% of valid user queries.
-   **SC-004**: The "Ask AI" button appears reliably within 1 second of text selection and successfully pre-fills the chat widget for 100% of selections.
-   **SC-005**: Users can successfully ask questions and receive answers from the RAG chatbot on the Docusaurus site.