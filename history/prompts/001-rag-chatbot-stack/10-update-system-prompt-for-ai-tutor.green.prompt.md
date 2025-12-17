---
id: 10
title: Update System Prompt for AI Tutor
stage: green
date: 2025-12-09
surface: agent
model: gemini
feature: 001-rag-chatbot-stack
branch: 001-rag-chatbot-stack
user: User
command: /sp.implement
labels: [feature, implement, refinement]
links:
  spec: specs/001-rag-chatbot-stack/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - backend/rag_backend/main.py
 - specs/001-rag-chatbot-stack/tasks.md
tests:
 - none
---

## Prompt

/sp.implement Update the System Prompt to handle text fragments.

**Update `backend/rag_backend/main.py`**:
1.  **Locate** the `get_answer_from_gpt` function.
2.  **Replace** the `prompt` variable with this more flexible version:
    ```python
    prompt = (
        "You are an AI Tutor for a 'Physical AI & Humanoid Robotics' textbook. "
        "The user will provide a Query, which might be a specific question OR a highlighted text fragment.\n"
        "1. If the Query is a question, answer it using the Context below.\n"
        "2. If the Query is a text fragment, explain that concept using the Context below.\n"
        "3. STRICTLY restrict your answer to the provided Context. If the context doesn't support an answer, "
        "politely state that you don't have enough information.\n\n"
        f"Context:\n{context}\n\nQuery: {query}\nAnswer:"
    )
    ```

## Response snapshot

The system prompt within the `get_answer_from_gpt` function in `backend/rag_backend/main.py` has been updated to transform the AI into an "AI Tutor" for the textbook. This new prompt is more flexible, designed to handle both direct questions and highlighted text fragments, explaining concepts based strictly on the provided context. Task T017 in `specs/001-rag-chatbot-stack/tasks.md` remains marked as complete, reflecting this refinement.

## Outcome

- ✅ Impact: The AI's interaction model has been enhanced to act as a specialized tutor, improving the user experience for both direct questions and contextual explanations of text fragments.
- 🧪 Tests: none
- 📁 Files: backend/rag_backend/main.py, specs/001-rag-chatbot-stack/tasks.md
- 🔁 Next prompts: Continue with testing or further implementation tasks.
- 🧠 Reflection: Successfully updated the AI's persona and instruction set.

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): none
