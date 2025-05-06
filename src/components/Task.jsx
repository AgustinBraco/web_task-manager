import { useAppContext } from '../context/AppContext.jsx'
import Request from '../utils/requests.js'

export const Task = ({ task }) => {
  const { fetchData, setRequest, setFormData, setModalStatus } = useAppContext()

  const priorities = {
    0: 'Alta',
    1: 'Media',
    2: 'Baja'
  }

  const states = {
    0: 'pending',
    1: 'completed'
  }

  // Create axios instance
  const sendRequest = new Request()

  // Task actions
  const toggleTask = async () => {
    const body = {
      title: task.title,
      description: task.description,
      date: task.date,
      priority: task.priority,
      completed: task.completed ? 0 : 1
    }

    await sendRequest.update(task.id, body)
    fetchData()
  }

  const editTask = () => {
    setFormData({
      title: task.title,
      description: task.description,
      date: task.date,
      priority: task.priority,
      completed: task.completed
    })
    setModalStatus('open')
    setRequest({ method: 'update', id: task.id })
  }

  const deleteTask = async () => {
    await sendRequest.delete(task.id)
    fetchData()
  }

  return (
    <div data-cy='task' className="task">
      <div
        data-cy="task-check"
        className={`task-check ${states[task.completed]}`}
        onClick={toggleTask}
      ></div>

      <div className="task-info">
        <p data-cy='task-title' className={`task-title ${states[task.completed]}`}>{task.title}</p>
        <p className={`task-description ${states[task.completed]}`}>
          {task.description}
        </p>

        <div className="task-bottom">
          <p className={`task-item date ${states[task.completed]}`}>
            {task.date}
          </p>
          <p className={`task-item priority ${states[task.completed]}`}>
            {priorities[task.priority]}
          </p>
        </div>
      </div>

      <div className="task-actions">
        <div
          data-cy="task-edit"
          className="task-action edit"
          onClick={editTask}
        ></div>
        <div
          data-cy="task-delete"
          className="task-action delete"
          onClick={deleteTask}
        ></div>
      </div>
    </div>
  )
}
