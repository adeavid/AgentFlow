# AgentFlow

This repository contains a minimal prototype for AgentFlow's drag-and-drop canvas.

## Frontend

The `frontend` directory contains a Vite + React project. It demonstrates a basic canvas where four block types (Prompt, LLM, Función externa, Condición) can be dragged onto a drop zone. Global state is managed with Zustand and the diagram can be serialized to JSON.

### Development

```bash
cd frontend
npm install
npm run dev
```

### Testing

```bash
npm test
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
