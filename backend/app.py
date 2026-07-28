from fastapi import FastAPI, UploadFile, File, HTTPException
import os
import shutil
from fastapi.middleware.cors import CORSMiddleware

from models.predict import predict_image

app = FastAPI(
    title="Deepfake Detection API",
    description="Backend for AI-powered Deepfake Detection",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


@app.get("/")
def home():
    return {"message": "Deepfake Detection Backend is Running 🚀"}


@app.get("/health")
def health():
    return {"status": "healthy"}


@app.post("/predict/image")
async def predict_image_api(file: UploadFile = File(...)):

    # Validate image type
    allowed_extensions = [".jpg", ".jpeg", ".png"]

    ext = os.path.splitext(file.filename)[1].lower()

    if ext not in allowed_extensions:
        raise HTTPException(
            status_code=400,
            detail="Only JPG, JPEG and PNG images are allowed."
        )

    file_path = os.path.join(UPLOAD_FOLDER, file.filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    result = predict_image(file_path)

    return {
        "filename": file.filename,
        "status": "Success",
        "prediction": result["prediction"],
        "confidence": result["confidence"]
    }