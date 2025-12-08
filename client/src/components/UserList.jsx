import React from 'react'
import UserCard from './UserCard'

export default function UserList({ users, meId }) {
  if (!users?.length) return <div className="muted">No hay personas registradas aún.</div>
  return (
    <div className="card-grid">
      {users.map((u) => (
        <UserCard key={u.id} user={u} highlight={u.id === meId} />
      ))}
    </div>
  )
}
