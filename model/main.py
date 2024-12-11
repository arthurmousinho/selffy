from http.client import HTTPException
from fastapi import FastAPI
from pydantic import BaseModel
import ollama

app = FastAPI()

# Defining the model for the user's input
class TaskRequest(BaseModel):
    task_name: str
    task_details: str

@app.post("/generate_task_description")
def generate_task_description(request: TaskRequest):
    try:
        # Prompt ajustado para gerar uma descrição curta e direta
        prompt = (
            f"You are an assistant specialized in creating task descriptions. "
            f"Generate a brief and concise description for a development task based on the title and details provided. "
            f"The description should summarize the task in one paragraph, focusing on its main features and goals.\n\n"
            f"Task Title: {request.task_name}\n"
            f"Task Details: {request.task_details}\n\n"
            f"Ensure the description is simple, clear, and avoids technical jargon."
        )
        
        # Sending the prompt to the model
        response = ollama.chat(model="tinyllama", messages=[
            {
                "role": "user",
                "content": prompt
            }
        ])
        
        # Retrieving the generated response from the model
        llm_response = response.get('message', {}).get('content', '')
        
        # Simplifying the response further to ensure it meets the brief
        simplified_response = ' '.join(llm_response.splitlines())  # Removes line breaks
        
        return {"task_description": simplified_response}  
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
