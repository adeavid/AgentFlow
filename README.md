# AgentFlow

This repository contains a minimal prototype for AgentFlow's drag-and-drop canvas.

## Frontend

The `frontend` directory contains a Vite + React project. It demonstrates a basic canvas where four block types (Prompt, LLM, Función externa, Condición) can be dragged onto a drop zone. Global state is managed with Zustand and the diagram can be serialized to JSON.

### Development

```bash
cd frontend
pnpm install
pnpm dev
```

### Testing

```bash
npx vitest run
```

## Backend

The `backend` directory exposes a small FastAPI application. You will need
`fastapi`, `uvicorn`, `httpx`, `tenacity`, `respx` and `pytest` installed.

Run the API from the repository root:

```bash
uvicorn backend.main:app --reload
```

You can override the n8n base URL with the optional `N8N_URL` environment
variable. It defaults to `http://localhost:5678`.

### Testing

```bash
pytest -q             # backend
npx vitest run        # frontend
```

## Backend

Install Python dependencies:

```bash
pip install -r requirements.txt
```

Run the API server:

```bash
uvicorn backend.main:app --reload
```
