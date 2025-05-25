import { useAppContext } from '../context/AppContext.jsx'

export const Add = () => {
  const { setRequest, setModalStatus } = useAppContext()

  const handleAdd = () => {
    setModalStatus('open')
    setRequest({ method: 'create', id: null })
  }

  return <button data-cy='add' className="add" onClick={handleAdd}></button>
}
