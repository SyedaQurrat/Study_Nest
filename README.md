# StudyNest - Your AI-Powered Study Companion

Welcome to StudyNest! This is a Next.js application built with Firebase, designed to be an AI-powered study companion for students.

## Features

- **Firebase Authentication**: Secure student signup and login.
- **Personalized Dashboard**: A central hub for students to access their learning materials.
- **Book Library**: A section to browse and read course textbooks (with sample PDFs).
- **AI Chatbot**: An intelligent chatbot powered by Google's Gemini to answer questions on Math, Physics, and Chemistry.
- **Simple Calculator**: A handy tool for quick calculations.
- **Clean, Minimal UI**: A user interface inspired by Google Classroom, built with TailwindCSS and ShadCN UI.

## Getting Started

Follow these steps to get the development environment running.

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v20 or later)
- [pnpm](https://pnpm.io/) (or npm/yarn)
- A [Firebase](https://firebase.google.com/) project

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd studynest
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    -   Copy the `.env.local.example` file to a new file named `.env.local`.
        ```bash
        cp .env.local.example .env.local
        ```
    -   Open `.env.local` and add your Firebase project credentials. You can find these in your Firebase project settings.

4.  **Run the development server:**
    ```bash
    npm dev
    ```

    The application will be available at `http://localhost:9002`.

## Available Scripts

In the project directory, you can run:

- `npm dev`: Runs the Next.js app in development mode.
- `npm build`: Builds the app for production.
- `npm start`: Starts a Next.js production server.
- `npm lint`: Runs ESLint to check for code quality.
- `npm typecheck`: Runs the TypeScript compiler to check for type errors.

## Firebase Setup

This project uses Firebase for:
- **Authentication**: To manage users.
- **Firestore**: To store user profiles (like name and class level).
- **Storage**: To host PDF books (though samples are linked for now).

Make sure to enable Authentication (Email/Password) and Firestore in your Firebase project. You will also need to create a `users` collection in Firestore.
