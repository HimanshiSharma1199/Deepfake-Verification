from PIL import Image
import torch
from torchvision import transforms

from .model_loader import get_model, get_device

# Load model only once
model = get_model()
device = get_device()

# Image preprocessing
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(
        mean=[0.485, 0.456, 0.406],
        std=[0.229, 0.224, 0.225]
    )
])


def predict_image(image_path: str):
    """
    Predict whether an image is REAL or FAKE.

    Returns:
    {
        "prediction": "REAL" / "FAKE",
        "confidence": float
    }
    """

    image = Image.open(image_path).convert("RGB")

    tensor = transform(image).unsqueeze(0).to(device)

    with torch.no_grad():
        outputs = model(tensor)
        probabilities = torch.softmax(outputs, dim=1)[0]

    prediction_index = torch.argmax(probabilities).item()

    labels = ["REAL", "FAKE"]

    prediction = labels[prediction_index]

    confidence = float(probabilities[prediction_index].item() * 100)
    print("Raw probabilities:", probabilities.cpu().numpy())
    print("Predicted index:", prediction_index)

    return {
        "prediction": prediction,
        "confidence": round(confidence, 2)
    }