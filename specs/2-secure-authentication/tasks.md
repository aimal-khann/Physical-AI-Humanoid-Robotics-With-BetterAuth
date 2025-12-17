# Tasks: Secure Authentication System

**Input**: Design documents from `specs/2-secure-authentication/`
**Prerequisites**: `plan.md`, `spec.md`, `data-model.md`, `contracts/auth_api.yaml`

---

## Phase 1: Setup

- [X] T001 Create the directory structure for the new auth service at `backend/auth_server/`.

---

## Phase 2: Foundational (Auth Backend Infrastructure)

**Purpose**: Build the standalone Node.js/Express authentication server. This is a prerequisite for all frontend integration.

- [X] T002 [P] Initialize a `package.json` in `backend/auth_server/` and install dependencies: `better-auth`, `express`, `cors`, `dotenv`, `pg`, `tsx`, and dev dependencies like `@types/node`, `@types/express`, `@types/cors`.
- [X] T003 [P] Create the environment file `backend/auth_server/.env` and add placeholders for `DATABASE_URL` and `BETTER_AUTH_SECRET`.
- [X] T004 Create the Better Auth configuration file `backend/auth_server/src/auth.ts`. This MUST define the `User` model with `additionalFields` for `softwareBackground` and `hardwareBackground` as specified in the data model.
- [X] T005 Implement the Express server in `backend/auth_server/src/index.ts`. It must import the Better Auth configuration and configure CORS to allow requests from the frontend at `http://localhost:3000`.

**Checkpoint**: The auth server can be started and will connect to the database. The API endpoints defined in `auth_api.yaml` are available but not yet integrated with the frontend.

---

## Phase 3: User Story 1 & 2 (Frontend Auth UI)

**Goal**: Implement the frontend pages for user registration and login.

**Independent Test**: A user can navigate to `/register`, create an account, be redirected to `/login`, and successfully log in.

- [X] T006 [P] Install the `better-auth` client library in the root Docusaurus project (`npm install better-auth`).
- [X] T007 [P] Create the auth client configuration at `src/lib/auth-client.ts`, pointing to the backend server at `http://localhost:3001/api/auth`.
- [X] T008 [US1] Create the registration page component at `src/pages/register.tsx`. The form MUST include input fields for "Software Experience" and "Hardware Experience".
- [X] T009 [US2] Create the login page component at `src/pages/login.tsx` with a form for email and password.

**Checkpoint**: The `/login` and `/register` pages are functional. Users can create accounts and log in, but the rest of the site does not yet react to their auth state.

---

## Phase 4: User Story 3 (Authenticated State Display)

**Goal**: Update the UI to reflect the user's authentication status.

**Independent Test**: The main navigation bar should show "Login/Sign Up" for visitors and "Hi, [Name] / Logout" for logged-in users.

- [X] T010 [US3] Create the `NavbarAuth.tsx` component in `src/components/`. This component will use the `better-auth` client to check the session and conditionally render the appropriate links (Login/Sign Up or user name/Logout).
- [X] T011 [US3] Modify the `docusaurus.config.ts` file to add the `NavbarAuth.tsx` component to the `navbar.items` array. This will replace any hardcoded login/signup links.

**Checkpoint**: The website's navigation bar is now dynamic and correctly reflects whether a user is logged in or out.

---

## Phase 5: User Story 4 (Gated Feature Access)

**Goal**: Restrict access to the AI Tutor feature to authenticated users.

**Independent Test**: An unauthenticated user attempting to open the chat widget is prompted to log in and redirected.

- [X] T012 [US4] Modify the `src/components/ChatWidget.js` file to use the `better-auth` client's `useSession()` hook.
- [X] T013 [US4] In `src/components/ChatWidget.js`, add logic so that if a user without an active session clicks the chat bubble, a browser `confirm()` dialog appears with the message "You must be logged in to use the AI Tutor. Go to Login page?".
- [X] T014 [US4] If the user clicks "OK" in the confirm dialog, they are programmatically redirected to the `/login` page.
- [X] T015 [US4] Add a similar session check to the 'Ask AI' text selection button to prevent the widget from opening for unauthenticated users.

**Checkpoint**: The AI Tutor is now a premium feature, fully gated and accessible only to logged-in users.

---

## Phase N: Polish & Cross-Cutting Concerns

- [X] T016 [P] Add basic error handling and loading states to the `login.tsx` and `register.tsx` pages.
- [X] T017 [P] Review all new frontend components for style consistency and responsiveness.
- [X] T018 Verify all steps in `quickstart.md` are accurate and lead to a successful setup.
- [X] T019 Write unit tests for the new backend endpoints in `backend/auth_server/tests/`.
- [X] T020 Write unit tests for the new frontend components (`NavbarAuth`, `login`, `register`) in `src/tests/`.
- [X] T021 [P] [US4] Modify `src/theme/Root.js` to import `authClient` and use `authClient.useSession()` hook.
- [X] T022 [P] [US4] In `src/theme/Root.js`, modify `handleMouseUp` to return early if `!session`, hiding the 'Ask AI' button for logged-out users.
- [X] T023 [P] Update `src/pages/login.tsx` with Roadmap UI and `better-auth signIn.email` usage.
- [X] T024 [P] Update `src/pages/register.tsx` with Roadmap UI, personalization fields, and `better-auth signUp.email` usage.
- [X] T025 [P] Fix backend auth configuration in `backend/auth_server/src/auth.ts` to use `database: new Pool(...)` and `emailAndPassword`.
- [X] T026 [P] Update `src/components/NavbarAuth.tsx` to fix button alignment and integrate `better-auth signOut`.
- [X] T027 [P] Restore `src/components/ChatWidget.css` with complete styling for improved chatbot appearance.
- [X] T028 [P] Overwrite `src/components/ChatWidget.css` with Roadmap styles.
- [X] T029 [P] Overwrite `src/components/ChatWidget.js` with Roadmap logic.
- [X] T030 [P] Overwrite `src/css/custom.css` with Roadmap styles.
- [X] T031 [P] Overwrite `src/theme/Root.js` with standard Roadmap wrapper.
- [X] T032 [P] Restore 'Highlight to Ask' feature in `src/theme/Root.js` with complete interaction logic and conditional rendering.
- [ ] T033 [P] Modify `src/theme/Root.js` to show the 'Ask AI' button to all visitors, delegating authentication enforcement to ChatWidget.
