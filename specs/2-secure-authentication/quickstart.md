# Quickstart: Secure Authentication

This guide provides the steps to set up and run the Secure Authentication feature locally.

## Prerequisites

- Node.js (v18+ recommended)
- `yarn` or `npm`
- Access to a Neon Postgres database.

## 1. Backend Setup (Auth Server)

1.  **Navigate to the auth server directory:**
    ```bash
    cd backend/auth_server
    ```

2.  **Create an environment file:**
    Create a file named `.env` in the `backend/auth_server` directory and add your Neon Postgres connection string:
    ```
    DATABASE_URL="postgresql://user:password@host:port/dbname"
    ```

3.  **Install dependencies:**
    ```bash
    npm install
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The auth server will start on `http://localhost:3001`.

## 2. Frontend Setup (Docusaurus)

1.  **Navigate to the project root:**
    ```bash
    cd ../..
    ```

2.  **Install root dependencies:**
    If you haven't already, run:
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm start
    ```
    The Docusaurus frontend will start on `http://localhost:3000`.

## 3. Verification

1.  **Open your browser** and navigate to `http://localhost:3000`.
2.  You should see "Login" and "Sign Up" links in the navigation bar.
3.  **Click "Sign Up"** and register a new user. You should be redirected and see your name in the navbar.
4.  **Log out**. You should be returned to the visitor view.
5.  **Log back in**.
6.  **Try to access the AI Tutor**. As an authenticated user, you should be able to open the chat widget.
7.  **Log out** and try to access the AI Tutor again. You should be prompted with a message to log in.
