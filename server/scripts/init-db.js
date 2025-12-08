const fs = require('fs');
const path = require('path');
require('dotenv').config();
const { Pool } = require('pg');

async function main() {
  const sqlPath = path.join(__dirname, '..', 'src', 'schema.sql');
  const sql = fs.readFileSync(sqlPath, 'utf8');

  const pool = new Pool({
    connectionString: process.env.DATABASE_URL
  });

  try {
    console.log('Creando tablas...');
    await pool.query(sql);
    console.log('Tablas creadas correctamente.');
  } catch (e) {
    console.error('Error al crear tablas:', e);
  } finally {
    await pool.end();
  }
}

main();
