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

## License

MIT






