# 🚀 AI Model Deployment & Evaluation Platform

### *From Hydroponic Detection to Universal YOLO Testing*

![Python](https://img.shields.io/badge/Python-3.9-blue?logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-0.95-009688?logo=fastapi&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![YOLOv8](https://img.shields.io/badge/YOLO-Ultralytics-blueviolet)
![ONNX](https://img.shields.io/badge/ONNX-Runtime-005CED?logo=onnx&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-Supported-2496ED?logo=docker&logoColor=white)

A **universal web-based platform** for testing and evaluating YOLO models across any detection task. Originally developed for hydroponic vegetable monitoring, this system has evolved into a **generic AI model tester** that supports all YOLO-based object detection projects without code modification.

---

##  Project Evolution & Purpose

**AppTestModel** was initially created out of necessity for rapid testing and performance evaluation of models in the **Hydroponic Vegetable Detection** project. The goal was to quickly analyze Confidence Scores, verify Bounding Box accuracy, and fine-tune model parameters in real-time.

However, during development, we realized this system could extend its capabilities to support other tasks without code modification. This led to architectural improvements, transforming it into a **Universal Model Testing Platform** that works with any YOLO model type.

###  Core Design Philosophy

The system is built on the **"Zero Configuration for New Models"** principle, meaning:

-  **No Code Modification Required:** Upload a new model and use it immediately
-  **Auto Class Detection:** System automatically extracts class names from model metadata
-  **Dynamic Color Mapping:** Bounding box colors are automatically assigned based on Class ID
-  **Multi-Format Support:** Supports both `.pt` (PyTorch) and `.onnx` (Optimized Runtime)

---

## 🔗 Connected Projects (The End-to-End Pipeline)

This project represents the final stage of a complete AI development workflow, covering everything from data preparation to model deployment:

### 1️⃣ Image Preprocessing & Dataset Generation  
[ScenerYOne/Aeroponics-Vegetable-Monitoring-Image-Preprocessing](https://github.com/ScenerYOne/Aeroponics-Vegetable-Monitoring-Image-Preprocessing.git)

- Perspective Transformation for camera angle correction  
- Image Standardization for data consistency  
- Dataset Preparation for YOLO training  
- Manual Labeling Workflow with LabelImg/Roboflow  

---

### 2️⃣ Model Training & Evaluation  
[ScenerYOne/Aeroponics-Vegetable-Monitoring-Model-Training-Evaluation](https://github.com/ScenerYOne/Aeroponics-Vegetable-Monitoring-Model-Training-Evaluation)

- Dataset Cleaning & Normalization  
- Multi-Dataset Integration for Transfer Learning  
- YOLOv8/YOLOv11 Training and Hyperparameter Tuning  
- Automated Training Reports (mAP, Precision, Recall, Confusion Matrix)  
- ONNX Export for high-performance deployment  

---

### 3️⃣ Model Deployment Platform (This Repository)
[ScenerYOne/AI-Model-Deployment-Evaluation-Platform](https://github.com/ScenerYOne/AI-Model-Deployment-Evaluation-Platform)

- **Web-Based YOLO Testing:** Test models through browser without software installation  
- **FastAPI Backend:** Automatic inference and memory management  
- **React Frontend:** Fast-responding and user-friendly UI  
- **Real-Time Detection:** Instant display of Bounding Boxes with Class Labels and Confidence Scores  
- **Multi-User Support:** Multiple users can test different models simultaneously  

---

## 🔁 Full System Workflow

```
Raw Images → Preprocessing → Labeled Dataset → Model Training → ONNX Export → Deployment Testing (This Platform)
```

---

##  Key Features

###  Universal Compatibility

- **Multi-Format Support:** Supports both **PyTorch (`.pt`)** files for development and debugging, and **ONNX (`.onnx`)** for high-speed inference testing suitable for production deployment
- **Automatic Class Detection:** System reads metadata from models and automatically extracts class names for display, regardless of how many classes or what their names are (e.g., `['car', 'person']` or `['healthy', 'disease_a', 'disease_b']`)
- **Zero Code Modification:** Upload new models and use immediately without modifying code or config files

###  Performance & Scalability

- **Multi-User Performance:** Designed to support multiple simultaneous users by separating model loading based on individual Session IDs, allowing multiple developers to test different models concurrently without interference
- **Smart Memory Management (LRU Cache):** When memory approaches capacity, the system automatically unloads the least recently used models from RAM (Least Recently Used Algorithm) to maintain server stability
- **GPU/CPU Auto Detection:** System automatically detects available hardware; if GPU is available, CUDA inference is enabled; otherwise, it automatically falls back to CPU

###  Visualization & Analysis

- **Dynamic Bounding Box Colors:** Automatically separates box colors by Class ID from the predefined `CLASS_COLORS` list for clear result visualization
- **Confidence Score Display:** Shows confidence values on each Bounding Box for model confidence analysis
- **Instant Visual Feedback:** Results display immediately as Base64-encoded images with Detection Summary (number of objects detected per class)

---

##  System Architecture & Workflow

The system operates under a highly flexible **Stateless Backend** architecture that supports system scaling:

### Inference Pipeline

```
1. Upload Phase
   User uploads model → Backend saves to /uploaded_models/
   → Loads model into RAM/GPU → Extracts class names from metadata
   → Returns model_id and class_names to frontend

2. Prediction Phase
   User uploads image + model_id → Backend retrieves model from cache
   → Runs YOLO inference → Draws bounding boxes + labels
   → Returns Base64-encoded image + detection summary

3. Memory Management
   Monitor RAM usage → If threshold exceeded
   → Unload least recently used model → Free up memory
```

### Technical Stack

**Backend:**
- **FastAPI:** High-performance async API framework
- **Ultralytics YOLO:** Native support for YOLOv8/YOLOv11
- **ONNX Runtime:** Optimized inference engine for production
- **OpenCV:** Image processing and visualization
- **Python 3.9+:** Core runtime environment

**Frontend:**
- **React 18:** Modern component-based UI
- **Vite:** Fast build tool with HMR (Hot Module Replacement)
- **Axios:** HTTP client for API communication
- **CSS3:** Responsive styling with Flexbox/Grid

**DevOps:**
- **Docker & Docker Compose:** Containerized deployment
- **Nginx Proxy (optional):** For production load balancing
- **Railway/Render:** Cloud deployment ready

---

##  Versatility: Beyond Hydroponic Detection

While this project originated from Hydroponic Vegetable Monitoring, the system architecture was designed as a **Generic Platform** that can be immediately applied to other object detection tasks without code modification.

###  Tested Use Cases (Ready-to-Use Applications)

####  Agriculture & Farming
- **Plant Disease Detection:** Detect plant diseases from leaves
- **Crop Counting:** Count produce (tomatoes, peppers, cucumbers)
- **Weed Classification:** Classify weeds for automated spraying
- **Fruit Ripeness:** Assess fruit ripeness levels

####  Industrial & Manufacturing
- **Defect Detection:** Inspect workpiece defects (scratches, cracks)
- **Quality Control:** Verify product size/shape
- **Assembly Verification:** Verify correct component assembly

####  Transportation & Safety
- **Vehicle Detection & Counting:** Count vehicles at various points
- **License Plate Recognition:** Detect and recognize license plates
- **Safety Gear Detection:** Verify hard hat/reflective vest usage
- **Intrusion Detection:** Detect unauthorized persons in restricted areas

####  Healthcare & Medical
- **X-Ray Analysis:** Detect abnormalities in X-ray images
- **Cell Classification:** Classify cell types in microscopy
- **Medical Equipment Detection:** Verify medical equipment presence

####  Retail & E-Commerce
- **Product Recognition:** Recognize products on shelves (Shelf Monitoring)
- **Inventory Management:** Count remaining stock
- **Customer Behavior Analysis:** Analyze in-store customer behavior

###  Why It Works Universally

1. **Metadata-Driven System:** System reads class names directly from model files, not hard-coded in the source
2. **Flexible Color Palette:** `CLASS_COLORS` list contains enough colors for multi-class models; for very large class counts (20-80 classes), colors can be easily added
3. **Format Agnostic:** Supports both `.pt` and `.onnx`, the standard YOLO formats
4. **Session-Based Isolation:** Each user has their own `model_id`, enabling simultaneous testing of different models

---

## 📂 Project Structure

```text
APP_TESTMODEL/
├── backend/
│   ├── uploaded_models/      # Storage for uploaded .pt/.onnx models
│   ├── server.py             # FastAPI backend (main entry point)
│   ├── .env                  # Backend environment variables
│   ├── requirements.txt      # Python dependencies (FastAPI, Ultralytics, ONNX, OpenCV)
│   └── Dockerfile            # Backend container image
│
├── frontend/app_testmodel/
│   ├── src/
│   │   ├── assets/           # Static assets (images, icons)
│   │   ├── App.jsx           # Main React component (upload + predict logic)
│   │   ├── App.css           # Component styling
│   │   ├── index.css         # Global styles
│   │   └── main.jsx          # React entry point (ReactDOM.render)
│   ├── public/
│   │   └── vite.svg          # Vite logo
│   ├── .env                  # Frontend environment variables (VITE_API_BASE)
│   ├── vite.config.js        # Vite configuration with proxy settings
│   ├── package.json          # Node.js dependencies (React, Axios, Vite)
│   ├── eslint.config.js      # ESLint rules
│   ├── index.html            # HTML entry point
│   └── Dockerfile            # Frontend container image
│
├── .dist/                    # Production build output (compiled frontend)
├── .pycache/                 # Python bytecode cache
├── node_modules/             # Node.js dependencies
├── .gitignore                # Git ignore rules
├── docker-compose.yml        # Docker orchestration (frontend + backend)
├── railway.json              # Railway deployment configuration
└── README.md                 # Project documentation (this file)
```

---

##  Installation & Quick Start

### 1. Backend Setup (Python)

We recommend using Conda for environment management to avoid dependency conflicts:

```bash
# Create a new environment
conda create -n app_testmodel python=3.9
conda activate app_testmodel

# Install dependencies
pip install fastapi uvicorn ultralytics opencv-python numpy python-multipart onnxruntime
```

### 2. Frontend Setup (React)

Navigate to the frontend directory and install dependencies:

```bash
cd app_testmodel  # or frontend/app_testmodel depending on your structure
npm install
```

---

##  Usage

### Option A: Manual Mode (Two Terminals)

Suitable for development and code debugging:

#### Terminal 1: Start Backend Server

```bash
# Run from the root directory (D:\APP_TESTMODEL)
conda activate app_testmodel
python -m uvicorn server:app --reload --host 127.0.0.1 --port 8000
```

#### Terminal 2: Start Frontend Client

```bash
# Run from the app_testmodel directory (D:\APP_TESTMODEL\app_testmodel)
cd app_testmodel
npm run dev
```

**Access Points:**
- Frontend UI: [http://localhost:5173](http://localhost:5173)
- Backend API: [http://localhost:8000](http://localhost:8000)
- Swagger Docs: [http://localhost:8000/docs](http://localhost:8000/docs)

---

### Option B: Docker Mode (Single Command)

**Recommended method for deployment and production:**

```bash
# Clean previous builds and start fresh
docker compose down
docker builder prune -af
docker compose up --build
```

**Why Docker?**
- ✅ **One-Command Deployment:** No need to manually install dependencies
- ✅ **Consistent Environment:** Runs identically on all machines (Windows/Mac/Linux)
- ✅ **Auto-Install ONNX Runtime:** Docker image includes ONNX Runtime
- ✅ **Isolated Network:** Frontend and backend communicate via Docker internal network

**Access Points:**
- Frontend UI: [http://localhost:5173](http://localhost:5173)
- Backend API: [http://localhost:8000](http://localhost:8000)
- API Docs: [http://localhost:8000/docs](http://localhost:8000/docs)

---

##  How to Use

1. **Open Browser:** Navigate to [http://localhost:5173](http://localhost:5173)
2. **Upload Model:** Click "Upload Model" button to select your YOLO model file (`.pt` or `.onnx`)
   - System will load the model into RAM and display extracted class names
3. **Upload Image:** Select test image (supports JPG, PNG, BMP)
4. **Run Inference:** Click "Predict" button to process
5. **View Results:** Image displays with:
   - Color-coded Bounding Boxes by class
   - Class Names and Confidence Scores
   - Detection Summary (count of detected objects per class)

---

##  API Reference

Backend exposes the following REST API endpoints:

| Method | Endpoint | Description | Request Body | Response |
|:---|:---|:---|:---|:---|
| **POST** | `/upload-model` | Upload `.pt` or `.onnx` model file | `file: File` (multipart/form-data) | `{ model_id: str, class_names: List[str] }` |
| **POST** | `/predict` | Process image with specified model | `file: File, model_id: str` | `{ image: Base64, detections: Dict }` |
| **GET** | `/models` | List models currently loaded in memory | - | `{ models: List[str] }` |
| **DELETE** | `/model/{model_id}` | Remove model from memory | - | `{ status: str }` |

### Example: Upload Model (cURL)

```bash
curl -X POST "http://localhost:8000/upload-model" \
  -F "file=@best.pt"
```

**Response:**
```json
{
  "model_id": "abc123",
  "class_names": ["healthy", "disease_powdery_mildew", "disease_downy_mildew"]
}
```

### Example: Run Inference (Python)

```python
import requests

# Upload image and run inference
files = {'file': open('test_image.jpg', 'rb')}
data = {'model_id': 'abc123'}
response = requests.post('http://localhost:8000/predict', files=files, data=data)

result = response.json()
print(result['detections'])  # {'healthy': 5, 'disease_powdery_mildew': 2}
```

---

## 🐳 Docker Support (Production-Ready)

### Docker-Based Architecture

```
Browser (localhost:5173)
   ↓
Vite Dev Server (Frontend Container)
   ↓ /api/* proxy
FastAPI Backend (yolo-backend:8000)
   ↓
YOLO Model Inference (CPU/GPU)
```

### Environment Variables

#### Frontend (`app_testmodel/.env`)

```env
VITE_API_BASE=/api
```

#### Backend (`backend/.env`)

```env
MAX_MODELS_IN_MEMORY=3
MODEL_CACHE_SIZE_MB=2048
```

### Vite Proxy Configuration

API requests from browser are automatically proxied to backend:

**Configuration (`vite.config.js`):**

```javascript
export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://yolo-backend:8000',  // Docker internal network
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
      }
    }
  }
})
```

**Benefits:**
- ✅ Avoids CORS issues
- ✅ Browser doesn't need to know container DNS
- ✅ Single config works for both dev and production

---

##  CPU & GPU Compatibility

System automatically detects hardware without configuration:

```python
# Backend auto-detection logic
import torch

device = 'cuda' if torch.cuda.is_available() else 'cpu'
model = YOLO('uploaded_models/model.pt').to(device)
```

**Supported Configurations:**
- ✅ **NVIDIA GPU + CUDA:** Automatically enables GPU acceleration
- ✅ **CPU Only:** Automatically falls back to CPU
- ✅ **Docker GPU:** Supports NVIDIA Container Toolkit

### Enable GPU in Docker

Edit `docker-compose.yml`:

```yaml
services:
  yolo-backend:
    deploy:
      resources:
        reservations:
          devices:
            - driver: nvidia
              count: 1
              capabilities: [gpu]
```

---

##  Running Mode Comparison

| Mode | Frontend | Backend | Terminals | Dependencies | Use Case |
|:---|:---|:---|:---:|:---|:---|
| **Manual** | `npm run dev` | `uvicorn server:app` | 2 | Manual installation | Development & Debugging |
| **Docker** | Docker Compose | Docker Compose | 1 | Auto-installed | Production & Deployment |

**Recommendation:** Use Manual Mode when debugging code, but use Docker Mode for actual deployment

---

##  Troubleshooting

### Common Issues & Solutions

#### 1. "Failed to fetch" errors
**Cause:** Frontend cannot connect to backend

**Solution:**
- Verify backend is running at `http://localhost:8000`
- Check that frontend uses `/api` prefix in API calls
- Try restarting Docker Compose: `docker compose restart`

#### 2. Docker build failures
**Cause:** Network issues or old cache

**Solution:**
```bash
docker compose down
docker builder prune -af
docker compose up --build
```

#### 3. "Model loading error"
**Cause:** Invalid model file or insufficient memory

**Solution:**
- Verify file is actually `.pt` or `.onnx`
- Increase RAM for Docker Desktop (Settings → Resources → Memory)
- Reduce `MAX_MODELS_IN_MEMORY` in backend `.env`

#### 4. "ONNX Runtime not found"
**Cause:** ONNX Runtime not installed

**Solution:**
```bash
pip install onnxruntime  # For CPU
pip install onnxruntime-gpu  # For GPU
```

#### 5. Duplicate bounding box colors
**Cause:** Model has more classes than available colors

**Solution:** Add more colors to `CLASS_COLORS` in `server.py`:

```python
CLASS_COLORS = [
    (255, 0, 0), (0, 255, 0), (0, 0, 255),
    (255, 255, 0), (255, 0, 255), (0, 255, 255),
    # Add more colors based on class count
    (128, 0, 128), (255, 165, 0), (255, 192, 203),
    # ... (recommend at least 20-30 colors)
]
```

---

##  Current Status & Roadmap

###  Completed Features

- [x] Support for YOLOv8 and YOLOv11
- [x] Support for `.pt` (PyTorch) and `.onnx` (ONNX Runtime) files
- [x] Automatic RAM management system (LRU Cache)
- [x] Color-coded boxes by Class ID
- [x] Multi-User Support
- [x] Docker Deployment Ready
- [x] Auto Class Name Detection
- [x] Confidence Score Display
- [x] FastAPI Documentation (Swagger UI)


##  Contributing

Contributions are welcome! If you'd like to improve this project:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -m "Add new feature"`
4. Push to branch: `git push origin feature/new-feature`
5. Open a Pull Request

---


##  Authors

- **ScenerYOne** - Initial work and architecture design

---

## 📚 References & Documentation

### Core AI Frameworks
* **Ultralytics YOLO**: [https://docs.ultralytics.com/](https://docs.ultralytics.com/) 
* **ONNX Runtime**: [https://onnxruntime.ai/docs/](https://onnxruntime.ai/docs/) 
* **OpenCV Python**: [https://docs.opencv.org/](https://docs.opencv.org/) 

### Backend (FastAPI)
* **FastAPI Framework**: [https://fastapi.tiangolo.com/](https://fastapi.tiangolo.com/) 
* **Uvicorn ASGI Server**: [https://www.uvicorn.org/](https://www.uvicorn.org/) 

### Frontend & UI
* **React.js**: [https://react.dev/](https://react.dev/) 
* **Vite Build Tool**: [https://vitejs.dev/](https://vitejs.dev/) 
* **Lucide Icons**: [https://lucide.dev/](https://lucide.dev/)

### Infrastructure
* **Docker Documentation**: [https://docs.docker.com/](https://docs.docker.com/) 
---

**AppTestModel** - *The open bridge between trained models and real-world evaluation.*
