import React, { useState } from 'react'
import { login, register } from '../api'

export default function LoginRegister({ onAuth }) {
  const [mode, setMode] = useState('login') // or 'register'
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const toggle = () => {
    setMode((m) => (m === 'login' ? 'register' : 'login'))
    setError('')
  }

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const d = mode === 'login'
        ? await login(username, password)
        : await register({ username, password })
      const token = d?.token || d?.accessToken
      if (!token) throw new Error('No se recibió token del servidor')
      if (typeof onAuth !== 'function') throw new Error('Callback onAuth no es una función')
      onAuth(token)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={submit}>
      <div className="form-row">
        <label>Usuario</label>
        <input value={username} onChange={(e) => setUsername(e.target.value)} required />
      </div>
      <div className="form-row">
        <label>Contraseña</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>
      {error && <div className="error">{error}</div>}
      <div className="actions">
        <button className="btn" type="submit" disabled={loading}>
          {loading ? '...' : mode === 'login' ? 'Ingresar' : 'Registrarse'}
        </button>
        <button className="btn btn-secondary" type="button" onClick={toggle}>
          {mode === 'login' ? 'Crear cuenta' : 'Ya tengo cuenta'}
        </button>
      </div>
    </form>
  )
}
