# SDG 4: Quality Education - AI Agent

A full-stack AI project that transforms PDF documents into kid-friendly educational content and generates interactive quizzes.

## Tech Stack

- **Frontend**: React (Vite) + Tailwind CSS
- **Backend**: FastAPI + LangGraph
- **Database**: Supabase
- **AI**: Google Gemini API

## Project Structure

```
.
├── frontend/          # React + Vite + Tailwind CSS
├── backend/          # FastAPI + LangGraph
├── .env              # Environment variables (create from .env.example)
└── README.md
```

## Setup Instructions

### Prerequisites

- Node.js (v18 or higher)
- Python (v3.9 or higher)
- Supabase account
- Google Gemini API key

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create a virtual environment:
   ```bash
   python -m venv venv
   ```

3. Activate the virtual environment:
   - Windows: `venv\Scripts\activate`
   - macOS/Linux: `source venv/bin/activate`

4. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

5. Create a `.env` file in the root directory (copy from `.env.example`):
   ```bash
   cp .env.example .env
   ```

6. Add your Supabase and Gemini API keys to `.env`

7. Run the backend server:
   ```bash
   python main.py
   ```
   Or using uvicorn:
   ```bash
   uvicorn main:app --reload
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

The frontend will be available at `http://localhost:3000` and the backend at `http://localhost:8000`.

## Features (To Be Implemented)

- [ ] PDF upload and text extraction
- [ ] AI-powered content simplification for kids
- [ ] Automatic quiz generation
- [ ] Interactive quiz interface
- [ ] Progress tracking with Supabase

## API Endpoints

- `GET /` - API root
- `GET /health` - Health check
- `POST /upload` - Upload PDF file
- `POST /simplify` - Simplify content (TODO)
- `POST /generate-quiz` - Generate quiz (TODO)


[![Live Site](https://img.shields.io/badge/demo-live-green.svg)](https://sdg4-ai-agent.vercel.app)
[![Backend API](https://img.shields.io/badge/api-live-blue.svg)](https://sdg4-ai-agent.onrender.com)

This AI-powered agent simplifies complex educational PDFs into kid-friendly summaries and generates interactive quizzes. It is built to support **UN Sustainable Development Goal 4 (Quality Education)** by making learning more accessible for children.

## 🚀 Live Links
- **Web Interface:** [https://sdg4-ai-agent.vercel.app](https://sdg4-ai-agent.vercel.app)
- **AI Backend:** [https://sdg4-ai-agent.onrender.com](https://sdg4-ai-agent.onrender.com)

---

## ✨ Features
- **PDF Upload:** Extract text automatically from school textbooks.
- **AI Simplification:** Rewrites advanced concepts into simple language using **Google Gemini AI**.
- **Interactive Quiz:** Generates 5 multiple-choice questions per chapter to test comprehension.
- **Mobile Friendly:** Responsive design for students on any device.

---

## 🛠️ Tech Stack
- **Frontend:** React (Vite) + Tailwind CSS (Vercel)
- **Backend:** FastAPI + Python (Render)
- **AI Engine:** Google Gemini 1.5 Flash
- **Deployment:** Vercel & Render

---

## 📖 How to Use
1. Visit the [Live Site](https://sdg4-ai-agent.vercel.app).
2. Upload a PDF chapter (e.g., about the Solar System or History).
3. Click **"Process Textbook"**.
4. Read the simplified summary and complete the generated quiz!

---

## 🧑‍💻 For Developers: Local Setup
1. Clone this repo.
2. **Backend:** `cd backend`, install `requirements.txt`, and run `python main.py`. (Requires `GEMINI_API_KEY` in .env)
3. **Frontend:** `cd frontend`, `npm install`, and `npm run dev`.

---
**Created to empower students through AI.** 🏆






