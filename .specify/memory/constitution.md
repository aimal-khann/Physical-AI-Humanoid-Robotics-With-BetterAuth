<!--
  Sync Impact Report:
  - Version change: 0.1.0 -> 0.2.0
  - Modified principles: Principles 1.4, 1.5, and 1.6 have been replaced with new principles for Secure Authentication, Gated AI Access, and Separation of Concerns. Principles 1.1, 1.2, 1.3 have been updated for clarity.
  - Added sections: Detailed code standards for Auth and RAG backends.
  - Removed sections: "Custom Navigation" and "Sidebar Control" principles were removed in favor of more critical architectural principles.
  - Templates requiring updates (✅ updated / ⚠ pending):
    - .specify/templates/plan-template.md ⚠ pending
    - .specify/templates/spec-template.md ⚠ pending
    - .specify/templates/tasks-template.md ⚠ pending
    - .specify/templates/commands/*.md ⚠ pending
    - README.md ⚠ pending
  - Follow-up TODOs: Manual verification and update of listed templates and documentation files is required to ensure alignment with the new architectural principles.
-->
<!--
  SPECIFIKIT CONSTITUTION TEMPLATE
  Version: 0.2.0
  Ratified: 2023-01-01
  Last Amended: 2025-12-13
-->

# Project Constitution: Physical AI & Humanoid Robotics Textbook

## 1. Core Principles

### 1.1 Docusaurus Native
The project MUST be built using standard Docusaurus 3.x structure.

### 1.2 Visual Identity
The site MUST use a primary Green theme (#2e8555).

### 1.3 Structured Learning
Content IS divided into 6 specific modules.

### 1.4 Secure Authentication
The system MUST use **Better Auth** with a **Neon Postgres** database to manage user accounts. User profiles MUST track "Software Experience" and "Hardware Experience".

### 1.5 Gated AI Access
The RAG Chatbot IS a premium feature; only authenticated users MAY access the "Ask AI" context menu or open the chat widget.

### 1.6 Separation of Concerns
Authentication logic MUST run on a dedicated Node.js/Express server (Port 3001), separate from the RAG Python backend.

## 2. Governance

### 2.1 Code Standards

#### 2.1.1 Frontend
Code MUST be written in TypeScript (`.tsx`) or JavaScript (`.js`).

#### 2.1.2 Auth Backend
The authentication backend MUST be a Node.js/Express server using `better-auth`.

#### 2.1.3 RAG Backend
The RAG backend MUST be written in Python (`.py`).

#### 2.1.4 Documentation
Markdown files MUST use standard Docusaurus frontmatter.

### 2.2 Amendment Procedure
The constitution MAY be amended through a formal proposal and review process. Proposed amendments MUST be submitted to the project maintainers for consideration and require a consensus among core contributors for adoption.

### 2.3 Versioning Policy
The constitution's versioning follows Semantic Versioning (MAJOR.MINOR.PATCH).
- MAJOR version increments for backward-incompatible changes, removal, or redefinition of governance or principles.
- MINOR version increments for additions of new principles, sections, or materially expanded guidance.
- PATCH version increments for clarifications, wording adjustments, typo fixes, or non-semantic refinements.

### 2.4 Compliance Review
Regular reviews of project artifacts against the constitution's principles and governance rules SHALL be conducted periodically, or as triggered by significant project milestones or changes. Any deviations MUST be identified, documented, and addressed.

---
## Metadata
- **Constitution Version:** 0.2.0
- **Ratification Date:** 2023-01-01
- **Last Amended Date:** 2025-12-13