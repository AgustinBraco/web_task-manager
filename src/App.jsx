import { AppProvider } from './context/AppContext.jsx'
import { Bar, Tasks, Modal, Add } from './components'

const App = () => {
  return (
    <AppProvider>
      <div className="app">
        <p className="app-title">Gestor de tareas</p>
        <Bar />
        <Tasks />
        <Modal />
        <Add />
      </div>
    </AppProvider>
  )
}

export default App
