'use strict';
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const usersRoutes = require('./routes/users');

const app = express();

const PORT = process.env.PORT || 4000;
const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:5173';

// Soporte de múltiples orígenes separados por comas
const allowedOrigins = CORS_ORIGIN.split(',').map((o) => o.trim()).filter(Boolean);

// ...
const corsOptions = {
  credentials: true,
  origin: (origin, callback) => {
    // 1. Caso sin origen (ej. cURL o request de la misma máquina)
    if (!origin) {
      return callback(null, true);
    }

    // 2. Verificar si el origen está permitido
    const isAllowed = allowedOrigins.includes(origin) || allowedOrigins.includes('*');

    if (isAllowed) {
      // 💡 CAMBIO CLAVE: Pasa el origen solicitado (origin) de vuelta.
      // Esto establece A-C-A-O al valor *exacto* del origen solicitante.
      return callback(null, origin);
    }

    // 3. Origen no permitido
    return callback(new Error(`Not allowed by CORS: ${origin}`));
  }
};

app.use(cors(corsOptions));
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ ok: true, ts: new Date().toISOString() });
});

app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);

app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});
