import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'

export const Login = () => {
    const [email, setEmail] = useState(localStorage.getItem('lastEmail') || '')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState('')
    const { login } = useAppContext()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!email || !password) {
            setError('Completa todos los campos')
            return
        }

        // Validación temporal (solo para test)
        if (password.length >= 4) {
            login(email, password)
            localStorage.setItem('lastEmail', email)
            navigate('/tasks')
        } else {
            setError('Credenciales inválidas')
        }
    }

    return (
        <div className="login-page">
            <div className="login-box">
                <h2>Iniciar sesión</h2>
                <form onSubmit={handleSubmit} className="login-form">
                    <input
                        type="email"
                        placeholder="Correo"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <div className="password-field">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="eye-toggle"
                        >
                            {showPassword ? '🙈' : '👁'}
                        </button>
                    </div>

                    {error && <p className="error-message">{error}</p>}

                    <button type="submit" className="login-button">Entrar</button>
                </form>
            </div>
        </div>
    )
}
