import { useAppContext } from '../context/AppContext.jsx'
import Request from '../utils/requests.js'

export const Bar = () => {
  const { setData, selected, setSelected } = useAppContext()
  const items = ['Todas', 'Activas', 'Completas']

  // Create axios instance
  const sendRequest = new Request()

  const filterTasks = async item => {
    setSelected(item)
    const data = await sendRequest.get()

    if (item === 'Activas')
      return setData(data.filter(task => task.completed === 0))

    if (item === 'Completas')
      return setData(data.filter(task => task.completed === 1))

    setData(data)
  }

  return (
    <div data-cy='bar' className="bar">
      {items.map(item => (
        <button
          data-cy={`button-${item.toLowerCase()}`}
          key={item}
          onClick={() => filterTasks(item)}
          className={`bar-item ${selected === item ? 'active' : ''}`}
        >
          {item}
        </button>
      ))}
    </div>
  )
}
