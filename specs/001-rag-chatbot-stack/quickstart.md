# Quickstart: RAG Chatbot Stack

This guide provides steps to quickly set up and run the RAG Chatbot Stack, including its Python FastAPI backend and React frontend integrated with Docusaurus.

## Prerequisites

-   Python 3.11+
-   Node.js (LTS version)
-   npm or yarn
-   Git
-   OpenAI API Key (set as an environment variable `OPENAI_API_KEY`)
-   Qdrant instance (local or remote, assuming local for development)

## 1. Backend Setup (`backend/rag_backend/`)

1.  **Navigate to the backend directory**:
    ```bash
    cd backend/rag_backend/
    ```

2.  **Create and activate a Python virtual environment**:
    ```bash
    python -m venv venv
    ./venv/Scripts/activate # On Windows
    source venv/bin/activate # On macOS/Linux
    ```

3.  **Install Python dependencies**:
    ```bash
    pip install -r requirements.txt
    ```
    (Note: `requirements.txt` will be created during implementation)

## 2. Data Ingestion

The ingestion script reads your Docusaurus Markdown files, chunks them, creates embeddings using OpenAI, and uploads them to Qdrant.

1.  **Ensure your Qdrant instance is running.** If local, you can run it as a Docker container:
    ```bash
    docker run -p 6333:6333 -p 6334:6334 -v $(pwd)/qdrant_storage:/qdrant/storage qdrant/qdrant
    ```

2.  **Run the ingestion script**:
    ```bash
    python ingest.py
    ```
    (Note: `ingest.py` will be created during implementation. It expects Markdown files in `../../docs/` relative to `rag_backend/`.)

## 3. Backend API Startup

After ingestion, start the FastAPI application.

1.  **From the `backend/rag_backend/` directory (with virtual environment active)**:
    ```bash
    uvicorn main:app --reload --port 8000
    ```
    The API will be available at `http://localhost:8000`.

## 4. Frontend Integration and Startup (Docusaurus)

The React components (`ChatWidget.js`, `Root.js`) will be integrated into your Docusaurus project.

1.  **Ensure Docusaurus is set up and running**:
    ```bash
    cd <your-docusaurus-root> # e.g., root of this repository
    npm install # if not already done
    npm run start
    ```

2.  **Integrate ChatWidget and Root.js**:
    *   Copy `ChatWidget.js` and `ChatWidget.css` to `src/components/`.
    *   Modify `docusaurus.config.js` to include the `Root.js` wrapper. (Specific instructions will be provided in implementation).

3.  **Verify Frontend**: Once Docusaurus starts, you should see the floating chat bubble. Text selection should trigger the "Ask AI" button.

This quickstart assumes a development environment with `localhost` for the backend API. Adjust configurations for production deployments as necessary.
