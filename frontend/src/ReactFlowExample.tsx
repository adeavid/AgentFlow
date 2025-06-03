import { useCallback, useRef, useState } from 'react'
import ReactFlow, {
  Background,
  Controls,
  ReactFlowProvider,
  addEdge,
  useEdgesState,
  useNodesState,
  Connection,
  Edge,
  Node,
} from 'reactflow'
import 'reactflow/dist/style.css'

const initialNodes: Node[] = [
  { id: '1', type: 'input', data: { label: 'Node 1' }, position: { x: 250, y: 5 } },
  { id: '2', data: { label: 'Node 2' }, position: { x: 100, y: 100 } },
]

const initialEdges: Edge[] = [{ id: 'e1-2', source: '1', target: '2' }]

let id = 2
const getId = () => `${++id}`

function Flow() {
  const reactFlowWrapper = useRef<HTMLDivElement>(null)
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null)
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
    [],
  )

  const onDragOver = useCallback((event: DragEvent) => {
    event.preventDefault()
    event.dataTransfer!.dropEffect = 'move'
  }, [])

  const onDrop = useCallback(
    (event: DragEvent) => {
      event.preventDefault()
      const type = event.dataTransfer?.getData('application/reactflow')
      if (!type) return
      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowWrapper.current!.getBoundingClientRect().left,
        y: event.clientY - reactFlowWrapper.current!.getBoundingClientRect().top,
      })
      const newNode: Node = {
        id: getId(),
        type,
        position,
        data: { label: `${type} node` },
      }
      setNodes((nds) => nds.concat(newNode))
    },
    [reactFlowInstance],
  )

  return (
    <div style={{ width: '100%', height: 500 }} ref={reactFlowWrapper}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onInit={setReactFlowInstance}
        onDrop={onDrop}
        onDragOver={onDragOver}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  )
}

export default function ReactFlowExample() {
  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType)
    event.dataTransfer.effectAllowed = 'move'
  }

  return (
    <ReactFlowProvider>
      <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
        <div
          onDragStart={(event) => onDragStart(event, 'default')}
          draggable
          style={{ padding: '4px 8px', border: '1px solid #ccc', cursor: 'grab' }}
        >
          Default Node
        </div>
      </div>
      <Flow />
    </ReactFlowProvider>
  )
}
