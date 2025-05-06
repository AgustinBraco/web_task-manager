import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import tasks from '../data/tasks.json'
import { Tasks } from '../../src/components'
import { useAppContext } from '../../src/context/AppContext.jsx'

// Context
vi.mock('../../src/context/AppContext.jsx', () => ({
  useAppContext: vi.fn()
}))

// Tests
describe('<Tasks />', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('Render correctly and displays the tasks container', () => {
    useAppContext.mockReturnValue({ data: [] })
    render(<Tasks />)

    const tasksContainer = screen.getByTestId('tasks-container')
    expect(tasksContainer).toBeInTheDocument()
  })

  it('Show "No hay tareas" when there are no tasks', () => {
    useAppContext.mockReturnValue({ data: [] })
    render(<Tasks />)

    const noTasksMessage = screen.getByText('No hay tareas')
    expect(noTasksMessage).toBeInTheDocument()
  })

  it('Maps over data and renders a Task for each item', () => {
    useAppContext.mockReturnValue({ data: tasks })
    render(<Tasks />)

    const taskElements = screen.getAllByText(/Tarea/)
    expect(taskElements).toHaveLength(tasks.length)
  })

  it('Does not show "No hay tareas" when tasks are available', () => {
    useAppContext.mockReturnValue({ data: tasks })
    render(<Tasks />)

    const noTasksMessage = screen.queryByText('No hay tareas')
    expect(noTasksMessage).toBeNull()
  })
})
