import cv2
from models.predict import predict_frame


def analyze_video(video_path, frame_interval=30):
    """
    Analyze a video by predicting every Nth frame.
    """

    cap = cv2.VideoCapture(video_path)

    if not cap.isOpened():
        raise Exception("Unable to open video.")

    frame_count = 0
    analyzed_frames = 0

    fake_frames = 0
    real_frames = 0

    confidences = []

    while True:

        success, frame = cap.read()

        if not success:
            break

        if frame_count % frame_interval == 0:

            result = predict_frame(frame)

            confidences.append(result["confidence"])

            if result["prediction"] == "FAKE":
                fake_frames += 1
            else:
                real_frames += 1

            analyzed_frames += 1

        frame_count += 1

    cap.release()

    prediction = "FAKE" if fake_frames > real_frames else "REAL"

    confidence = round(sum(confidences) / len(confidences), 2)

    return {
        "prediction": prediction,
        "confidence": confidence,
        "fake_frames": fake_frames,
        "real_frames": real_frames,
        "analyzed_frames": analyzed_frames,
        "total_frames": frame_count
    }