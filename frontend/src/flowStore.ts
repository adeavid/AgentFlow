import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import type { Node, Edge } from 'reactflow'

interface FlowState {
  nodes: Node[]
  edges: Edge[]
  setNodes: (nodes: Node[]) => void
  setEdges: (edges: Edge[]) => void
  addNode: (node: Node) => void
  addEdge: (edge: Edge) => void
  updateNode: (id: string, data: Partial<Node>) => void
  updateEdge: (id: string, data: Partial<Edge>) => void
  removeNode: (id: string) => void
  removeEdge: (id: string) => void
}

export const useFlowStore = create<FlowState>()(
  devtools((set) => ({
    nodes: [],
    edges: [],
    setNodes: (nodes) => set({ nodes }),
    setEdges: (edges) => set({ edges }),
    addNode: (node) => set((state) => ({ nodes: [...state.nodes, node] })),
    addEdge: (edge) => set((state) => ({ edges: [...state.edges, edge] })),
    updateNode: (id, data) =>
      set((state) => ({
        nodes: state.nodes.map((n) => (n.id === id ? { ...n, ...data } : n)),
      })),
    updateEdge: (id, data) =>
      set((state) => ({
        edges: state.edges.map((e) => (e.id === id ? { ...e, ...data } : e)),
      })),
    removeNode: (id) =>
      set((state) => ({
        nodes: state.nodes.filter((n) => n.id !== id),
        edges: state.edges.filter((e) => e.source !== id && e.target !== id),
      })),
    removeEdge: (id) =>
      set((state) => ({ edges: state.edges.filter((e) => e.id !== id) })),
  }))
)
