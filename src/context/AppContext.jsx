import { createContext, useContext, useState, useEffect } from 'react'
import Request from '../utils/requests.js'

const AppContext = createContext()

export const AppProvider = ({ children }) => {
  // Create states to be used
  const [modalStatus, setModalStatus] = useState('close')
  const [request, setRequest] = useState({ method: '', id: 0 })
  const [data, setData] = useState([])
  const [selected, setSelected] = useState('Todas')
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    priority: 0,
    completed: 0
  })

  // Create axios instance
  const sendRequest = new Request()

  // Get and filter data on render
  const fetchData = async () => {
    const data = await sendRequest.get()

    if (selected === 'Activas')
      return setData(data.filter(task => task.completed === 0))

    if (selected === 'Completas')
      return setData(data.filter(task => task.completed === 1))

    setData(data)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <AppContext.Provider
      value={{
        formData,
        setFormData,
        modalStatus,
        setModalStatus,
        request,
        setRequest,
        data,
        setData,
        selected,
        setSelected,
        fetchData
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => useContext(AppContext)
