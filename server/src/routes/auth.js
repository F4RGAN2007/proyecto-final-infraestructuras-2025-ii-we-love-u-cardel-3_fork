const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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

router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: 'username and password are required' });
    }
    const existing = await db.query('SELECT id FROM users WHERE username=$1', [username]);
    if (existing.rows.length) {
      return res.status(409).json({ error: 'username already exists' });
    }
    const hash = await bcrypt.hash(password, 10);
    const insert = await db.query(
      `INSERT INTO users (username, password_hash) VALUES ($1, $2) RETURNING *`,
      [username, hash]
    );
    const user = insert.rows[0];
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({ token, user: toPublicUser(user) });
  } catch (e) {
    console.error('Register error', e);
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: 'username and password are required' });
    }
    const q = await db.query('SELECT * FROM users WHERE username=$1', [username]);
    if (!q.rows.length) return res.status(401).json({ error: 'Invalid credentials' });
    const user = q.rows[0];
    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) return res.status(401).json({ error: 'Invalid credentials' });
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: toPublicUser(user) });
  } catch (e) {
    console.error('Login error', e);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/me', auth, async (req, res) => {
  try {
    const q = await db.query('SELECT * FROM users WHERE id=$1', [req.userId]);
    if (!q.rows.length) return res.status(404).json({ error: 'User not found' });
    res.json({ user: toPublicUser(q.rows[0]) });
  } catch (e) {
    console.error('Me error', e);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
