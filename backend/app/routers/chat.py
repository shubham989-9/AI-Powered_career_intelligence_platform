from fastapi import APIRouter, HTTPException

from app.schemas.chat import ChatRequest, ChatResponse
from app.services.chat_service import generate_chat_response


router = APIRouter(
    prefix="/chat",
    tags=["Chat"]
)


@router.post(
    "/",
    response_model=ChatResponse
)
def chat(request: ChatRequest):

    message = request.message.strip()

    if not message:
        raise HTTPException(
            status_code=400,
            detail="Message cannot be empty."
        )

    try:
        response = generate_chat_response(message)

        return {
            "response": response
        }

    except Exception as error:
        print("Chatbot Error:", error)

        raise HTTPException(
            status_code=500,
            detail="Unable to generate chatbot response."
        )