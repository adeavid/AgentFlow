import { CSSProperties } from 'react'
import { useDraggable } from '@dnd-kit/core'
import { Block } from './types'

interface Props {
  block: Block
}

export default function BlockComponent({ block }: Props) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: block.id,
  })

  const style: CSSProperties = {
    position: 'absolute',
    left: block.x,
    top: block.y,
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    padding: '8px 12px',
    border: '1px solid #ccc',
    borderRadius: 4,
    background: 'white',
  }

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {block.type}
    </div>
  )
}
