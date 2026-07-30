import os
import torch
from torchvision.models import efficientnet_b0, EfficientNet_B0_Weights

# Select GPU if available
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# Model path
MODEL_PATH = os.path.join(
    os.path.dirname(__file__),
    "weights",
    "best_model-v3.pt"
)
print("MODEL PATH =", MODEL_PATH)
print("FILE EXISTS =", os.path.exists(MODEL_PATH))

# Load EfficientNet-B0
weights = EfficientNet_B0_Weights.IMAGENET1K_V1
model = efficientnet_b0(weights=weights)

# Replace classifier
in_features = model.classifier[1].in_features
model.classifier = torch.nn.Sequential(
    torch.nn.Dropout(0.4),
    torch.nn.Linear(in_features, 2)
)

# Load trained weights
model.load_state_dict(torch.load(MODEL_PATH, map_location=device))

# Move to device
model = model.to(device)

# Evaluation mode
model.eval()


def get_model():
    return model


def get_device():
    return device