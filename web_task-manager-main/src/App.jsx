import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AppProvider, useAppContext } from './context/AppContext'
import { Dashboard } from './pages/Dashboard'
import { Login } from './pages/Login'
import { Board } from './pages/Board'
import { Summary } from './pages/Summary'


const ProtectedRoute = ({ children }) => {
    const { user } = useAppContext()
    return user ? children : <Navigate to="/login" />
}

function App() {
    return (
        <AppProvider>
            <Router>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/tasks" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                    <Route path="*" element={<Navigate to="/tasks" />} />
                    <Route path="/board" element={<ProtectedRoute><Board /></ProtectedRoute>} />
                    <Route path="/summary" element={<ProtectedRoute><Summary /></ProtectedRoute>} />

                </Routes>
            </Router>
        </AppProvider>
    )
}

export default App
