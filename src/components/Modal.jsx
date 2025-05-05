import { useEffect, useState } from 'react'
import { useAppContext } from '../context/AppContext.jsx'
import Request from '../utils/requests.js'

export const Modal = () => {
  const {
    formData,
    request,
    setFormData,
    modalStatus,
    setModalStatus,
    fetchData
  } = useAppContext()

  // Render by request type
  const [modalTitle, setModalTitle] = useState('')

  useEffect(() => {
    request.method === 'create'
      ? setModalTitle('Agregar tarea')
      : setModalTitle('Editar tarea')
  }, [request])

  // Create axios instance
  const sendRequest = new Request()

  // Get current date
  const today = new Date().toISOString().split('T')[0]

  const closeModal = () => {
    setFormData({
      title: '',
      description: '',
      date: '',
      priority: 0,
      completed: 0
    })

    setModalStatus('close')
  }

  const handleChange = e => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]:
        name === 'priority' || name === 'completed' ? Number(value) : value
    })
  }

  const handleSubmit = async e => {
    e.preventDefault()

    request.method === 'create'
      ? await sendRequest.create(formData)
      : await sendRequest.update(request.id, formData)

    fetchData()
    closeModal()
  }

  const isFormInvalid =
    !formData.title || !formData.description || !formData.date

  return (
    <div className={`modal ${modalStatus}`}>
      <div className="modal-wrapper">
        <p className="modal-title">{modalTitle}</p>
        <form className="modal-form" onSubmit={handleSubmit}>
          <label htmlFor="title" className="modal-label">
            Título
            <input
              className="modal-input"
              required
              name="title"
              type="text"
              placeholder="Comprar"
              value={formData.title}
              onChange={handleChange}
            />
          </label>

          <label htmlFor="description" className="modal-label">
            Descripción
            <input
              className="modal-input"
              required
              name="description"
              type="text"
              placeholder="Agua, jabón, servilletas..."
              value={formData.description}
              onChange={handleChange}
            />
          </label>

          <label htmlFor="date" className="modal-label">
            Vencimiento
            <input
              className="modal-input"
              required
              name="date"
              type="date"
              min={today}
              value={formData.date}
              onChange={handleChange}
            />
          </label>

          <label htmlFor="priority" className="modal-label">
            Prioridad
            <select
              className="modal-input"
              required
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
            >
              <option value="2">Baja</option>
              <option value="1">Media</option>
              <option value="0">Alta</option>
            </select>
          </label>

          <input
            disabled={isFormInvalid}
            className="modal-button submit"
            type="submit"
            value="Aceptar"
          />
          <input
            className="modal-button cancel"
            type="button"
            value="Cancelar"
            onClick={closeModal}
          />
        </form>
      </div>
    </div>
  )
}
