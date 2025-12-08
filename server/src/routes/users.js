const express = require('express');
const db = require('../db');
const auth = require('../middleware/auth');

const router = express.Router();

function toPublicUser(row) {
  return {
    id: row.id,
    username: row.username,
    name: row.name,
    age: row.age,
    sex: row.sex,
    race: row.race,
    sexual_orientation: row.sexual_orientation,
    description: row.description,
    created_at: row.created_at,
  };
}

router.get('/', auth, async (req, res) => {
  try {
    const q = await db.query('SELECT * FROM users ORDER BY created_at DESC');
    res.json({ users: q.rows.map(toPublicUser) });
  } catch (e) {
    console.error('List users error', e);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/:id', auth, async (req, res) => {
  try {
    const q = await db.query('SELECT * FROM users WHERE id=$1', [req.params.id]);
    if (!q.rows.length) return res.status(404).json({ error: 'User not found' });
    res.json({ user: toPublicUser(q.rows[0]) });
  } catch (e) {
    console.error('Get user error', e);
    res.status(500).json({ error: 'Server error' });
  }
});

router.put('/me', auth, async (req, res) => {
  try {
    const { name, age, sex, race, sexual_orientation, description } = req.body;
    const q = await db.query(
      `UPDATE users SET
        name = COALESCE($1, name),
        age = COALESCE($2, age),
        sex = COALESCE($3, sex),
        race = COALESCE($4, race),
        sexual_orientation = COALESCE($5, sexual_orientation),
        description = COALESCE($6, description)
      WHERE id=$7
      RETURNING *`,
      [name ?? null, age ?? null, sex ?? null, race ?? null, sexual_orientation ?? null, description ?? null, req.userId]
    );
    res.json({ user: toPublicUser(q.rows[0]) });
  } catch (e) {
    console.error('Update me error', e);
    res.status(500).json({ error: 'Server error' });
  }
});

router.delete('/me', auth, async (req, res) => {
  try {
    await db.query('DELETE FROM users WHERE id=$1', [req.userId]);
    res.json({ ok: true });
  } catch (e) {
    console.error('Delete me error', e);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
