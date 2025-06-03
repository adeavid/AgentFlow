import { useDroppable } from '@dnd-kit/core'
import { useStore } from './store'
import BlockComponent from './Block'

export default function Canvas() {
  const { setNodeRef } = useDroppable({ id: 'canvas' })
  const blocks = useStore((s) => s.blocks)

  return (
    <div
      ref={setNodeRef}
      style={{ position: 'relative', width: '100%', height: '500px', border: '1px solid #ddd' }}
    >
      {blocks.map((b) => (
        <BlockComponent key={b.id} block={b} />
      ))}
    </div>
  )
}
