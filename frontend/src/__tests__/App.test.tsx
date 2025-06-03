import { render } from '@testing-library/react'
import App from '../App'
import { describe, it, expect } from 'vitest'

describe('App', () => {
  it('renders canvas', () => {
    const { getByText } = render(<App />)
    expect(getByText('Prompt')).toBeDefined()
  })
})
