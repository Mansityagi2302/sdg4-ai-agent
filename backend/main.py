from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import io
import os
import json
from dotenv import load_dotenv
from agent import agent_app  # Ensure agent.py is in the same folder

# Load environment variables
load_dotenv()

app = FastAPI(title="SDG 4 Education API", version="1.0.0")

# CORS settings for React (usually port 5173 or 3000)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all for testing
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "SDG 4 Education API is running"}

@app.post("/upload-textbook")
async def upload_textbook(file: UploadFile = File(...)):
    try:
        # 1. Read the uploaded PDF file into bytes
        pdf_bytes = await file.read()
        
        # 2. Invoke the agent with the PDF data
        # Ensure your agent.py is set up to receive "pdf_data"
       # We are changing the key name to 'raw_text' so your Agent recognizes it
        result = agent_app.invoke({"raw_text": pdf_bytes}) 
        
        # 3. DEBUG: This will show you in the terminal what the Agent is sending
        print(f"Agent Output Keys: {result.keys()}") 

        # 4. Extract data safely using the keys your Agent actually uses
        # If your agent uses different names, change "summary" and "quiz" here
        actual_summary = result.get("summary", "Summary not found in Agent response.")
        actual_quiz = result.get("quiz", [])

        # 5. Clean up the quiz format for React
        if isinstance(actual_quiz, str):
            try:
                actual_quiz = json.loads(actual_quiz)
            except:
                actual_quiz = []

        return {
            "success": True,
            "summary": actual_summary,
            "quiz": actual_quiz,
            "mode": "live"
        }

    except Exception as e:
        print(f"AI Error: {str(e)}")
        # If anything fails, we show the fallback so the UI doesn't break
        return {
            "success": True, 
            "summary": "### Fallback: Photosynthesis\n\nAI was unable to process this file. Showing demo instead.",
            "quiz": [
                {"question": "Why is this a demo?", "options": ["API Error", "Success"], "answer": "API Error"}
            ],
            "mode": "fallback"
        }

if __name__ == "__main__":
    import uvicorn
    # This manually forces the server to start and STAY open
    print("SERVER STARTING ON PORT 8000...")
    uvicorn.run(app, host="127.0.0.1", port=8000, log_level="info")