import os
from typing import Dict, Any

import httpx
from tenacity import retry, stop_after_attempt, wait_fixed

N8N_URL = os.environ.get("N8N_URL", "http://localhost:5678")

class N8NClient:
    def __init__(self, base_url: str = N8N_URL):
        self.base_url = base_url
        self.client = httpx.AsyncClient(base_url=base_url)

    async def __aenter__(self) -> "N8NClient":
        """Return the client instance when entering the context."""
        return self

    async def __aexit__(self, exc_type, exc, tb) -> None:
        """Close the underlying HTTP client when exiting the context."""
        await self.client.aclose()

    @retry(stop=stop_after_attempt(3), wait=wait_fixed(1))
    async def create_workflow(self, name: str, nodes: Any) -> Dict[str, Any]:
        data = {"name": name, "nodes": nodes}
        resp = await self.client.post("/api/v1/workflows", json=data)
        resp.raise_for_status()
        workflow = resp.json()
        await self.client.post(f"/api/v1/workflows/{workflow['id']}/activate")
        return workflow
