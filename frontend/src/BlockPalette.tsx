import React from 'react'

const blocks = [
  { label: 'LLM', type: 'llm' },
  { label: 'Prompt', type: 'prompt' },
  { label: 'RAG', type: 'rag' },
  { label: 'Webhook', type: 'webhook' },
]

export default function BlockPalette() {
  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType)
    event.dataTransfer.effectAllowed = 'move'
  }

  return (
    <div style={{ width: 120, padding: 8, borderRight: '1px solid #ddd' }}>
      {blocks.map((b) => (
        <div
          key={b.type}
          onDragStart={(e) => onDragStart(e, b.type)}
          draggable
          style={{
            padding: '4px 8px',
            border: '1px solid #ccc',
            cursor: 'grab',
            marginBottom: 4,
            borderRadius: 4,
            background: '#fff',
          }}
        >
          {b.label}
        </div>
      ))}
    </div>
  )
}
