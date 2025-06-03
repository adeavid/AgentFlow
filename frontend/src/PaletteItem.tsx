import { useDraggable } from '@dnd-kit/core'
import type { CSSProperties } from 'react'
import type { BlockType } from './types'

interface Props {
  type: BlockType
  label: string
}

export default function PaletteItem({ type, label }: Props) {
  const { attributes, listeners, setNodeRef } = useDraggable({ id: `palette-${type}`, data: { type } })
  const style: CSSProperties = { padding: '4px 8px', border: '1px solid #ccc', cursor: 'grab' }
  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {label}
    </div>
  )
}
