require('dotenv').config();
const { Pool } = require('pg');

const DB_NAME = process.env.DB_NAME || 'pokedex';

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST || 'localhost',
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT || 5432,
  database: 'postgres'
});

async function createDatabase() {
  try {
    const res = await pool.query(
      `SELECT 1 FROM pg_database WHERE datname = $1`,
      [DB_NAME]
    );

    if (res.rowCount === 0) {
      console.log('Creando base de datos local...');
      await pool.query(`CREATE DATABASE ${DB_NAME}`);
      console.log('Base de datos creada correctamente.');
    } else {
      console.log('La base de datos ya existe.');
    }
  } catch (err) {
    console.error('Error creando la base:', err);
  } finally {
    await pool.end();
  }
}

createDatabase();
