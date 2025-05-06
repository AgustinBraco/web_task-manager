import { fireEvent, render, screen } from '@testing-library/react'

// Axios
const mockCreate = vi.fn()
const mockUpdate = vi.fn()

vi.mock('../../src/utils/requests.js', () => {
  return {
    default: vi.fn(() => ({
      create: mockCreate,
      update: mockUpdate
    }))
  }
})

// Tests
describe('Modal component', () => {
  beforeEach(() => {
    vi.resetModules()
    vi.clearAllMocks()
  })

  it('Show correct title for create mode', async () => {
    vi.doMock('../../src/context/AppContext.jsx', () => ({
      useAppContext: () => ({
        formData: {
          title: '',
          description: '',
          date: '',
          priority: 0,
          completed: 0
        },
        request: { method: 'create' },
        setFormData: vi.fn(),
        modalStatus: 'open',
        setModalStatus: vi.fn(),
        fetchData: vi.fn()
      })
    }))

    const { Modal } = await import('../../src/components/Modal.jsx')
    render(<Modal />)
    expect(screen.getByText('Agregar tarea')).toBeInTheDocument()
  })

  it('Disables submit button if form is invalid', async () => {
    vi.doMock('../../src/context/AppContext.jsx', () => ({
      useAppContext: () => ({
        formData: {
          title: '',
          description: '',
          date: '',
          priority: 0,
          completed: 0
        },
        request: { method: 'create' },
        setFormData: vi.fn(),
        modalStatus: 'open',
        setModalStatus: vi.fn(),
        fetchData: vi.fn()
      })
    }))

    const { Modal } = await import('../../src/components/Modal.jsx')
    render(<Modal />)
    expect(screen.getByDisplayValue('Aceptar')).toBeDisabled()
  })

  it('Calls create method on submit', async () => {
    const fetchData = vi.fn()
    const setModalStatus = vi.fn()

    vi.doMock('../../src/context/AppContext.jsx', () => ({
      useAppContext: () => ({
        formData: {
          title: 'Tarea 1',
          description: 'Descripcion 1',
          date: '2035-05-01',
          priority: 1,
          completed: 0
        },
        request: { method: 'create' },
        setFormData: vi.fn(),
        modalStatus: 'open',
        setModalStatus,
        fetchData
      })
    }))

    const { Modal } = await import('../../src/components/Modal.jsx')
    render(<Modal />)

    await fireEvent.click(screen.getByDisplayValue('Aceptar'))
    expect(mockCreate).toHaveBeenCalled()
    expect(fetchData).toHaveBeenCalled()
    expect(setModalStatus).toHaveBeenCalledWith('close')
  })

  it('Calls update method on submit', async () => {
    const fetchData = vi.fn()
    const setModalStatus = vi.fn()

    vi.doMock('../../src/context/AppContext.jsx', () => ({
      useAppContext: () => ({
        formData: {
          title: 'Tarea 1',
          description: 'Descripcion 1',
          date: '2035-05-01',
          priority: 2,
          completed: 1
        },
        request: { method: 'update', id: 5 },
        setFormData: vi.fn(),
        modalStatus: 'open',
        setModalStatus,
        fetchData
      })
    }))

    const { Modal } = await import('../../src/components/Modal.jsx')
    render(<Modal />)

    await fireEvent.click(screen.getByDisplayValue('Aceptar'))
    expect(mockUpdate).toHaveBeenCalledWith(5, expect.any(Object))
    expect(fetchData).toHaveBeenCalled()
    expect(setModalStatus).toHaveBeenCalledWith('close')
  })

  it('Close modal when cancel is clicked', async () => {
    const setModalStatus = vi.fn()

    vi.doMock('../../src/context/AppContext.jsx', () => ({
      useAppContext: () => ({
        formData: {
          title: 'Tarea 1',
          description: 'Descripcion 1',
          date: '2035-05-01',
          priority: 0,
          completed: 0
        },
        request: { method: 'create' },
        setFormData: vi.fn(),
        modalStatus: 'open',
        setModalStatus,
        fetchData: vi.fn()
      })
    }))

    const { Modal } = await import('../../src/components/Modal.jsx')
    render(<Modal />)

    fireEvent.click(screen.getByDisplayValue('Cancelar'))
    expect(setModalStatus).toHaveBeenCalledWith('close')
  })
})
