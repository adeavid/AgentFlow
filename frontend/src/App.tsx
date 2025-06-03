import { DndContext } from '@dnd-kit/core'
import type { DragEndEvent } from '@dnd-kit/core'
import Canvas from './Canvas'
import PaletteItem from './PaletteItem'
import { useStore } from './store'
import type { BlockType } from './types'

const blockTypes: { label: string; type: BlockType }[] = [
  { label: 'Prompt', type: 'prompt' },
  { label: 'LLM', type: 'llm' },
  { label: 'Función externa', type: 'external' },
  { label: 'Condición', type: 'condition' },
]

export default function App() {
  const addBlock = useStore((s) => s.addBlock)

  const handleDragEnd = (event: DragEndEvent) => {
    const { over, active } = event
    if (over && over.id === 'canvas') {
      const type = (active.data.current as { type: BlockType }).type
      const rect = active.rect.current?.translated
      if (rect) {
        const { left, top } = rect
        addBlock(type, left, top)
      }
    }
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        {blockTypes.map((b) => (
          <PaletteItem key={b.type} label={b.label} type={b.type} />
        ))}
      </div>
      <Canvas />
    </DndContext>
  )
}
