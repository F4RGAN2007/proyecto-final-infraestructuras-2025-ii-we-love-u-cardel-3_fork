import React, { useEffect, useMemo, useState } from 'react'
import { getMe, getAllUsers, updateMe, request } from './api'
import LoginRegister from './components/LoginRegister'
import ProfileForm from './components/ProfileForm'
import UserList from './components/UserList'

export default function App() {
  const [token, setToken] = useState(() => localStorage.getItem('token') || '')
  const [me, setMe] = useState(null)
  const [users, setUsers] = useState([])
  const signedIn = !!token

  useEffect(() => {
    if (!token) return
    getMe()
      .then((d) => setMe(d.user))
      .catch(() => {
        setToken('')
        localStorage.removeItem('token')
      })
  }, [token])

  useEffect(() => {
    if (!token) return
    getAllUsers()
      .then((d) => setUsers(d.users || d))
      .catch((e) => console.error(e))
  }, [token])

  const handleAuth = (newToken) => {
    setToken(newToken)
    localStorage.setItem('token', newToken)
  }

  const handleProfileSave = async (updates) => {
    const d = await updateMe(updates)
    setMe(d.user)
    // refresh list to reflect changes
    const list = await getAllUsers()
    setUsers(list.users || list)
  }

  const logout = () => {
    setToken('')
    localStorage.removeItem('token')
    setMe(null)
    setUsers([])
  }

  return (
    <div className="container">
      <header className="header">
        <h1>PokedexPersonas</h1>
        {signedIn && (
          <button className="btn" onClick={logout}>
            Cerrar sesión
          </button>
        )}
      </header>

      {!signedIn ? (
        <div className="card">
          <LoginRegister onAuth={handleAuth} />
        </div>) : (
        <>
          <div className="card">
            <h2>Tu Perfil</h2>
            <ProfileForm me={me} onSave={handleProfileSave} />
          </div>
          <div className="list-header">
            <h2>Personas Registradas</h2>
          </div>
          <UserList users={users} meId={me?.id} />
        </>
      )}

      <footer className="footer">
        <small>Demo educativa — API REST + React + PostgreSQL</small>
      </footer>
    </div>
  )
}
