FROM ultralytics/ultralytics:latest

WORKDIR /app

RUN pip install --no-cache-dir \
    fastapi \
    uvicorn[standard] \
    python-multipart \
    python-dotenv

COPY server.py .
COPY uploaded_models uploaded_models

EXPOSE 8000

CMD ["uvicorn", "server:app", "--host", "0.0.0.0", "--port", "8000"]
