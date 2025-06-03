from fastapi import FastAPI, HTTPException
from .models import CanvasFlow
from .adapter import canvas_to_n8n_nodes
from .n8n_client import N8NClient

app = FastAPI()
client = N8NClient()

@app.post("/deploy")
async def deploy(flow: CanvasFlow):
    try:
        nodes = canvas_to_n8n_nodes(flow)
        workflow = await client.create_workflow("generated", nodes)
        url = f"{client.base_url}/workflow/{workflow['id']}"
        return {"url": url}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
