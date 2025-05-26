import { NavLink } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'

export const Navbar = () => {
    const { logout } = useAppContext()

    return (
        <nav className="navbar">
            <h1>Mi gestor</h1>
            <div className="nav-links">
                <NavLink to="/tasks" className={({ isActive }) => isActive ? 'active' : ''}>Tareas</NavLink>
                <NavLink to="/board" className={({ isActive }) => isActive ? 'active' : ''}>Tablero</NavLink>
                <NavLink to="/summary" className={({ isActive }) => isActive ? 'active' : ''}>Resumen</NavLink>
                <button onClick={logout}>Cerrar sesión</button>
            </div>
        </nav>
    )
}
