FROM python:3.11-slim

WORKDIR /app

RUN pip install --no-cache-dir \
    fastapi \
    uvicorn[standard] \
    python-multipart \
    tensorflow \
    opencv-python-headless \
    numpy

COPY server.py .
RUN mkdir uploaded_models

EXPOSE 8000

CMD ["uvicorn", "server:app", "--host", "0.0.0.0", "--port", "8000"]
