from fastapi import FastAPI, UploadFile, File, HTTPException
import os
import shutil
from fastapi.middleware.cors import CORSMiddleware
from models.predict import predict_image
from services.frame_extractor import analyze_video
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
@app.post("/predict/video")
async def predict_video_api(file: UploadFile = File(...)):

    allowed_extensions = [".mp4", ".avi", ".mov", ".mkv"]

    ext = os.path.splitext(file.filename)[1].lower()

    if ext not in allowed_extensions:
        raise HTTPException(
            status_code=400,
            detail="Only MP4, AVI, MOV and MKV videos are allowed."
        )

    video_folder = os.path.join(UPLOAD_FOLDER, "videos")
    frames_folder = os.path.join(UPLOAD_FOLDER, "frames")

    os.makedirs(video_folder, exist_ok=True)
    os.makedirs(frames_folder, exist_ok=True)

    video_path = os.path.join(video_folder, file.filename)

    with open(video_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    try:
        result = analyze_video(video_path)
    except Exception as e:
        print("VIDEO ERROR:", repr(e))
        raise HTTPException(status_code=500, detail=str(e))

    return {
    "filename": file.filename,
    "status": "Success",
    "prediction": result["prediction"],
    "confidence": result["confidence"],
    "fake_frames": result["fake_frames"],
    "real_frames": result["real_frames"],
    "analyzed_frames": result["analyzed_frames"],
    "total_frames": result["total_frames"]
    }

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