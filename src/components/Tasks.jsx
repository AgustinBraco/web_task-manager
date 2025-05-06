import { useAppContext } from '../context/AppContext.jsx'
import { Task } from './'

export const Tasks = () => {
  const { data } = useAppContext()

  return (
    <div className="tasks" data-testid="tasks-container">
      {data.length === 0 ? (
        <p className="tasks-title">No hay tareas</p>
      ) : (
        data.map(task => <Task key={task.id} task={task} />)
      )}
    </div>
  )
}
