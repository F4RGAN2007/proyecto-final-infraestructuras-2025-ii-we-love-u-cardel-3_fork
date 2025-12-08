import React, { useEffect, useMemo, useState } from 'react'

export default function ProfileForm({ me, onSave }) {
  const [form, setForm] = useState({
    name: '',
    age: '',
    sex: '',
    race: '',
    sexual_orientation: '',
    description: '',
  })

  useEffect(() => {
    if (me) {
      setForm({
        name: me.name || '',
        age: me.age || '',
        sex: me.sex || '',
        race: me.race || '',
        sexual_orientation: me.sexual_orientation || '',
        description: me.description || '',
      })
    }
  }, [me])

  const onChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  const submit = async (e) => {
    e.preventDefault()
    const payload = {
      ...form,
      age: form.age === '' ? null : Number(form.age),
    }
    await onSave(payload)
  }

  return (
    <form onSubmit={submit}>
      <div className="grid2">
        <div className="form-row">
          <label>Nombre</label>
          <input name="name" value={form.name} onChange={onChange} />
        </div>
        <div className="form-row">
          <label>Edad</label>
          <input name="age" type="number" min="0" value={form.age} onChange={onChange} />
        </div>
        <div className="form-row">
          <label>Sexo</label>
          <input name="sex" value={form.sex} onChange={onChange} placeholder="F/M/No binario/etc." />
        </div>
        <div className="form-row">
          <label>Raza</label>
          <input name="race" value={form.race} onChange={onChange} />
        </div>
        <div className="form-row">
          <label>Orientación sexual</label>
          <input name="sexual_orientation" value={form.sexual_orientation} onChange={onChange} />
        </div>
      </div>
      <div className="form-row">
        <label>Descripción breve</label>
        <textarea name="description" rows={3} value={form.description} onChange={onChange} />
      </div>
      {me?.created_at && (
        <div className="muted">Registrado: {new Date(me.created_at).toLocaleString()}</div>
      )}
      <div className="actions">
        <button className="btn" type="submit">Guardar</button>
      </div>
    </form>
  )
}
