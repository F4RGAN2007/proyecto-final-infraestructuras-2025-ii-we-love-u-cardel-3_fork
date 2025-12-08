import React from 'react'

export default function UserCard({ user, highlight = false }) {
  return (
    <div className={`person-card ${highlight ? 'highlight' : ''}`}>
      <div className="person-header">
        <div className="person-title">{user.name || user.username}</div>
        <div className="person-subtitle">{new Date(user.created_at).toLocaleString()}</div>
      </div>
      <div className="person-grid">
        <div><strong>Edad:</strong> {user.age ?? '—'}</div>
        <div><strong>Sexo:</strong> {user.sex || '—'}</div>
        <div><strong>Raza:</strong> {user.race || '—'}</div>
        <div><strong>Orientación:</strong> {user.sexual_orientation || '—'}</div>
      </div>
      {user.description && <p className="person-desc">{user.description}</p>}
    </div>
  )
}
