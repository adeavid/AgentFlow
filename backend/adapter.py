from typing import Any, Dict, List
from .models import CanvasFlow

def canvas_to_n8n_nodes(flow: CanvasFlow) -> List[Dict[str, Any]]:
    """Simple adapter from canvas blocks to n8n nodes."""
    nodes = []
    for block in flow.blocks:
        node = {
            "id": block.id,
            "name": block.type,
            "type": block.type,
            "typeVersion": 1,
            "parameters": block.data,
            "position": {"x": 0, "y": 0},
        }
        nodes.append(node)
    return nodes
