import { useAppContext } from '../context/AppContext.jsx'
import { Task } from './'

export const Tasks = () => {
  const { data } = useAppContext()

  return (
    <div className="tasks" data-cy='tasks' data-testid="tasks">
      {data.length === 0 ? (
        <p data-cy="tasks-title" className="tasks-title">
          No hay tareas
        </p>
      ) : (
        data.map(task => <Task key={task.id} task={task} />)
      )}
    </div>
  )
}
