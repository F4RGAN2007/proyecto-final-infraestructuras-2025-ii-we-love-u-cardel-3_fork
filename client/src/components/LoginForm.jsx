import React, { useState } from 'react'
import { login } from '../api'

function LoginForm({ onLogin }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const data = await login(username, password)
      const token = data.token || data.accessToken || data?.token
      const user = data.user || data?.user || data?.data
      if (onLogin) onLogin(token, user)
    } catch (err) {
      alert('Error al iniciar sesión')
      console.error(err)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Usuario</label>
        <input value={username} onChange={(e) => setUsername(e.target.value)} required />
      </div>
      <div>
        <label>Contraseña</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>
      <button type="submit">Iniciar Sesión</button>
    </form>
  )
}

export default LoginForm
