from google import genai
from google.genai import types
import os, io
from pypdf import PdfReader
from dotenv import load_dotenv
from langgraph.graph import StateGraph, END
from typing import TypedDict

load_dotenv()
# Using the 2026 SDK Client
client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

class AgentState(TypedDict):
    raw_text: any
    summary: str
    quiz: str

def extract_text_node(state: AgentState):
    pdf_file = io.BytesIO(state['raw_text']) 
    reader = PdfReader(pdf_file)
    text = "\n".join([p.extract_text() for p in reader.pages if p.extract_text()])
    # Limit text length to prevent API errors
    return {"raw_text": text[:10000]} 

def simplify_node(state: AgentState):
    prompt = f"You are a primary school teacher. Simplify this textbook content for a 10-year-old. Use bullet points and fun language: {state['raw_text']}"
    res = client.models.generate_content(model='gemini-2.5-flash', contents=prompt)
    return {"summary": res.text}

def quiz_node(state: AgentState):
    prompt = f"""Based on this summary: {state['summary']}, generate a 3-question Multiple Choice Quiz.
    Return ONLY a JSON array with this exact structure:
    [
      {{"question": "string", "options": ["string", "string", "string"], "answer": "string"}},
      ...
    ]"""
    res = client.models.generate_content(
        model='gemini-2.5-flash',
        contents=prompt,
        config=types.GenerateContentConfig(response_mime_type='application/json')
    )
    return {"quiz": res.text}

def create_agent_graph():
    workflow = StateGraph(AgentState)
    workflow.add_node("extract", extract_text_node)
    workflow.add_node("simplify", simplify_node)
    workflow.add_node("quiz", quiz_node)
    
    workflow.set_entry_point("extract")
    workflow.add_edge("extract", "simplify")
    workflow.add_edge("simplify", "quiz")
    workflow.add_edge("quiz", END)
    
    return workflow.compile()

agent_app = create_agent_graph()
