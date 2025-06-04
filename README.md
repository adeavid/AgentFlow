# AgentFlow

This repository contains a minimal prototype for AgentFlow's drag-and-drop canvas.

## Frontend

The `frontend` directory contains a Vite + React project. It exposes a React Flow canvas backed by a global Zustand store. A sidebar palette lets you drag **LLM**, **Prompt**, **RAG** and **Webhook** blocks onto the canvas.

### Development

```bash
cd frontend
pnpm install
pnpm dev
```

Build the static bundle:

```bash
pnpm --filter frontend build
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
