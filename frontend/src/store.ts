import { create } from 'zustand'
import { Block, BlockType } from './types'

interface State {
  blocks: Block[]
  addBlock: (type: BlockType, x: number, y: number) => void
  updateBlock: (id: string, x: number, y: number) => void
}

export const useStore = create<State>((set) => ({
  blocks: [],
  addBlock: (type, x, y) =>
    set((state) => ({
      blocks: [
        ...state.blocks,
        { id: Math.random().toString(36).slice(2), type, x, y },
      ],
    })),
  updateBlock: (id, x, y) =>
    set((state) => ({
      blocks: state.blocks.map((b) => (b.id === id ? { ...b, x, y } : b)),
    })),
}))

export const useSerialized = () => {
  const blocks = useStore((s) => s.blocks)
  return JSON.stringify({ blocks }, null, 2)
}
