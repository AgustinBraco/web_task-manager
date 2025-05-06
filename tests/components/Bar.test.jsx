import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import tasks from '../data/tasks.json'
import { Bar } from '../../src/components'

// Context
const setData = vi.fn()
const setSelected = vi.fn()
const mockGet = vi.fn()

vi.mock('../../src/context/AppContext.jsx', () => ({
  useAppContext: () => ({
    setData,
    setSelected,
    selected: 'Todas'
  })
}))

// Axios
vi.mock('../../src/utils/requests.js', () => ({
  default: vi.fn().mockImplementation(() => ({
    get: mockGet
  }))
}))

// Tests
describe('<Bar />', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockGet.mockResolvedValue(tasks)
  })

  it('Render all buttons', () => {
    render(<Bar />)
    expect(screen.getByText('Todas')).toBeInTheDocument()
    expect(screen.getByText('Activas')).toBeInTheDocument()
    expect(screen.getByText('Completas')).toBeInTheDocument()
  })

  it('Active button has "active" class', () => {
    render(<Bar />)
    const activeButton = screen.getByText('Todas')
    expect(activeButton).toHaveClass('active')
  })

  it('No functions are run before click', () => {
    render(<Bar />)
    expect(setSelected).not.toHaveBeenCalled()
    expect(setData).not.toHaveBeenCalled()
  })

  it('Show active tasks when clicking "Activas" button', async () => {
    render(<Bar />)
    const activeButton = screen.getByText('Activas')
    fireEvent.click(activeButton)

    await waitFor(() => {
      expect(setSelected).toHaveBeenCalledWith('Activas')
      expect(setData).toHaveBeenCalledWith([
        {
          id: 1,
          title: 'Tarea 1',
          description: 'Descripción 1',
          date: '2025-05-01',
          priority: 0,
          completed: 0
        }
      ])
    })
  })

  it('Show active tasks when clicking "Completas" button', async () => {
    render(<Bar />)
    const completeButton = screen.getByText('Completas')
    fireEvent.click(completeButton)

    await waitFor(() => {
      expect(setSelected).toHaveBeenCalledWith('Completas')
      expect(setData).toHaveBeenCalledWith([
        {
          id: 2,
          title: 'Tarea 2',
          description: 'Descripción 2',
          date: '2025-05-02',
          priority: 0,
          completed: 1
        }
      ])
    })
  })

  it('Show all tasks when clicking "Todas" button', async () => {
    render(<Bar />)
    const allButton = screen.getByText('Todas')
    fireEvent.click(allButton)

    await waitFor(() => {
      expect(setSelected).toHaveBeenCalledWith('Todas')
      expect(setData).toHaveBeenCalledWith(tasks)
    })
  })
})
