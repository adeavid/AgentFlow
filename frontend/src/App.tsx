import FlowCanvas from './FlowCanvas'
import BlockPalette from './BlockPalette'

export default function App() {
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <BlockPalette />
      <FlowCanvas />
    </div>
  )
}
