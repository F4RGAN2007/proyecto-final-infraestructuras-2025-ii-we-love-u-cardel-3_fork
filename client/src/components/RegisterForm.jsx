import React, { useState } from 'react'
import { register } from '../api'

function RegisterForm({ onRegister }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const payload = { username, password, name }
      const data = await register(payload)
      const token = data.token || data.accessToken || data?.token
      const user = data.user || data?.user || data?.data
      if (onRegister) onRegister(token, user)
    } catch (err) {
      alert('Error al registrarse')
      console.error(err)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nombre</label>
        <input value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div>
        <label>Usuario</label>
        <input value={username} onChange={(e) => setUsername(e.target.value)} required />
      </div>
      <div>
        <label>Contraseña</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>
      <button type="submit">Registrar</button>
    </form>
  )
}

export default RegisterForm
