import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Task } from '../../src/components'
import Request from '../../src/utils/requests.js'

// Context
const fetchData = vi.fn()
const setRequest = vi.fn()
const setFormData = vi.fn()
const setModalStatus = vi.fn()

vi.mock('../../src/context/AppContext.jsx', () => ({
  useAppContext: () => ({
    fetchData,
    setRequest,
    setFormData,
    setModalStatus
  })
}))

// Axios
vi.mock('../../src/utils/requests.js', () => {
  return {
    default: vi.fn().mockImplementation(() => ({
      update: vi.fn().mockResolvedValue({}),
      delete: vi.fn().mockResolvedValue({})
    }))
  }
})

const data = {
  id: 1,
  title: 'Tarea 1',
  description: 'Descripción 1',
  date: '2025-05-01',
  priority: 0,
  completed: 0
}

describe('<Task />', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('Render the content correctly', () => {
    render(<Task task={data} />)

    expect(screen.getByText('Tarea 1')).toBeInTheDocument()
    expect(screen.getByText('Descripción 1')).toBeInTheDocument()
    expect(screen.getByText('2025-05-01')).toBeInTheDocument()
    expect(screen.getByText('Alta')).toBeInTheDocument()
  })

  it('Run "toggleTask" when clicking', async () => {
    render(<Task task={data} />)

    const requestInstance = Request.mock.results[0].value
    const checkDiv = document.querySelector('.task-check')

    await fireEvent.click(checkDiv)

    expect(requestInstance.update).toHaveBeenCalledWith(
      data.id,
      expect.any(Object)
    )
    expect(fetchData).toHaveBeenCalled()
  })

  it('Run "editTask" when clicking', () => {
    render(<Task task={data} />)

    const editBtn = document.querySelector('.task-action.edit')
    fireEvent.click(editBtn)

    expect(setFormData).toHaveBeenCalledWith(
      expect.objectContaining({
        title: data.title,
        description: data.description
      })
    )
    expect(setModalStatus).toHaveBeenCalledWith('open')
    expect(setRequest).toHaveBeenCalledWith({
      method: 'update',
      id: data.id
    })
  })

  it('Run "deleteTask" when click', async () => {
    render(<Task task={data} />)

    const requestInstance = Request.mock.results[0].value
    const deleteBtn = document.querySelector('.task-action.delete')
    await fireEvent.click(deleteBtn)

    expect(requestInstance.delete).toHaveBeenCalledWith(data.id)
    expect(fetchData).toHaveBeenCalled()
  })
})
