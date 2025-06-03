import sys
import os

sys.path.append(os.path.dirname(os.path.dirname(__file__)))

import pytest
from httpx import AsyncClient, Response, ASGITransport
import respx

from backend.main import app

@pytest.mark.asyncio
async def test_deploy_success():
    flow = {
        "blocks": [
            {"id": "1", "type": "start", "data": {}},
        ]
    }
    with respx.mock(base_url="http://localhost:5678") as respx_mock:
        workflow_route = respx_mock.post("/api/v1/workflows").mock(
            return_value=Response(200, json={"id": "123"})
        )
        activate_route = respx_mock.post("/api/v1/workflows/123/activate").mock(
            return_value=Response(200, json={"active": True})
        )
        transport = ASGITransport(app=app)
        async with AsyncClient(transport=transport, base_url="http://test") as ac:
            response = await ac.post("/deploy", json=flow)
        assert response.status_code == 200
        data = response.json()
        assert data["url"].endswith("/workflow/123")
        assert workflow_route.called
        assert activate_route.called
