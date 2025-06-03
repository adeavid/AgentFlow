from pydantic import BaseModel
from typing import List, Dict, Any

class Block(BaseModel):
    id: str
    type: str
    data: Dict[str, Any] = {}

class CanvasFlow(BaseModel):
    blocks: List[Block]
