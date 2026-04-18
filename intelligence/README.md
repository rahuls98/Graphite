# intelligence

AI/enrichment layer for Graphite.

## Structure

- `app/` — FastAPI application and endpoints
- `app/services/` — embedding, classification, similarity, enrichment implementations
- `app/pipelines/` — async processing and pipeline orchestrations
- `app/models/` — Pydantic schemas and DTOs
- `requirements.txt` — Python dependencies

## Quick start (development)

1. Create and activate a virtual environment (recommended):

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

2. Run the FastAPI dev server (from the `intelligence` directory):

```bash
uvicorn app.main:app --reload --port 9000
```

3. The service exposes endpoints under `/api` (see `app/api/`).
