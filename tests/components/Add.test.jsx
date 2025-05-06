import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Add } from '../../src/components'

// Context
const setModalStatus = vi.fn()
const setRequest = vi.fn()

vi.mock('../../src/context/AppContext.jsx', () => ({
  useAppContext: () => ({
    setModalStatus,
    setRequest
  })
}))

// Tests
describe('<Add />', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('Render correctly and has a button', () => {
    render(<Add />)
    const button = screen.getByRole('button')

    expect(button).toBeInTheDocument()
  })

  it('Has the correct CSS class', () => {
    render(<Add />)
    const button = screen.getByRole('button')

    expect(button).toHaveClass('add')
  })

  it('No functions are run before click', () => {
    render(<Add />)
    expect(setModalStatus).not.toHaveBeenCalled()
    expect(setRequest).not.toHaveBeenCalled()
  })

  it('On click, it run setModalStatus and setRequest', () => {
    render(<Add />)
    const button = screen.getByRole('button')
    fireEvent.click(button)

    expect(setModalStatus).toHaveBeenCalledWith('open')
    expect(setRequest).toHaveBeenCalledWith({ method: 'create', id: null })
  })
})
