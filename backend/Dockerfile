# Production image for the Muslimo API. Build from the repository root:
#   docker build -f backend/Dockerfile -t sira-path-api .
FROM python:3.12-slim

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=1 \
    SIRA_ENVIRONMENT=production \
    PORT=8000

WORKDIR /srv

COPY backend/requirements.txt backend/requirements.txt
RUN pip install -r backend/requirements.txt

COPY backend backend

RUN useradd --create-home sira && chown -R sira /srv
USER sira

EXPOSE 8000

# Apply migrations and refresh the lesson catalog on every deploy, then serve.
CMD ["sh", "-c", "python -m backend.scripts.bootstrap && exec uvicorn backend.app.main:app --host 0.0.0.0 --port ${PORT} --proxy-headers --forwarded-allow-ips='*'"]
