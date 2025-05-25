import { useAppContext } from '../context/AppContext.jsx'
import { Task } from './'

export const Tasks = () => {
  const { data = [], searchTerm, sortBy } = useAppContext()

  let filteredTasks = data.filter(task =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (sortBy === 'priority') {
    filteredTasks.sort((a, b) => a.priority - b.priority)
  } else if (sortBy === 'date') {
    filteredTasks.sort((a, b) => new Date(a.date) - new Date(b.date))
  } else if (sortBy === 'completed') {
    filteredTasks.sort((a, b) => a.completed - b.completed)
  }

  return (
      <div className="tasks" data-cy="tasks" data-testid="tasks">
        {filteredTasks.length === 0 ? (
            <p data-cy="tasks-title" className="tasks-title">
              No hay tareas
            </p>
        ) : (
            filteredTasks.map(task => (
                <Task key={task.id} task={task} />
            ))
        )}
      </div>
  )
}

